import asyncio


class SessionState:
    def __init__(self) -> None:
        self.current_task: asyncio.Task | None = None
        self.task_id: int = 0
