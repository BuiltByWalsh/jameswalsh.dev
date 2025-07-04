import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`)
  await page.goto('/')
})

test.describe('when getting the RSS feed', () => {
  test.beforeEach(({ browserName }) => {
    /*
    ? NOTE: Firefox unfortunately required explicit use of the `view-source` prefix to open RSS feeds. But this breaks the links in other browsers.
    ? I don't believe we should be optimizing this code for a dual edge case (Not many users use RSS, even fewer use firefox).
    */

    test.skip(
      browserName === 'firefox',
      'RSS feeds cannot be opened on firefox without setting modifications or view-source prefix',
    )
  })

  test('Makes RSS feed available', async ({ page, context, isMobile }) => {
    if (isMobile) {
      const newPagePromise = context.waitForEvent('page')
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.locator('data-testid=rss-feed-text-nav-item').click()

      const newPage = await newPagePromise
      await expect(newPage).toHaveURL('/rss.xml')
    } else {
      await page.locator('data-testid=rss-feed-nav-item').click()
      await expect(page).toHaveURL('/rss.xml')
    }
  })
})

test.describe('when toggling the theme', () => {
  test.use({ colorScheme: 'light' })

  test('toggles the system theme to dark mode', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('data-testid=mobile-menu-trigger').click()
      await page.getByText('Toggle Dark Mode').click()
    } else {
      await page.locator('data-testid=mode-toggle-nav-item').click()
    }
  })
})

test.describe('when toggling color scheme on desktop', () => {
  test('provides a menu item to toggle the system theme', async ({ page, isMobile }) => {
    if (isMobile) return

    await page.locator('data-testid=mode-toggle-nav-item').click()
  })
})
