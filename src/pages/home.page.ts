// import { IHomePage } from '@myTypes/book'
import type { Page } from '@playwright/test'

export default class HomePage {
    protected readonly page: Page
    public url: string = 'https://www.douglas.de/de'
    public selectors = {
        header: {
            parfum: 'a.link--nav-heading[href="/de/c/parfum/01"]'
        }
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
        this.page.click(this.selectors.header[option])
    }

    async open() {
        await this.page.goto(this.url)
        await this.page.waitForLoadState('domcontentloaded')
    }
}