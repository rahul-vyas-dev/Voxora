type WhisperModel = "tiny" | "base" | "medium" | "large";

interface ModelOption {
  name: WhisperModel;
  desc: string;
}

export const models: ModelOption[] = [
  {
    name: "tiny",
    desc: "Fastest speed",
  },
  {
    name: "base",
    desc: "Efficient balance",
  },
  {
    name: "medium",
    desc: "Best overall",
  },
  {
    name: "large",
    desc: "Highest accuracy",
  },
];