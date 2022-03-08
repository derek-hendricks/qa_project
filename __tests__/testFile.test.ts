import { until } from "selenium-webdriver";
import { Bestbuy } from "./pageObjects";

const bestbuy = new Bestbuy;

afterAll(async () => {
    await bestbuy.driver.quit();
});
//will input log in test before presentation -md
//if we run a log in too many times we get a password error -md
test("Can get to log in page", async () => {
    await bestbuy.navigate();
    // uncomment when running outside of US
    // await bestbuy.click(bestbuy.americaLink);
    await bestbuy.closeWindow();
    await bestbuy.openMenu();
    await bestbuy.clickSignIn();
})
test("can use menu categories", async () => {
    await bestbuy.navigate();
    await bestbuy.clickMenu();
    await bestbuy.clickAppliances();
    await bestbuy.clickAllAppliances();
    expect(await bestbuy.appliancesResults()).toContain("Refrigerators")
})
test("Can do a search", async () => {
    await bestbuy.navigate();
    await bestbuy.search("macbook");
    await bestbuy.clickSearch();
    expect(await bestbuy.getResults()).toContain("Apple")
})
test("Can add to cart", async () => {
    await bestbuy.clickAddToCart();
    await bestbuy.clickGoToCart();
    expect(await bestbuy.viewCart()).toContain("MacBook")
})

test("Can find search results for an item entered in the search bar ", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    await bestbuy.clickSearch();
    let searchResults = await bestbuy.getElements(bestbuy.skuItem);
    expect(searchResults.length).toBeGreaterThanOrEqual(1);
});

test("Can save an item from the search results", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    await bestbuy.clickSearch();
    await bestbuy.click(bestbuy.saveItemButton);
    await bestbuy.click(bestbuy.savedItems);
    expect(await bestbuy.getText(bestbuy.savedItemsResults)).toContain("Xbox");
});

test("Can compare an item from the search results", async () => {
    await bestbuy.navigate();
    await bestbuy.click(bestbuy.searchBar);
    await bestbuy.search("xbox");
    await bestbuy.clickSearch();
    await bestbuy.click(bestbuy.compareCheckbox);
    expect(await bestbuy.getText(bestbuy.comparison)).toContain("Compare");
});

