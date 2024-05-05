import { test, expect } from '@playwright/test'

test('Can render solution', async ({ page }) => {
  await page.goto('/tasks/0000')

  const solutionLocator = page.getByText('Solution')
  await page.getByRole('button').filter({ has: solutionLocator }).click()
  await expect(page).toHaveURL('/tasks/0000/solution')

  await expect(page.locator('article')).toContainText('C++')
})
