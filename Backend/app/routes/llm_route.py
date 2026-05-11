from fastapi import APIRouter, Request
from app.core.llm import run_llm
from fastapi.responses import StreamingResponse
from app.services.history_controller import create_user_history

router = APIRouter()

@router.post("/c")
async def llm(req: Request):

    body = await req.json()

    prompt = body.get("prompt")
    model = body.get("model")
    think = body.get("think")
    session_id = body.get("session_id")

    if not prompt or not model:
        return {"error": "Prompt and model are required"}

    if not session_id:
        return {"error": "Session ID is required"}

    try:

        response = run_llm(
            msg=prompt,
            model=model,
            stream=True,
            think=think,
            keep_alive="5m"
        )

        llm_generated_text = ""

        async def stream_generator():

            nonlocal llm_generated_text

            try:

                for chunk in response:

                    llm_generated_text += chunk

                    yield chunk

                print("FINAL TEXT:", llm_generated_text)

                await create_user_history(session_id=session_id, user_prompt=prompt, ai_response=llm_generated_text)

            except Exception as e:
                print("Streaming Error:", e)
                yield "Streaming Error"

        return StreamingResponse(
            stream_generator(),
            media_type="text/plain"
        )

    except Exception as e:
        print("Error during llm text generation", e)

        return {
            "error": "Error during llm text generation"
        }