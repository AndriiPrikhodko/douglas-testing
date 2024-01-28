import { test, expect } from '@playwright/test'
import {default as testData}
    from '@test-data/data.json'
import HomePage from '../pages/home.page'
import ParfumPage from '../pages/parfum.page'
import Coockeis from '../pages/components/coockies'
import extractActiveFilters from '../utilities/activeFilters'

(testData as IData[]).map(data => test(`${data.name}`, async ({page}) => {
    const homePage = new HomePage(page)
    const parfumPage = new ParfumPage(page)
    const coockeis = new Coockeis(page)
    const expectedFilters = extractActiveFilters(data.filter)
    const expectedCount = expectedFilters.length

    await homePage.open()
    await coockeis.accept()
    await homePage.headerOpenSection('parfum')
    await page.waitForURL(parfumPage.url)
    await parfumPage.applyFilters(data.filter)
    const activeFilters = await parfumPage.getFilters(expectedCount)
    expect(expectedFilters)
        .toEqual(expect.arrayContaining(activeFilters))
}))