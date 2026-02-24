// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

interface RegistrationData {
  type: 'attendee' | 'sponsor' | 'exhibitor'
  email: string
  status: string
  amount: number
  paymentMethod: string
  attendeeDetails?: any
  sponsorDetails?: any
  exhibitorDetails?: any
}

export async function createRegistration(data: RegistrationData): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to create registration: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// helper for speaker applications
export interface SpeakerApplicationData {
  name: string
  email: string
  organization: string
  designation: string
  bio: string
  category: string
  expertise?: Array<{ topic: string }>
  linkedin?: string
  twitter?: string
  website?: string
  session?: {
    title?: string
    description?: string
  }
}

export async function createSpeakerApplication(data: SpeakerApplicationData): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/speaker-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to create speaker application: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export async function createPayment(data: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to create payment: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export async function updateRegistrationStatus(id: string, status: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/registrations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to update registration status: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export async function getRegistration(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/registrations/${id}`)

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to fetch registration: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
