from app.services.history_controller import get_chat_history
from fastapi import APIRouter, Request


router = APIRouter()


@router.post("/history")
async def get_history(req: Request):
    body = await req.json()

    try:
        session_ids: list[str] = body.get("session_ids")
        result = get_chat_history(session_ids=session_ids)

        return result

    except Exception as e:
        print("Error during get history", e)
        return {"Error": e}
