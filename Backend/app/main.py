from fastapi import FastAPI
from app.db.db import engine
from app.models.history_model import Base
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat_route import router as chat_router
from app.routes.stt_route import router as stt_router
from app.routes.llm_route import router as llm_router
from app.routes.history_route import router as history_router


# =========================
# APP LIFECYCLE
# =========================

@asynccontextmanager
async def lifespan(app: FastAPI):

    # STARTUP
    print("Starting Voxora Backend...")

    # Create tables
    Base.metadata.create_all(bind=engine)

    print("Database tables initialized")

    yield

    # SHUTDOWN
    print("Shutting down Voxora Backend...")


# =========================
# FASTAPI APP
# =========================

app = FastAPI(
    title="Voxora Backend",
    description="AI Voice Assistant Backend",
    version="1.0.0",
    lifespan=lifespan
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# ROUTES
# =========================

app.include_router(chat_router)
app.include_router(stt_router)
app.include_router(llm_router)
app.include_router(history_router)


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health_check():
    return {
        "status": "ok"
    }