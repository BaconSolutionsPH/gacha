import { S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "./environment";

export interface S3Config {
  region: string;
  bucketName: string;
  cdnUrl?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export const s3Config: S3Config = {
  region: envConfig.AWS_REGION || "us-east-1",
  bucketName: envConfig.AWS_S3_BUCKET_NAME || "",
  cdnUrl: envConfig.AWS_CDN_URL,
  accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
};

/**
 * Get S3 Client (creates new instance with current config)
 */
export const getS3Client = () => {
  return new S3Client({
    region: s3Config.region,
    forcePathStyle: false,
    credentials: s3Config.accessKeyId && s3Config.secretAccessKey
      ? {
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey,
        }
      : undefined,
  });
};

export const s3Client = getS3Client();

/**
 * Validate S3 configuration
 */
export const validateS3Config = (): boolean => {
  return !!(
    s3Config.bucketName &&
    s3Config.accessKeyId &&
    s3Config.secretAccessKey &&
    s3Config.region
  );
};

/**
 * Get CDN URL or fallback to S3 URL
 */
export const getCDNUrl = (fileKey: string): string => {
  if (s3Config.cdnUrl) {
    const baseUrl = s3Config.cdnUrl.endsWith('/')
      ? s3Config.cdnUrl.slice(0, -1)
      : s3Config.cdnUrl;
    return `${baseUrl}/${fileKey}`;
  }
  return `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${fileKey}`;
};
