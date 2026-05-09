from app.routes.chat_route import ws
from fastapi import FastAPI

app = FastAPI()

app.websocket("/ws")(ws)

app.get("/health")(lambda: {"status": "ok"})

