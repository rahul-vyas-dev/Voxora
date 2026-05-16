interface Message {
  user_prompt: string
  ai_response: string
}

export interface ChatHistory {
  session_id: string
  messages: Message[]
  time_stamps: string
}