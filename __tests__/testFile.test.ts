import { Bestbuy } from "./pageObjects";

const bestbuy = new Bestbuy;

afterAll(async () => {
    await bestbuy.driver.quit();
});    
//will input log in test before presentation -md
//if we run a log in too many times we get a password error -md
test ("Can get to log in page", async () => {
    await bestbuy.navigate();
    await bestbuy.closeWindow();
    await bestbuy.openMenu();
    await bestbuy.clickSignIn();
})
test ("can use menu categories", async () => {
    await bestbuy.navigate();
    await bestbuy.clickMenu();
    await bestbuy.clickAppliances();
    await bestbuy.clickAllAppliances();
    expect (await bestbuy.appliancesResults()).toContain("Refrigerators")
})
test ("Can do a search", async () => {
    await bestbuy.navigate();
    await bestbuy.search("macbook");
    await bestbuy.clickSearch();
    expect (await bestbuy.getResults()).toContain("Apple")
})
test ("Can add to cart", async () => {
    await bestbuy.clickAddToCart();
    await bestbuy.clickGoToCart();
    expect (await bestbuy.viewCart()).toContain("MacBook")
})