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
