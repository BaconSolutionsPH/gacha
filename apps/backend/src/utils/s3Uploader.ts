import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, s3Config, getCDNUrl, validateS3Config } from "@/lib/s3";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

export interface S3UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

export interface S3UploadOptions {
  folder?: string;
  keepOriginalName?: boolean;
  contentType?: string;
}

// Default options
const DEFAULT_OPTIONS: S3UploadOptions = {
  folder: "uploads",
  keepOriginalName: false,
  contentType: undefined // Will use file type
};

/**
 * Upload file to S3 bucket
 */
export const uploadToS3 = async (
  file: File,
  options?: S3UploadOptions
): Promise<S3UploadResult> => {
  try {
    if (!validateS3Config()) {
      throw new Error("S3 configuration is incomplete. Please check your environment variables.");
    }

    const config = { ...DEFAULT_OPTIONS, ...options };
    const { folder, keepOriginalName } = config;

    const fileExtension = extname(file.name);
    const fileName = keepOriginalName
      ? file.name
      : `${uuidv4()}${fileExtension}`;

    const fileKey = folder ? `${folder}/${fileName}` : fileName;

    console.log(`Uploading file to S3: ${fileKey}`);

    const buffer = await file.arrayBuffer();
    const uploadParams = {
      Bucket: s3Config.bucketName,
      Key: fileKey,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    const client = getS3Client();
    await client.send(command);

    const cdnUrl = getCDNUrl(fileKey);

    console.log(`✅ File uploaded to S3: ${fileKey}`);

    return {
      success: true,
      url: cdnUrl,
      key: fileKey,
    };
  } catch (error: any) {
    console.error(`❌ S3 upload failed: ${error.message}`, { error });

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Delete file from S3 bucket
 */
export const deleteFromS3 = async (fileKey: string): Promise<boolean> => {
  try {
    if (!validateS3Config()) {
      throw new Error("S3 configuration is incomplete.");
    }

    const deleteParams = {
      Bucket: s3Config.bucketName,
      Key: fileKey,
    };

    const command = new DeleteObjectCommand(deleteParams);
    const client = getS3Client();
    await client.send(command);

    console.log(`✅ File deleted from S3: ${fileKey}`);
    return true;
  } catch (error: any) {
    console.error(`❌ S3 delete failed: ${error.message}`, { error });
    return false;
  }
};

/**
 * Upload multiple files to S3
 */
export const uploadMultipleToS3 = async (
  files: File[],
  options?: S3UploadOptions
): Promise<S3UploadResult[]> => {
  const uploadPromises = files.map(file => uploadToS3(file, options));
  return Promise.all(uploadPromises);
};

/**
 * Extract file key from S3/CDN URL
 */
export const extractFileKeyFromUrl = (url: string): string | null => {
  try {
    // Handle CloudFront URLs
    if (s3Config.cdnUrl && url.startsWith(s3Config.cdnUrl)) {
      return url.replace(`${s3Config.cdnUrl}/`, "");
    }

    // Handle direct S3 URLs
    const s3UrlPattern = new RegExp(
      `https://${s3Config.bucketName}\\.s3\\.${s3Config.region}\\.amazonaws\\.com/(.+)`
    );
    const match = url.match(s3UrlPattern);

    return match ? (match[1] || null) : null;
  } catch (error) {
    console.error(`Failed to extract file key from URL: ${url}`, { error });
    return null;
  }
};

export default {
  uploadToS3,
  deleteFromS3,
  uploadMultipleToS3,
  extractFileKeyFromUrl,
};
