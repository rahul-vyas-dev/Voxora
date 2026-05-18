// prompt = body.get("prompt")
// model = body.get("model")
// think = body.get("think")
// session_id = body.get("session_id")

export interface LLMFormValueType {
  prompt: string;
  model: string;
  think: "high" | "medium" | "low";
}
