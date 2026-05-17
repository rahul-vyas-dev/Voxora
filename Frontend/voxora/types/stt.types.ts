export interface STTStudioFormValues {
  // audio upload
  audioFile: File | null;

  // transcription configuration
  modelSize: "tiny" | "base" | "medium" | "large";

  // switches
  translateToEnglish: boolean;
  voiceActivityDetection: boolean;
}

export interface STTResponse {
  text: string;
  language: string;
  segments: string[];
}
