from .core.llm import run_llm

res = run_llm(model="dolphin-mistral:latest", stream=False, msg="why the sky is blue?")
print(res)
