// import { envConfig } from "@/lib/environment"; // For future use with local storage
import { uploadToS3, uploadMultipleToS3 } from "./s3Uploader";
// import { saveFileLocally, saveMultipleFilesLocally } from "./localUploader"; // For future use
import { validateS3Config } from "@/lib/s3";

export interface UploadResult {
  success: boolean;
  filename: string;
  url: string;
  key?: string;
  error?: string;
}

export interface UploaderOptions {
  folder?: string;
  keepOriginalName?: boolean;
}

/**
 * Save single file
 * Currently uses S3 only, but structured to easily add local storage
 */
export const saveFile = async (
  file: File,
  options?: UploaderOptions
): Promise<UploadResult> => {
  try {
    // TODO: Add local storage support for development
    // if (envConfig.NODE_ENV === "development") {
    //   const localResult = await saveFileLocally(file);
    //   return {
    //     success: true,
    //     filename: localResult.filename,
    //     url: localResult.url,
    //     key: `local:${file.name}`,
    //   };
    // }

    // Use S3 for production (and currently for all environments)
    if (validateS3Config()) {
      const result = await uploadToS3(file, options);

      if (!result.success) {
        return {
          success: false,
          filename: file.name,
          url: "",
          error: result.error,
        };
      }

      return {
        success: true,
        filename: file.name,
        url: result.url || "",
        key: result.key,
      };
    } else {
      throw new Error("S3 is not configured. Please set up AWS credentials.");

      // TODO: Fallback to local storage if S3 is not configured
      // console.warn("S3 not configured, falling back to local storage");
      // const localResult = await saveFileLocally(file);
      // return {
      //   success: true,
      //   filename: localResult.filename,
      //   url: localResult.url,
      //   key: `local:${file.name}`,
      // };
    }
  } catch (error: any) {
    console.error(`File upload failed: ${error.message}`, { error });
    return {
      success: false,
      filename: file.name,
      url: "",
      error: error.message,
    };
  }
};

/**
 * Save multiple files
 */
export const saveMultipleFiles = async (
  files: File[],
  options?: UploaderOptions
): Promise<UploadResult[]> => {
  try {
    // TODO: Add local storage support for development
    // if (envConfig.NODE_ENV === "development") {
    //   const localResults = await saveMultipleFilesLocally(files);
    //   return localResults.map((result, index) => ({
    //     success: true,
    //     filename: result.filename,
    //     url: result.url,
    //     key: `local:${files[index].name}`,
    //   }));
    // }

    // Use S3 for production (and currently for all environments)
    if (validateS3Config()) {
      const results = await uploadMultipleToS3(files, options);

      return results.map((result, index) => ({
        success: result.success,
        filename: files[index]?.name || "unknown",
        url: result.url || "",
        key: result.key,
        error: result.error,
      }));
    } else {
      throw new Error("S3 is not configured. Please set up AWS credentials.");

      // TODO: Fallback to local storage if S3 is not configured
      // console.warn("S3 not configured, falling back to local storage");
      // const localResults = await saveMultipleFilesLocally(files);
      // return localResults.map((result, index) => ({
      //   success: true,
      //   filename: result.filename,
      //   url: result.url,
      //   key: `local:${files[index].name}`,
      // }));
    }
  } catch (error: any) {
    console.error(`Multiple file upload failed: ${error.message}`, { error });
    return files.map(file => ({
      success: false,
      filename: file.name,
      url: "",
      error: error.message,
    }));
  }
};

export default {
  saveFile,
  saveMultipleFiles,
};
