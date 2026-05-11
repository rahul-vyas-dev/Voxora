from app.core.stt import speech_to_text
from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

router = APIRouter()


@router.post("/stt")
def stt(    
    audio: UploadFile = File(...),
    model_size: str = Form(...),
    translate: bool = Form(...)
):
    
    if not audio.file:
        return {"result": "voice is Required for STT."}
    

    os.makedirs("uploads", exist_ok=True)

    temp_file_path = f"uploads/{audio.filename}"

    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)

        result = speech_to_text(
            audio_path=temp_file_path,
            model_size=model_size,
            translate=translate
        )

        return result
    
    except Exception as e:
        print("Error during stt generation.", e)

    finally:
        os.remove(temp_file_path)