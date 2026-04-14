from sqlalchemy import String, DateTime, TEXT
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
import datetime


class Base(DeclarativeBase):
    pass


class ChatHistory(Base):
    # Table Name
    __tablename__ = "chat_history"
    # columns for table
    SSid: Mapped[str] = mapped_column(String, primary_key=True, index=True, nullable=False)
    userPrompt: Mapped[str] = mapped_column(TEXT(30))
    aiResponse: Mapped[str] = mapped_column(TEXT)
    time_stamps: Mapped[DateTime] = mapped_column(DateTime, default=datetime.datetime.utcnow)

    def __repr__(self) -> str:
        return f"ChatHistory(SSid={self.SSid!r}, userPrompt={self.userPrompt!r}, aiResponse={self.aiResponse!r}, time_stamps={self.time_stamps!r})"
