export function getDistinctFiles(files1: File[], files2: File[]) {
  const allFiles = [...files1, ...files2];
  return allFiles.filter((file, index) => {
    return allFiles.findIndex((file2) => file.name === file2.name) === index;
  });
}
