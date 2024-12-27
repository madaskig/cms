import { MIMEType } from "~/types";

export function determineFileExtension(contentType?: MIMEType | null) {
  if (!contentType) {
    return "";
  }

  switch (contentType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    case "image/tiff":
      return "tif";
    default:
      return "";
  }
}
