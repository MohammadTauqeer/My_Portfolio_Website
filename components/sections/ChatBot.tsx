'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, X, User, Bot, Sparkles, MessageSquare, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const quickPrompts = [
  "🚀 What are your top projects?",
  "⚡ What is your primary tech stack?",
  "💼 How can I hire or contact you?",
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Salam! I'm Tauqeer's AI Assistant. Ask me anything about his projects, skills, or experience (English ya Roman Urdu mein)!", 
      sender: 'bot' 
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen, isLoading])

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return

    const newUserMessage: Message = {
      id: Date.now(),
      text: queryText,
      sender: 'user'
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: queryText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch response")
      }

      const data = await response.json()
      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.text,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error("ChatBot Error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please try asking again or reach out to Tauqeer directly!",
        sender: 'bot'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = () => {
    sendQuery(inputValue)
  }

  const handleResetChat = () => {
    setMessages([
      { 
        id: Date.now(), 
        text: "Chat reset! How can I assist you with Tauqeer's portfolio today?", 
        sender: 'bot' 
      }
    ])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-96 md:w-[400px] h-[520px] max-h-[80vh] bg-[#090314]/95 backdrop-blur-2xl border border-purple-500/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(147,51,234,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-black/60 to-purple-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 p-[1.5px] shadow-md shadow-purple-950">
                    <div className="w-full h-full rounded-xl bg-[#0c041c] flex items-center justify-center text-purple-300">
                      <Sparkles className="w-4 h-4 text-purple-300" />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#090314]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm tracking-tight flex items-center gap-1.5" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                    <span>Tauqeer</span>
                    <span className="text-purple-400">AI</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online • Roman Urdu & Eng</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-2 text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 text-slate-400 hover:text-white hover:bg-purple-500/10 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Starter Suggestions (when chat is short) */}
            {messages.length <= 1 && (
              <div className="px-4 pt-3 pb-1 border-b border-purple-500/10 bg-black/30">
                <div className="text-[11px] font-mono text-purple-300/80 mb-2 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Suggested queries:</span>
                </div>
                <div className="flex flex-col gap-1.5 pb-2">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => sendQuery(prompt)}
                      className="text-left text-xs px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/40 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                      msg.sender === 'user' 
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' 
                        : 'bg-gradient-to-br from-purple-500/30 to-violet-700/30 text-purple-300 border border-purple-500/30'
                    }`}>
                      {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs md:text-sm whitespace-pre-wrap leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-tr-none shadow-md shadow-purple-950/40' 
                        : 'bg-white/[0.04] border border-purple-500/20 text-slate-200 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[80%] items-center">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                      <Bot size={13} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white/[0.04] border border-purple-500/20 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-3.5 border-t border-purple-500/20 bg-black/60">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask in English ya Roman Urdu..."
                  disabled={isLoading}
                  className="flex-1 bg-black/60 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white p-2.5 rounded-xl transition-all duration-300 disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 active:scale-95 shadow-md shadow-purple-950/50 flex items-center justify-center"
                  aria-label="Send Message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D-Styled Floating Trigger Icon */}
      <div className="relative group flex items-center">
        {/* Ambient Purple Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse pointer-events-none" />

        {/* Hover Tooltip Pill */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 absolute right-20 px-3.5 py-1.5 rounded-full bg-[#0d031c]/90 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-purple-200 shadow-xl shadow-purple-950/50 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Chat with AI</span>
          </div>
        )}

        {/* 3D Orb Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-800 p-[2px] shadow-[0_10px_35px_rgba(147,51,234,0.45),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label={isOpen ? "Close AI Chat" : "Open AI Chat Assistant"}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a0836] via-[#0e0320] to-[#05000a] flex items-center justify-center relative overflow-hidden">
            {/* 3D Specular Highlight */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="text-purple-200 flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="sparkles"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center text-purple-200 group-hover:text-white transition-colors"
                >
                  <Sparkles className="w-7 h-7 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Online Ping Dot */}
            {!isOpen && (
              <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#090314]"></span>
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
