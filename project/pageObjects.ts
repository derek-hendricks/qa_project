import {By, WebElement} from "selenium-webdriver"
import {BasePage} from "./basePage"

export class Bestbuy extends BasePage {
    searchBar: By = By.className("search-input");
    results: By = By.xpath('//div[@class="app-container lv"]');
    userMenu: By = By.xpath('//button[@class="c-button-unstyled plButton account-button d-flex justify-content-center align-items-center"]');
    signIn: By = By.xpath('//a[@class="c-button c-button-secondary c-button-sm sign-in-btn"]');
    createAccount: By = By.xpath('//a[@class="c-button c-button-outline c-button-sm create-account-btn"]');
    emailSignIn: By = By.xpath('//input[@type="email"]');
    passwordSignIn: By = By.xpath('//input[@type="password"]');
    loginButton: By = By.xpath('//button[@type="submit"]');
    closePopup: By = By.xpath('//button[@class="c-close-icon c-modal-close-icon"]');
    
    constructor() {
        super({url: "https://www.bestbuy.com/"});
    }
    async search(searchTerm: string) {
        return this.setInput(this.searchBar, `${searchTerm}\n`)
    }
    async getResults () {
        return this.getText(this.results)
    }
    async openMenu () {
        return this.click(this.userMenu)
    }
    async clickSignIn () {
        return this.click(this.signIn)
    }
    async closeWindow () {
        return this.click(this.closePopup)
    }
}