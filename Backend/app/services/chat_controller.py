# audio_path model msg keep_alive text language_code
from app.core.llm import run_llm
from app.core.tts import text_to_speech
from typing import Any
import asyncio

class LLMTTSPipelineError(Exception):
    """Custom error for LLM-TTS pipeline failures"""
    pass


async def text_generation_and_text_to_speech_generation_pipeline(
    text: str,
    tid: int,
    session
)-> dict[str, Any] | None:
    # Validate input
    if not text:
        raise ValueError("Text input is required")

    try:
        if tid != session.task_id:
            return None

        # Run LLM to generate text
        llm_text = await asyncio.to_thread(run_llm, model="dolphin-mistral:latest", msg=text, keep_alive="15m")

        if not llm_text:
            raise ValueError("LLM did not return any text")

        if tid != session.task_id:
            return None

        # Run TTS to convert text to audio
        audio = await asyncio.to_thread(text_to_speech, text=str(llm_text), language_code="hi")

        if not audio:
            raise ValueError("TTS did not return any audio")

        # Return the generated audio
        return {
            "audio": audio,
            "llm_text": llm_text
            }

    except Exception as e:
        raise LLMTTSPipelineError("Error during llm/tts pipeline", e)
