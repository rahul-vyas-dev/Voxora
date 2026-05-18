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

export const handleDownloadText = (apiResponseText: string) => {
  const text = apiResponseText;

  const blob = new Blob([text], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "transcription.txt";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
