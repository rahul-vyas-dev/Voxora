# audio_path model msg keep_alive text language_code
from app.core.llm import run_llm
from app.core.tts import text_to_speech


class LLMTTSPipelineError(Exception):
    """Custom error for LLM-TTS pipeline failures"""
    pass


def text_generation_and_text_to_speech_generation_pipeline(
    text: str,
    tid: int,
    session
):
    # Validate input
    if not text:
        raise ValueError("Text input is required")

    try:
        if tid != session.task_id:
            return False

        # Run LLM to generate text
        llm_text = run_llm(model="dolphin-mistral:latest", msg=text, keep_alive="15m")

        if not llm_text:
            raise ValueError("LLM did not return any text")

        if tid != session.task_id:
            return False

        # Run TTS to convert text to audio
        audio = text_to_speech(text=str(llm_text), language_code="hi")

        if not audio:
            raise ValueError("TTS did not return any audio")

        # Return the generated audio
        return audio

    except Exception as e:
        raise LLMTTSPipelineError("Error during llm/tts pipeline", e)
