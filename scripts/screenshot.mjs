import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

mkdirSync('/opt/cursor/artifacts', { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })

await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' })
await page.waitForTimeout(9000)
await page.evaluate(() => window.scrollTo(0, 700))
await page.waitForTimeout(500)
await page.screenshot({ path: '/opt/cursor/artifacts/portfolio-home-light.png', fullPage: false })

await page.locator('nav button').first().click()
await page.waitForTimeout(1500)
await page.screenshot({ path: '/opt/cursor/artifacts/portfolio-home-dark.png', fullPage: false })

await browser.close()
console.log('screenshots saved')
