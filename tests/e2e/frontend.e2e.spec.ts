import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Payload Blank Template/)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText('Welcome to your new project.')
  })

  test('speaker apply page shows application form', async ({ page }) => {
    await page.goto('http://localhost:3000/speakers/apply')

    // ensure form fields are present
    await expect(page.locator('h1')).toHaveText('Apply to Speak')
    await expect(page.locator('input#name')).toBeVisible()
    await expect(page.locator('input#email')).toBeVisible()
    await expect(page.locator('select#category')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toHaveText(/Submit Application/i)
  })

  test('faq page displays all categories and questions', async ({ page }) => {
    await page.goto('http://localhost:3000/faq')

    await expect(page.locator('h1')).toHaveText('Frequently Asked Questions')
    await expect(page.locator('h2', { hasText: 'General Questions' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'Exhibitors' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'Partners' })).toBeVisible()
    await expect(page.locator('h2', { hasText: 'Sponsors' })).toBeVisible()

    // expand first general question to verify answer is present
    const firstToggle = page.locator('button', {
      hasText: 'When will tickets be available for purchase?',
    })
    await firstToggle.click()
    await expect(
      page.locator('p', { hasText: 'Early bird tickets will be available' }),
    ).toBeVisible()
  })

  test('brochure page presents download link', async ({ page }) => {
    await page.goto('http://localhost:3000/brochure')
    await expect(page.locator('h1')).toHaveText('Event Brochure')
    await expect(page.locator('a[href="/brochure.pdf"])').toBeVisible()
    await expect(page.locator('a[href="/brochure.pdf"])').toContainText('Download Brochure')
  })
})
