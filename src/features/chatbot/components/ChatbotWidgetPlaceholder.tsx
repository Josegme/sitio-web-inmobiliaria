"use client";

import React, { useState } from 'react';
import { processUserMessage } from '../chatbotLogic';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export function ChatbotWidgetPlaceholder() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! Soy el asistente virtual de Horizonte Propiedades. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { sender: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const botResponseText = processUserMessage(input);
      setMessages([...newMessages, { sender: 'bot', text: botResponseText }]);
    }, 500);
  };

  // Función mágica para convertir el texto plano con corchetes en enlaces HTML reales y clickeables
  const renderMessageText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Texto antes del enlace
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];

      // Si es un enlace interno de galería (#galeria), hacemos scroll suave; si es externo (WhatsApp), abre pestaña nueva
      if (linkUrl.startsWith('#')) {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(linkUrl);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false); // Cierra el chat para ver la galería
              }
            }}
            className="block mt-2 text-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-md"
          >
            {linkText} 🔗
          </a>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-md"
          >
            {linkText} 💬
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-6 left-20 z-50">
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-2xl transition-all flex items-center gap-2 font-medium border border-amber-500/30"
        >
          🤖 Chat IA
        </button>
      )}

      {/* Ventana del Chat */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
          {/* Cabecera */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <span className="font-semibold flex items-center gap-2">🤖 Asistente Horizonte</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-bold px-2 py-1"
            >
              ✕
            </button>
          </div>

          {/* Cuerpo de mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm whitespace-pre-line">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[90%] ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white ml-auto'
                    : 'bg-slate-800 text-slate-200 mr-auto border border-slate-700'
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            ))}
          </div>

          {/* Input para escribir */}
          <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe lo que buscas..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}