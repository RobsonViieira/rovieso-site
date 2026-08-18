"""
Endpoints novos para adicionar ao seu FastAPI existente (EC2).
Cole isso no seu main.py, ou crie um router separado e inclua.

Requisitos:
    pip install anthropic fastapi[all] --break-system-packages
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os

app = FastAPI()  # se já existe uma instância `app`, ignore esta linha

# ── CORS: libera o domínio do seu site na Vercel ──────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://rovieso.com.br",
        "https://www.rovieso.com.br",
        "https://rovieso.vercel.app",  # domínio temporário da Vercel
        "http://localhost:3000",       # dev local
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# Cole aqui o system prompt completo do arquivo
# rovieso-ia-system-prompt.md que já geramos.
SYSTEM_PROMPT = """
Você é o assistente virtual da Rovieso...
(cole o conteúdo completo do system prompt aqui)
"""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        response = client.messages.create(
            model="claude-3-5-haiku-latest",
            max_tokens=500,
            system=SYSTEM_PROMPT,
            messages=[{"role": m.role, "content": m.content} for m in req.messages],
        )
        reply_text = "".join(
            block.text for block in response.content if block.type == "text"
        )
        return ChatResponse(reply=reply_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class ContactForm(BaseModel):
    name: str
    email: str
    message: str


@app.post("/contato")
def contato(form: ContactForm):
    # Aqui você decide o que fazer: salvar no SQLite (como no SLR),
    # enviar e-mail, ou notificar via WhatsApp API.
    # Exemplo simples salvando em arquivo/log por enquanto:
    with open("contatos.log", "a") as f:
        f.write(f"{form.name} | {form.email} | {form.message}\n")
    return {"status": "ok"}
