import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  await page.goto('/')
})

test.describe('when navigating the top nav bar', () => {
  test('navigates to /posts', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('posts-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('posts-nav-item').click()
    }

    await expect(page).toHaveURL('/posts')
    await expect(page).toHaveTitle('Articles - James Walsh')
    await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible()
  })

  test('navigates to /about', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('about-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('about-nav-item').click()
    }

    await expect(page).toHaveURL('/about')
    await expect(page).toHaveTitle('About - James Walsh')
    await expect(page.getByText(`I'm James`)).toBeVisible()
  })

  test('navigates to /tech', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('tech-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('tech-nav-item').click()
    }

    await expect(page).toHaveURL('/tech')
    await expect(page).toHaveTitle('Tech - James Walsh')
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
  })
})

test.describe('when navigating the footer', () => {
  test('navigates to /posts', async ({ page }) => {
    await page.getByTestId('posts-footer-nav-item').click()

    await expect(page).toHaveURL('/posts')
    await expect(page).toHaveTitle('Articles - James Walsh')
    await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible()
  })

  test('navigates to /about', async ({ page }) => {
    await page.getByTestId('about-footer-nav-item').click()

    await expect(page).toHaveURL('/about')
    await expect(page).toHaveTitle('About - James Walsh')
    await expect(page.getByText(`I'm James`)).toBeVisible()
  })

  test('navigates to /tech', async ({ page }) => {
    await page.getByTestId('tech-footer-nav-item').click()

    await expect(page).toHaveURL('/tech')
    await expect(page).toHaveTitle('Tech - James Walsh')
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
  })
})
