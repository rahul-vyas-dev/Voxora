from sqlalchemy import String, DateTime, TEXT
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from datetime import datetime


class Base(DeclarativeBase):
    pass


class ChatHistory(Base):
    # Table Name
    __tablename__ = "chat_history"
    # columns for table
    session_id: Mapped[str] = mapped_column(String, index=True, nullable=False, primary_key=True)
    user_prompt: Mapped[str] = mapped_column(TEXT)
    ai_response: Mapped[str] = mapped_column(TEXT)
    time_stamps: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now()
    )

    def __repr__(self) -> str:
        return f"ChatHistory(session_id={self.session_id!r}, user_prompt={self.user_prompt!r}, ai_response={self.ai_response!r}, time_stamps={self.time_stamps!r})"
