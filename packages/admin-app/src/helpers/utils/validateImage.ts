export default function validateImage(img: File): string | null {
  let error: string | null = null;
  if (
    !["image/png", "image/jpeg", "image/webp", "image/gif"].includes(img.type)
  ) {
    error = "Image type must be one of .png, .jpg, .webp or .gif";
  }

  return error;
}
