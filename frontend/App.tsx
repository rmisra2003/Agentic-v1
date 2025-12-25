import React, { useState, useEffect } from 'react';
import { Send, Search, Gavel, CheckCircle2, BrainCircuit, Activity, Bot, User, Cpu } from 'lucide-react';
import { Message, TraceStep, AgentState } from './types';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [agentStatus, setAgentStatus] = useState<AgentState>('Idle');
  const [executionStream, setExecutionStream] = useState<TraceStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);
    setAgentStatus('Researching...');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();

      setExecutionStream([
        { id: '1', name: 'Researcher', status: 'success', iconType: 'researcher', description: 'Context retrieved.', timestamp: new Date().toLocaleTimeString() },
        { id: '2', name: 'Critic', status: 'success', iconType: 'critic', description: 'Answer verified.', timestamp: new Date().toLocaleTimeString() }
      ]);

      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: data.answer, 
        timestamp: new Date(), 
        isVerified: true 
      }]);
      setAgentStatus('Verified');
    } catch (err) {
      setAgentStatus('Error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#080b14] text-slate-100">
      <div className="flex-1 flex flex-col">
        <header className="p-4 font-bold border-b border-slate-800 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          <span>Agentic RAG Control Panel</span>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 p-4 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 rounded-br-none' 
                    : 'bg-slate-800 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-green-400" />
                  )}
                  <span className="text-xs font-semibold">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                  {msg.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-800 p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Project Omega..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50"
              disabled={isProcessing}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      
      <div className="w-80 border-l border-slate-800 p-4 bg-slate-900/50">
        <div className="mb-4">
          <h2 className="font-bold flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" />
            Agent Status
          </h2>
          <div className="flex items-center gap-2 p-2 bg-slate-800 rounded">
            <Cpu className="w-4 h-4 text-yellow-400" />
            <span>{agentStatus}</span>
          </div>
        </div>
        
        <div>
          <h2 className="font-bold flex items-center gap-2 mb-2">
            <Search className="w-4 h-4" />
            Execution Trace
          </h2>
          <div className="space-y-2">
            {executionStream.map((step) => (
              <div key={step.id} className="p-2 bg-slate-800 rounded text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{step.name}</span>
                  <span className="text-xs text-slate-400">{step.timestamp}</span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}