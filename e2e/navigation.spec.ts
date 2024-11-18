import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  await page.goto('/')
})

test.describe('when navigating the top nav bar', () => {
  test('navigates to /posts', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('blog-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('blog-nav-item').click()
    }

    await expect(page).toHaveURL('/posts')
    await expect(page).toHaveTitle('Articles - James Walsh')
    await expect(page.getByText('Latest Blog Posts')).toBeVisible()
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

  test('navigates to /stack', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('stack-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('stack-nav-item').click()
    }

    await expect(page).toHaveURL('/stack')
    await expect(page).toHaveTitle('Stack - James Walsh')
    await expect(page.getByText(`Technology Tools I Recommend & Use`)).toBeVisible()
  })

  test('navigates to /projects', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByRole('list').getByTestId('portfolio-nav-item').click()
    } else {
      await page.locator('nav').getByTestId('portfolio-nav-item').click()
    }

    await expect(page).toHaveURL('/projects')
    await expect(page).toHaveTitle('Projects - James Walsh')
    await expect(page.getByText(`Things I've Helped Build That`)).toBeVisible()
  })

  test('Makes RSS feed available', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=rss-feed-text-nav-item').click()
    } else {
      await page.locator('data-testid=rss-feed-nav-item').click()
    }
  })

  test('toggles the system theme to light mode', async ({ page, isMobile }) => {
    await page.locator('data-testid=mode-toggle-menu').click()
    await page.getByRole('menuitem', { name: 'Light' }).click()
  })

  test('toggles the system theme to dark mode', async ({ page, isMobile }) => {
    if (isMobile) return

    await page.locator('data-testid=mode-toggle-menu').click()
    await page.getByRole('menuitem', { name: 'Dark' }).click()
  })

  test('toggles the system theme to system mode', async ({ page, isMobile }) => {
    // TODO: up next.
    if (isMobile) return

    await page.locator('data-testid=mode-toggle-menu').click()
    await page.getByRole('menuitem', { name: 'System' }).click()
  })
})

test.describe('when navigating the footer', () => {
  test('navigates to /posts', async ({ page }) => {
    await page.getByTestId('blog-footer-nav-item').click()

    await expect(page).toHaveURL('/posts')
    await expect(page).toHaveTitle('Articles - James Walsh')
    await expect(page.getByText('Latest Blog Posts')).toBeVisible()
  })

  test('navigates to /about', async ({ page }) => {
    await page.getByTestId('about-footer-nav-item').click()

    await expect(page).toHaveURL('/about')
    await expect(page).toHaveTitle('About - James Walsh')
    await expect(page.getByText(`I'm James`)).toBeVisible()
  })

  test('navigates to /stack', async ({ page }) => {
    await page.getByTestId('stack-footer-nav-item').click()

    await expect(page).toHaveURL('/stack')
    await expect(page).toHaveTitle('Stack - James Walsh')
    await expect(page.getByText(`Technology Tools I Recommend & Use`)).toBeVisible()
  })

  test('navigates to /projects', async ({ page }) => {
    await page.getByTestId('portfolio-footer-nav-item').click()

    await expect(page).toHaveURL('/projects')
    await expect(page).toHaveTitle('Projects - James Walsh')
    await expect(page.getByText(`Things I've Helped Build That`)).toBeVisible()
  })
})
