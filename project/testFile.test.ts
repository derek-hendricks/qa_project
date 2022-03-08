import { until, WebElement } from "selenium-webdriver";
import { Bestbuy } from "./pageObjects";

const bestbuy = new Bestbuy;

afterAll(async () => {
    await bestbuy.driver.quit();
});

test("Can get to log in page", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.americaLink);
    await bestbuy.closeWindow();
    await bestbuy.openMenu();
    await bestbuy.clickSignIn();
});

test("Can find search results for an item entered in the search bar ", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    let searchResults = await bestbuy.getElements(bestbuy.skuItem);
    expect(searchResults.length).toBeGreaterThanOrEqual(1);
});

test("Can save an item from the search results", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    await bestbuy.click(bestbuy.saveItemButton);
    await bestbuy.driver.wait(until.elementsLocated(bestbuy.saveItemButton));
    let dataTrackAttributeText = await bestbuy.getAttribute(bestbuy.saveItemButton, 'data-track');
    expect(dataTrackAttributeText).toBe("Save for Later: Saved");
});

test("Can compare an item from the search results", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    await bestbuy.click(bestbuy.compareCheckbox);
    let compareItems = await bestbuy.driver.findElements(bestbuy.comparison);
    expect(compareItems.length).toBe(1);
});

