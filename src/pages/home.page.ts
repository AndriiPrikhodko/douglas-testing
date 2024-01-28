// import { IHomePage } from '@myTypes/book'
import type { Page } from '@playwright/test'

export default class HomePage implements IPage {
    protected readonly page: Page
    public url: string = 'https://www.douglas.de/de'
    public selectors = {
        header_parfum: 'a.link--nav-heading[href="/de/c/parfum/01"]',
        title: 'div.header-component__container'
    }

    /**
     *
     * @param page
     */
    constructor(page: Page) {
        this.page = page
    }

    /**
     *
     * @param option string representing name of the section
     */
    async headerOpenSection(option: 'parfum') {
        await this.page.click(this.selectors[`header_${option}`])
        const title = this.page.locator(this.selectors.title)
        await title.hover()
    }

    /**
     * loading home page
     */
    async open() {
        await this.page.goto(this.url)
        await this.page.waitForLoadState('domcontentloaded')
    }
}