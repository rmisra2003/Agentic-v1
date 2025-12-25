# Agentic RAG System

This is an advanced **Retrieval-Augmented Generation (RAG)** system that implements a dual-agent architecture with a **Researcher** and **Critic** to ensure accurate, hallucination-free responses.

---

## 🏗 Architecture

The project follows a dual-component architecture:

### **Backend (AI "Brain")**

* **Framework:** Python with FastAPI server
* **Reasoning:** LangGraph for multi-agent reasoning
* **Operations:** LangChain for RAG operations
* **LLM:** OpenAI integration for LLM capabilities
* **Key Modules:**
* `ingest.py`: Knowledge base creator and vector database setup
* `graph.py`: Dual-agent logic (Researcher + Critic)
* `main.py`: FastAPI server with CORS enabled



### **Frontend (Dashboard)**

* **Framework:** React with TypeScript
* **Styling:** Tailwind CSS
* **Features:** Real-time agent status and execution tracing
* **Key Files:**
* `index.html`: HTML shell with Tailwind and icon imports
* `index.tsx`: React entry point
* `App.tsx`: Main UI logic
* `types.ts`: Type definitions
* `mockService.ts`: Optional mock service



---

## ✨ Features

* **Dual-Agent Architecture:** Researcher agent retrieves relevant context; Critic agent verifies response accuracy.
* **Vector Database:** FAISS for efficient similarity search.
* **Real-time Dashboard:** Visualizes agent execution flow and status.
* **Hallucination Prevention:** Critic agent ensures 100% accuracy verification.

---

## 🚀 Setup

### **Backend Setup**

1. **Install Python dependencies:**
```bash
pip install fastapi uvicorn python-dotenv langchain-community langchain-openai langchain-text-splitters langgraph

```


2. **Configure Environment:**
Create a `.env` file in the `backend/` directory:
```plaintext
OPENAI_API_KEY=your_openai_api_key_here

```


3. **Initialize Vector Database:**
```bash
cd backend
python ingest.py

```


4. **Start Backend Server:**
```bash
uvicorn main:server --reload --port 8000

```



### **Frontend Setup**

1. **Navigate to directory:**
```bash
cd frontend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start development server:**
```bash
npm run dev

```



---

## 🛠 How It Works

1. **Ingestion:** The system ingests documents and creates a FAISS vector database.
2. **Research:** When a query is submitted, the **Researcher agent** retrieves relevant context.
3. **Critique:** The **Critic agent** verifies the accuracy of the response.
4. **Loop:** This process repeats until the response is verified as accurate.
5. **Visualization:** The frontend displays the execution trace and final response.

---

## 📂 Repository Structure

```plaintext
agentic-rag-v1/
├── backend/
│   ├── .env                # API Keys (add to .gitignore)
│   ├── ingest.py           # Knowledge Base Creator
│   ├── graph.py            # Dual-Agent Logic (Researcher + Critic)
│   └── main.py             # FastAPI Server with CORS enabled
└── frontend/
    ├── index.html          # HTML Shell
    ├── index.tsx           # React Entry Point
    ├── App.tsx             # Main UI Logic
    ├── types.ts            # Type Definitions
    ├── mockService.ts      # Simulation Service (Optional)
    ├── package.json        # Node.js Dependencies
    ├── vite.config.ts      # Vite Configuration
    ├── tsconfig.json       # TypeScript Configuration
    ├── tsconfig.app.json   # TypeScript App Configuration
    └── tsconfig.node.json  # TypeScript Node Configuration

```

---

## 💻 Technologies Used

* **Backend:** Python, FastAPI, LangGraph, LangChain, OpenAI
* **Frontend:** React, TypeScript, Tailwind CSS, Vite
* **Database:** FAISS vector store
* **Icons:** Lucide React

---

## 📝 Changes & Enhancements

* **Environment Loading:** Updated Python files to properly load the OpenAI API key from `.env`.
* **Error Handling:** Added try-catch blocks for vector database operations.
* **Frontend UI:** Implemented complete chat functionality, agent status display, and execution tracing.
* **Config Completion:** Added `package.json`, `vite.config.ts`, and `tsconfig` files.
* **Logic Fixes:** Resolved naming conflicts in `graph.py` and improved API key management.

---

> ⚠️ **Security Note:** The `.env` file contains sensitive API keys. **Always** add it to your `.gitignore` to prevent exposure.

Would you like me to help you create a specific `README` for just the backend or frontend folders?
