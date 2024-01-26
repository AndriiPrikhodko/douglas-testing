// import { IHomePage } from '@myTypes/book'
import type { Page } from '@playwright/test'

export default class Coockeis {
    protected readonly page: Page
    public selectors = {
        modal: '[aria-modal="true"]',
        accept: '.uc-list-button__accept-all'
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
    async accept() {
        return this.page.click(this.selectors.accept)
    }
}