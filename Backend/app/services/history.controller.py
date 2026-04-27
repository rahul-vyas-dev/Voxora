from app.db.db import get_db
from app.models.history_model import ChatHistory


def create_user_history(
    session_id: str,
    user_prompt: str,
    ai_response: str
):
    try:
        chat_history = ChatHistory(
            session_id=session_id,
            user_prompt=user_prompt,
            ai_response=ai_response
        )
        db = next(get_db())
        db.add(chat_history)
        db.commit()
        db.refresh(chat_history)
        return chat_history

    except Exception as e:
        print("Error during creating user history:", e)
        db.rollback()

    finally:
        db.close()
