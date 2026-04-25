import whisper

_model_cache = {}


def get_whisper_model(model_size: str = "base"):
    if model_size not in _model_cache:
        _model_cache[model_size] = whisper.load_model(model_size)
    return _model_cache[model_size]


def speech_to_text(
    audio_path: str,
    model_size: str = "base",
    translate: bool = False
):
    model = get_whisper_model(model_size)

    result = model.transcribe(
        audio_path,
        task="translate" if translate else "transcribe",
        fp16=False,  # CPU safe
        verbose=False
    )

    return {
        "text": result["text"],
        "language": result["language"],
        "segments": result.get("segments", [])
    }
