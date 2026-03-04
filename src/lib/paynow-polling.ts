// lib/paynow-polling.ts
export async function pollPaynowStatus(pollUrl: string) {
  try {
    const response = await fetch('/api/paynow/poll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pollUrl }),
    })

    return await response.json()
  } catch (error) {
    console.error('Polling error:', error)
    return { success: false, error: 'Polling failed' }
  }
}
