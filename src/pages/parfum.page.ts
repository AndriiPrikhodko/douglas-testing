import type { Page } from '@playwright/test'

export default class ParfumPage {
    protected readonly page: Page
    public url: string = 'https://www.douglas.de/de/c/parfum/01'
    public selectors = {
        filter: '.facet__title',
        filterOption: '.facet-option__checkbox--rating-stars',
        selectedFilters: '.selected-facets__value',
        close: '.facet__close-button'
    }

    /**
     *
     * @param page
     */
    constructor(page: Page) {
        this.page = page
    }

    async applyFilter (name, value) {
        const locatorByName = this.page
            .locator(this.selectors.filter, {hasText: name})
        await locatorByName.click()
        const option = this.page.locator(this.selectors.filterOption, {hasText: value})
        await option.click()
        await this.page.click(this.selectors.close)
    }

    async applyHighlights(options) {
        const highlights = this.page
            .locator(this.selectors.filter, {hasText: 'Highlights'})
        await highlights.click()
        await Object.entries(options).reduce(async (acc, [key, value]) => {
            if(value) await acc.then(() =>
                this.page.locator(this.selectors.filterOption, {hasText: key}).click())
            return acc
        }, Promise.resolve())
        await this.page.click(this.selectors.close)
    }

    async applyFilters(filters) {
        return Object.keys(filters).reduce(async (acc, key) =>{
            if(key !== 'Highlights') {
                await acc.then(() => this.applyFilter(key, filters[key]))
            }
            else {
                await acc.then(() => this.applyHighlights(filters[key]))
            }
            return acc
        }, Promise.resolve())
    }

    async getFilters(expectedCount) {
        await this.page.waitForFunction(({selector, count}) => {
            return document.querySelectorAll(selector).length === count
        }, {selector: this.selectors.selectedFilters, count: expectedCount})
        await this.page.waitForSelector(this.selectors.selectedFilters)
        const elements = await this.page.$$(this.selectors.selectedFilters)
        const activeFilters = await
        Promise.all(elements.map(async element => {
            return element.textContent()
        }))
        return activeFilters
    }
}