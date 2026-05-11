from sqlalchemy import String, DateTime, TEXT, ARRAY
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB


class Base(DeclarativeBase):
    pass


class ChatHistory(Base):
    # Table Name
    __tablename__ = "chat_history"
    # columns for table
    session_id: Mapped[str] = mapped_column(String, index=True, nullable=False, primary_key=True)
    messages: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    time_stamps: Mapped[datetime] = mapped_column(
        DateTime, default = datetime.now
    )

    def __repr__(self) -> str:
        return f"ChatHistory(session_id={self.session_id!r}, messages={self.messages!r}, time_stamps={self.time_stamps!r})"
