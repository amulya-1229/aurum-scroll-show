import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { ArrowUp, RotateCcw, Square, UtensilsCrossed, X } from "lucide-react";

const suggestions = ["What do you recommend?", "Vegetarian dishes?", "Opening hours?", "Something spicy"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open, status]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, status]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setError(null);
    setInput("");
    sendMessage({ text: t });
  };

  return (
    <>
      {open && (
        <section className="chat-panel" aria-label="Chat with Aurum">
          <header className="chat-head">
            <span className="chat-avatar"><UtensilsCrossed size={16} /></span>
            <div><strong>Aurum Host</strong><small>Ask about our dishes & restaurant</small></div>
            <button className="chat-icon" aria-label="Start over" onClick={() => { stop(); setMessages([]); setError(null); }}><RotateCcw size={16} /></button>
            <button className="chat-icon" aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
          </header>
          <div className="chat-body">
            <div className="chat-msg assistant"><p>Namaste and welcome to <strong>Aurum</strong>! I can tell you about our dishes, spice levels, hours, ordering and reservations. What would you like to know?</p></div>
            {messages.length === 0 && (
              <div className="chat-suggest">{suggestions.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg ${m.role}`}>
                {m.parts.map((p, i) => p.type === "text" ? (
                  m.role === "assistant" ? <ReactMarkdown key={i}>{p.text}</ReactMarkdown> : <p key={i}>{p.text}</p>
                ) : null)}
              </div>
            ))}
            {status === "submitted" && <div className="chat-msg assistant chat-typing" aria-label="Typing"><span /><span /><span /></div>}
            {error && <p className="chat-error" role="alert">{error}</p>}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <textarea ref={inputRef} rows={1} value={input} placeholder="Ask about a dish..." onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} />
            {busy ? <button type="button" className="chat-send" aria-label="Stop" onClick={() => stop()}><Square size={14} /></button>
              : <button type="submit" className="chat-send" aria-label="Send" disabled={!input.trim()}><ArrowUp size={16} /></button>}
          </form>
        </section>
      )}
      <button className="chat-launcher" aria-label={open ? "Close chat" : "Chat with Aurum"} onClick={() => setOpen((o) => !o)}>
        {open ? <X size={22} /> : <UtensilsCrossed size={22} />}
      </button>
    </>
  );
}
