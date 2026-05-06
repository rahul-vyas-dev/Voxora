from fastapi import FastAPI, WebSocket
import asyncio


class SessionState:
    def __init__(self) -> None:
        self.current_task: asyncio.Task | None = None
        self.task_id: int = 0


app = FastAPI()

@app.websocket("/ws")
async def ws(ws: WebSocket):
    await ws.accept()

    session = SessionState()

    while True:
        msg = await ws.receive()

        # 🎧 AUDIO CHUNK
        if "bytes" in msg:

            # interrupt current pipeline
            if session.current_task and not session.current_task.done():
                session.current_task.cancel()

            session.audio_buffer.append(msg["bytes"])

        # 🛑 END OF SPEECH
        elif msg.get("text") == "END_SPEECH":

            full_audio = b"".join(session.audio_buffer)
            session.audio_buffer.clear()

            # new task id
            session.task_id += 1
            tid = session.task_id

            # start pipeline
            session.current_task = asyncio.create_task(
                pipeline(ws, full_audio, tid, session)
            )
