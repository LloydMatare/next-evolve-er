'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle, Send, X } from 'lucide-react'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  role: ChatRole
  content: string
}

const STARTER_PROMPTS = [
  'How do I register?',
  'What is the summit program?',
  'How can my company sponsor or exhibit?',
  'Where is the venue and what are the dates?',
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hi! I’m the Evolve Summit assistant. Ask me about registration, the program, partnerships, or anything else.',
    },
  ])

  const listRef = useRef<HTMLDivElement>(null)

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [open, messages])

  async function sendMessage(text: string) {
    const content = text.trim()
    if (!content || loading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!res.ok || !res.body) {
        const errorText = await res.text().catch(() => '')
        throw new Error(errorText || 'Chat request failed')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let assistantText = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        assistantText += chunk

        // The AI SDK data stream includes framing; for a lightweight UI we keep it simple:
        // strip obvious event-stream markers and accumulate visible text.
        const cleaned = assistantText
          .replaceAll('data:', '')
          .replaceAll('\n\n', '\n')
          .trimStart()

        setMessages((prev) => {
          const copy = [...prev]
          const last = copy[copy.length - 1]
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { role: 'assistant', content: cleaned }
          }
          return copy
        })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry — I couldn’t reach the chat service right now. If you just set this up, make sure `OPENAI_API_KEY` is configured on your dev server.',
        },
      ])
      // eslint-disable-next-line no-console
      console.error('Chat error:', message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {open ? (
        <div className="event-panel-dark w-[min(92vw,26rem)] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(4,7,18,0.55)]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/6 px-5 py-4">
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Summit Assistant
              </div>
              <div className="truncate text-sm font-semibold text-white">
                Ask about registration, program, and partnerships
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-9 w-9 rounded-full text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div ref={listRef} className="max-h-[22rem] space-y-3 overflow-auto px-5 py-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`rounded-[1.4rem] border px-4 py-3 text-sm leading-6 ${
                  m.role === 'user'
                    ? 'ml-auto max-w-[92%] border-white/10 bg-white/10 text-white'
                    : 'mr-auto max-w-[92%] border-white/10 bg-black/35 text-slate-200'
                }`}
              >
                {m.content}
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="mt-4 grid grid-cols-1 gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            className="border-t border-white/10 bg-white/6 p-4"
            onSubmit={(e) => {
              e.preventDefault()
              void sendMessage(input)
            }}
          >
            <div className="flex items-center gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? 'Thinking…' : 'Type your question…'}
                className="h-12 rounded-full border-white/16 bg-white/6 text-white placeholder:text-slate-400 focus-visible:ring-[var(--brand-gold)]"
              />
              <Button
                type="submit"
                disabled={!canSend}
                className="h-12 rounded-full bg-[var(--brand-gold)] px-5 text-slate-950 hover:bg-[#ffe36b] disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="h-12 rounded-full bg-[var(--brand-gold)] px-5 text-slate-950 hover:bg-[#ffe36b] shadow-[0_18px_50px_rgba(255,204,0,0.25)]"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-2 text-sm font-semibold">Chat</span>
        </Button>
      )}
    </div>
  )
}

