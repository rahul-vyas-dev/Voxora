from app.services.chat_controller import text_generation_and_text_to_speech_generation_pipeline
from elevenlabs.play import play


class SessionState:
    def __init__(self):
        # self.audio_buffer: list[bytes] = []
        # self.current_task: asyncio.Task | None = None
        self.task_id: int = 0


session = SessionState()
res = text_generation_and_text_to_speech_generation_pipeline(text="some suggestion", tid=0, session=session)
print("soem")
print(res)
if res is not False:
    play(res)
