from typing import Dict, Any, Generator, Union, Literal
from ollama import chat


system_prompt = """
You are a close friend talking casually.

Your style:
- relaxed, informal, human-like
- witty, sarcastic when appropriate
- playful teasing is okay
- not overly polite or robotic
- no unnecessary apologies

Keep responses natural, like real conversation between friends.

Do NOT sound like an AI assistant.
Do NOT be formal or corporate.
"""


class LLMError(Exception):
    """Custom error for LLM failures"""
    pass


def run_llm(
    model: str,
    msg: str,
    stream: bool = False,
    think: Union[bool, Literal['low', 'medium', 'high'], None] = None,
    options: Dict[str, Any] | None = None,
    keep_alive: Union[str, float, None] = None,
) -> Union[str, Generator[str, None, None]]:
    """
    Standard LLM wrapper for Voxora

    Args:
        model (str): Model name (e.g., 'llama3')
        msg (list): User query(string)
        stream (bool): Enable streaming response
        think (bool | str): 'low' | 'medium' | 'high'
        options (dict): Model options (temperature, num_predict, etc.)
        keep_alive (str | float): Keep model alive (e.g., '5m')

    Returns:
        str OR generator (if stream=True)
    """

    if not model:
        raise ValueError("Model name is required")

    if not msg:
        raise ValueError("msg must be a non-empty list")

    try:
        if stream:
            response = chat(
                model=model,
                messages=[
                  {"role": "user", "content": msg},
                  {"role": "system", "content": system_prompt}
                ],
                stream=True,
                think=think,
                options=options,
                keep_alive=keep_alive,
            )

            def stream_generator():
                try:
                    for chunk in response:
                        if "message" in chunk and "content" in chunk["message"]:
                            yield chunk["message"]["content"]
                except Exception as e:
                    raise LLMError(f"Streaming error: {str(e)}")

            return stream_generator()

        # Normal Mode
        else:
            response = chat(
                model=model,
                messages=[
                  {"role": "user", "content": msg},
                  {"role": "system", "content": system_prompt}
                ],
                stream=False,
                think=think,
                options=options,
                keep_alive=keep_alive,
            )

            return response.get("message", {}).get("content", "")

    except Exception as e:
        raise LLMError(f"LLM request failed: {str(e)}")
