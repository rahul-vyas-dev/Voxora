from app.db.db import get_db
from app.models.history_model import ChatHistory
from sqlalchemy import delete, select, update

async def create_user_history(
    session_id: str,
    user_prompt: str,
    ai_response: str
):
    try:
        db = next(get_db())

        result = select(ChatHistory).where(ChatHistory.session_id == session_id)
        existing_session = db.execute(result).scalar_one_or_none()

        if existing_session:

            existing_session.messages = (
                existing_session.messages + [{
                    "user_prompt": user_prompt,
                    "ai_response": ai_response
                }]
            )

            db.commit()
            db.refresh(existing_session)

            return existing_session

        chat_history = ChatHistory(
            session_id = session_id,
            messages=[{
                "user_prompt": user_prompt,
                "ai_response": ai_response
            }]
        )
        db.add(chat_history)
        db.commit()
        db.refresh(chat_history)
        return chat_history

    except Exception as e:
        print("Error during creating user history:", e)
        db.rollback()

    finally:
        db.close()



def delete_session_chat(session_id: str):
    db = next(get_db())

    try:
        stmt = delete(ChatHistory).where(
            ChatHistory.session_id == session_id
        )

        db.execute(stmt)
        db.commit()

        return {
            "message": "Session deleted successfully"
        }

    except Exception as e:
        db.rollback()
        print("Error during deleting session chat:", e)

        return {
            "error": "Failed to delete session"
        }

    finally:
        db.close()
