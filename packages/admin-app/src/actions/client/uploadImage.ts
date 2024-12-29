export async function uploadImage({
  file,
  filename,
}: {
  file: File;
  filename?: string;
}) {
  const queryParams = new URLSearchParams();

  if (filename) {
    queryParams.append("k", filename);
  }

  const queryStr = queryParams.toString();

  return fetch(`/api/images${queryStr ? `?${queryStr}` : ""}`, {
    method: "POST",
    body: file,
    headers: {
      "content-type": file.type,
    },
  });
}
