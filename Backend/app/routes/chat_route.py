from fastapi import WebSocket, APIRouter
import asyncio
from app.core.stt import speech_to_text
from app.services.chat_controller import text_generation_and_text_to_speech_generation_pipeline
from app.services.history_controller import create_user_history, delete_session_chat

router = APIRouter()


class SessionState:
    def __init__(self) -> None:
        self.current_task: asyncio.Task | None = None
        self.task_id: int = 0
        self.temp_audio_path: str = "uploads/session_audio.webm"
        self.partial_text: str = ""


@router.websocket("/ws")
async def ws(ws: WebSocket):
    await ws.accept()

    session = SessionState()

    while True:
        msg = await ws.receive()

        # AUDIO CHUNK
        if "bytes" in msg:
            session.task_id += 1

            # interrupt current pipeline
            if session.current_task and not session.current_task.done():
                session.current_task.cancel()
            
            chunk = msg["bytes"]

            try:
                with open(session.temp_audio_path, "ab") as f:
                    f.write(chunk)

                ai_generated_text = speech_to_text(audio_path=session.temp_audio_path)

                session.partial_text += " " + ai_generated_text["text"]

                await ws.send_json({
                    "type": "partial_text",
                    "text": ai_generated_text["text"],
                    "detected_lang": ai_generated_text["language"]
                })
                
            except Exception as e:
                print("Error during STT:", e)

            finally:
                open(session.temp_audio_path, "wb").close()

        # END OF SPEECH
        elif msg.get("text") == "END_SPEECH":

            # new task id
            tid = session.task_id

            # start pipeline
            session.current_task = asyncio.create_task(
                text_generation_and_text_to_speech_generation_pipeline(
                    text = session.partial_text,
                    tid = tid,
                    session = session
                ))

            session.current_task.result().then(
                lambda result: asyncio.create_task(
                    ws.send_json({
                        "type": "final_result",
                        "audio": result["audio"],
                        "llm_text": result["llm_text"]
                    })
                )
            ).then(
                lambda result: create_user_history(
                    session_id=str(msg.get("session_id")),
                    user_prompt=session.partial_text,
                    ai_response=result["llm_text"]
                )
            ).catch(
                lambda e: print("Error in pipeline:", e)
            )
            
            # reset partial text for next round
            session.partial_text = ""

        else:
            print("Unknown message type received:", msg)


@router.delete("/chat/{session_id}")
def delete_chat(session_id: str):

    if session_id == None:
        return "Session ID is required."
    
    result = delete_session_chat(session_id=session_id)
    return result