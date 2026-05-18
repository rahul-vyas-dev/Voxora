from fastapi import APIRouter, UploadFile, File, Form
from multiprocessing import Process, Queue
from app.core.stt_process import current_process
from app.core.stt import speech_to_text
import shutil
import os
import uuid

router = APIRouter()


def run_stt(
    queue: Queue,
    audio_path: str,
    model_size: str,
    translate: bool
):
    try:
        result = speech_to_text(
            audio_path=audio_path,
            model_size=model_size,
            translate=translate
        )

        queue.put(result)

    except Exception as e:
        queue.put({
            "error": str(e)
        })


@router.post("/stt")
def stt(
    audio: UploadFile = File(...),
    model_size: str = Form(...),
    translate: bool = Form(...)
):
    global current_process

    # kill previous process
    if current_process and current_process.is_alive():
        current_process.terminate()
        current_process.join()

    os.makedirs("uploads", exist_ok=True)

    try:
        temp_file_path = f"uploads/{uuid.uuid4()}-{audio.filename}"

        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)

        queue = Queue()

        process = Process(
            target=run_stt,
            args=(
                queue,
                temp_file_path,
                model_size,
                translate
            )
        )

        current_process = process

        process.start()

        process.join()

        result = queue.get()

    except Exception as e:
        print("Error during STT", e)

    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

    return result
