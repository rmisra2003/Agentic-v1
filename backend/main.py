from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph import agent_app
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

server = FastAPI()

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

@server.post("/chat")
async def chat_endpoint(request: QueryRequest):
    initial_state = {"messages": [HumanMessage(content=request.question)], "is_satisfactory": False}
    result = await agent_app.ainvoke(initial_state)
    return {"answer": result["messages"][-1].content, "is_verified": True}