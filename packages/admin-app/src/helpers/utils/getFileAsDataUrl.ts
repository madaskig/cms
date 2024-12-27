export default function getFileAsDataUrl(
  fileReader: FileReader,
  file: File,
): Promise<string | null> {
  fileReader.abort();

  return new Promise((resolve, reject) => {
    fileReader.addEventListener("load", () => {
      console.log("ON LOAD");
      resolve(fileReader.result as string);
    });

    fileReader.addEventListener("loadend", (e) => {
      console.log("ON LOAD END");

      if (e.loaded) {
        resolve(fileReader.result as string);
      } else {
        resolve(null);
      }
    });

    fileReader.addEventListener("error", (e) => {
      console.log("ERROR");

      reject("error");
    });

    fileReader.readAsDataURL(file);
  });
}
