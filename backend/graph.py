from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
import os
from dotenv import load_dotenv

class AgentState(TypedDict):
    messages: Annotated[List, add_messages]
    is_satisfactory: bool

# Load environment variables
load_dotenv()

try:
    openai_api_key = os.getenv("OPENAI_API_KEY")
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    retriever = vectorstore.as_retriever()
except Exception as e:
    print(f"❌ Error loading vector database: {e}")
    print("Please run 'python ingest.py' to create the vector database first.")
    raise

openai_api_key = os.getenv("OPENAI_API_KEY")
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key)

def researcher_node(state: AgentState):
    query = state["messages"][-1].content
    docs = retriever.invoke(query)
    context = "\n".join([d.page_content for d in docs])
    prompt = f"Context: {context}\n\nQuestion: {query}"
    response = llm.invoke(prompt)
    return {"messages": [response], "is_satisfactory": False}

def critic_node(state: AgentState):
    last_answer = state["messages"][-1].content
    grade = llm.invoke(f"Is this answer 100% accurate based on the query? YES or NO: {last_answer}")
    return {"is_satisfactory": "YES" in grade.content.upper()}

def router(state: AgentState):
    return END if state["is_satisfactory"] else "researcher"

workflow = StateGraph(AgentState)
workflow.add_node("researcher", researcher_node)
workflow.add_node("critic", critic_node)
workflow.add_edge(START, "researcher")
workflow.add_edge("researcher", "critic")
workflow.add_conditional_edges("critic", router)

agent_app = workflow.compile()