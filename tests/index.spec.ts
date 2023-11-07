import { test, expect } from '@playwright/test'

test('index page can load', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.locator('main span.text-prog-primary-500').first()
  ).toContainText('ฝึกฝนทักษะการเขียนโปรแกรม')
})

test('Can navigate to about page', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Global' })
    .getByRole('link', { name: 'About' })
    .click()

  await expect(page).toHaveURL('/about')
  await expect(page.locator('h1').first()).toContainText('เกี่ยวกับเรา')
})

test('Can load archive page', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Global' })
    .getByRole('link', { name: 'Archive' })
    .click()

  await expect(page).toHaveURL('/archive')
  await expect(
    page.locator('h1', { hasText: "Crack 'n' Code" })
  ).toBeInViewport()
})
