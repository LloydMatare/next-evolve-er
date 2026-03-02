// src/types/paynow.d.ts
declare module 'paynow' {
  export class Paynow {
    constructor(integrationId: string, integrationKey: string, returnUrl: string, resultUrl: string)
    resultUrl: string
    returnUrl: string
    createPayment(reference: string, email: string): PaynowPayment
    send(payment: PaynowPayment): Promise<PaynowResponse>
  }

  export interface PaynowPayment {
    add(itemName: string, amount: number, quantity: number): void
    reference: string
    email: string
  }

  export interface PaynowResponse {
    success: boolean
    redirectUrl?: string
    pollUrl?: string
    instructions?: any
    error?: string
  }
}
