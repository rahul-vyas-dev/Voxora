from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
import os

load_dotenv()


class TTSError(Exception):
    """Custom error for TTS failures"""
    pass


if not os.getenv("ELEVENLABS_API_KEY"):
    message = (
                "ELEVENLABS_API_KEY environment variable is not set. Please set it to use ElevenLabs TTS."
                "You can get an API key from https://elevenlabs.io/"
    )
    raise TTSError(message)


def text_to_speech(
    text: str,
    voice_id: str = "JBFqnCBsd6RMkjVDRZzb",
    model_id: str = "eleven_v3",
    output_format: str = "mp3_44100_128",
    language_code: str = "en"
):
    try:
        elevenlabs = ElevenLabs(
            api_key=os.getenv("ELEVENLABS_API_KEY"),
        )

        audio = elevenlabs.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id=model_id,
            output_format=output_format,
            language_code=language_code
        )
        return audio
    except Exception as e:
        raise TTSError(f"TTS conversion error: {str(e)}")
