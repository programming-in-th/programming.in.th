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

test('Can load tasks page', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Global' })
    .getByRole('link', { name: 'Tasks' })
    .click()

  await expect(page).toHaveURL('/tasks')
  const aplusb = page.getByText('A+B Problem').locator('visible=true')
  await expect(aplusb).toBeVisible()

  await aplusb.click()
  await expect(page).toHaveURL('/tasks/0000')

  // expect iframe with pdf content
  const pdfEmbed = page.locator('embed')
  await expect(pdfEmbed).toBeVisible()
})

test('Can load archive page', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Global' })
    .getByRole('link', { name: 'Archive' })
    .click()

  await expect(page).toHaveURL('/archive')
  const cnc = page.locator('h1', { hasText: "Crack 'n' Code" })
  await expect(cnc).toBeInViewport()

  await cnc.click()
  await expect(page).toHaveURL('/archive/cnc')

  await expect(page.getByText('Pre TOI18')).toBeVisible()
})
