//@ts-nocheck
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const payload = await getPayload({
      config: configPromise,
    })

    // Attempt to login user
    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (result.user) {
      // Set session cookie
      const response = NextResponse.json({
        success: true,
        user: result.user,
      })

      // Set token in cookie
      response.cookies.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      return response
    } else {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        error: 'Login failed',
      },
      { status: 500 },
    )
  }
}
