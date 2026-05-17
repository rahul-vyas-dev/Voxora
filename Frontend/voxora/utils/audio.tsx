export const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();

    audio.src = URL.createObjectURL(file);

    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);

      URL.revokeObjectURL(audio.src);
    });

    audio.addEventListener("error", (error) => {
      reject(error);
    });
  });
};