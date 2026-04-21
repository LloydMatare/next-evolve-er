import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json(
      {
        error:
          'Missing OPENAI_API_KEY. Add it to your environment variables to enable the chatbot.',
      },
      { status: 500 },
    )
  }

  const body = await req.json().catch(() => null)
  const messages = body?.messages

  if (!Array.isArray(messages)) {
    return Response.json(
      { error: 'Invalid request body: expected { messages: [] }' },
      { status: 400 },
    )
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: [
      "You are the official support assistant for Evolve ICT Summit 2026, Africa's premier tech and digital transformation event.",
      'The summit takes place June 11-12, 2026 at the Harare International Conference Centre, Zimbabwe.',
      'Be friendly, helpful, and action-oriented. Keep responses concise but informative.',
      'Key pages on the website:',
      '- /register - For registering as a delegate',
      '- /program - View the full event schedule and sessions',
      '- /speakers - Learn about our featured speakers and apply to speak',
      '- /partnerships - Become a sponsor or partner',
      '- /contact - Get in touch with the team',
      '- /faq - Frequently asked questions',
      '- /gallery - View past summit photos and videos',
      '- /previous-summit - Highlights from previous events',
      '- /student-summit - Student-focused track and opportunities',
      'If users ask about registration, direct them to /register with early bird pricing info.',
      'If users ask about partnerships, highlight the benefits and direct to /partnerships.',
      'If asked about the venue, mention Harare International Conference Centre.',
      "If you don't know something, be honest and suggest contacting the team via /contact.",
    ].join('\n'),
    messages,
  })

  return new Response(result.textStream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
