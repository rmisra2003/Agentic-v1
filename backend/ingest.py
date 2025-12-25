import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

dummy_text = """
PROJECT OMEGA - INTERNAL POLICY
1. Project Omega is led by Ram Misra.
2. The budget is $5M for the 2025 fiscal year.
3. All AI outputs must be verified by a Critic Agent to ensure zero hallucinations.
4. Remote work is authorized only on Fridays.
"""

def create_vector_db():
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
        docs = text_splitter.create_documents([dummy_text])
        openai_api_key = os.getenv("OPENAI_API_KEY")
        embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
        vectorstore = FAISS.from_documents(docs, embeddings)
        vectorstore.save_local("faiss_index")
        print("✅ Vector database created.")
    except Exception as e:
        print(f"❌ Error creating vector database: {e}")
        raise

if __name__ == "__main__":
    create_vector_db()