// @ts-nocheck
// lib/paynow.ts
import { Paynow } from 'paynow'

let paynowInstance: any = null

export function getPaynowInstance() {
  if (!paynowInstance) {
    const id = process.env.PAYNOW_INTEGRATION_ID
    const key = process.env.PAYNOW_INTEGRATION_KEY
    const appUrl = process.env.APP_URL || 'http://localhost:3000'

    if (!id || !key) {
      throw new Error('PAYNOW_INTEGRATION_ID and PAYNOW_INTEGRATION_KEY are required')
    }

    //@ts-expect-error - Paynow might not have types
    paynowInstance = new Paynow(id, key)

    // Set result and return URLs
    paynowInstance.resultUrl = `${appUrl}/api/paynow/update`
    paynowInstance.returnUrl = `${appUrl}/payment/success`
  }

  return paynowInstance
}

export const paynow = getPaynowInstance()

// // lib/paynow.ts
// import { Paynow } from 'paynow'

// // lib/paynow.ts
// // Note: You'll need to install the actual Paynow SDK
// // npm install paynow-sdk

// // For now, we'll create a mock implementation until you install the SDK

// interface PaynowPayment {
//   success: boolean
//   redirectUrl?: string
//   pollUrl?: string
//   instructions?: any
//   error?: string
// }

// class MockPaynow {
//   private integrationId: string
//   private integrationKey: string
//   private returnUrl: string
//   private resultUrl: string

//   constructor(integrationId: string, integrationKey: string, returnUrl: string, resultUrl: string) {
//     this.integrationId = integrationId
//     this.integrationKey = integrationKey
//     this.returnUrl = returnUrl
//     this.resultUrl = resultUrl
//   }

//   createPayment(reference: string, email: string) {
//     return {
//       add: (item: string, amount: number, quantity: number) => {},
//       reference,
//       email,
//     }
//   }

//   async send(payment: any): Promise<PaynowPayment> {
//     // Mock successful response
//     return {
//       success: true,
//       redirectUrl: `https://www.paynow.co.zw/interface?reference=${payment.reference}`,
//       pollUrl: `https://www.paynow.co.zw/poll/${payment.reference}`,
//       instructions: {
//         paynow: 'Complete payment on Paynow',
//       },
//     }
//   }
// }

// // Paynow configuration
// const paynowConfig = {
//   integrationId: process.env.PAYNOW_INTEGRATION_ID || 'YOUR_INTEGRATION_ID',
//   integrationKey: process.env.PAYNOW_INTEGRATION_KEY || 'YOUR_INTEGRATION_KEY',
//   returnUrl: process.env.NEXT_PUBLIC_BASE_URL + '/payments/success',
//   resultUrl: process.env.NEXT_PUBLIC_BASE_URL + '/api/payments/update',
// }

// export const paynow = new MockPaynow(
//   paynowConfig.integrationId,
//   paynowConfig.integrationKey,
//   paynowConfig.returnUrl,
//   paynowConfig.resultUrl,
// )
