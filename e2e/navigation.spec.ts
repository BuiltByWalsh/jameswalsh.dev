import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  await page.goto('/')
})

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

test('navigates to /portfolio', async ({ page, isMobile }) => {
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

test('Makes /rss.xml available on desktop', async ({ page, isMobile }) => {
  if (isMobile) return

  await page.locator('data-testid=rss-feed-nav-item').click()
})
