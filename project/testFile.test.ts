import { Bestbuy } from "./pageObjects";

const bestbuy = new Bestbuy;

afterAll(async () => {
    await bestbuy.driver.quit();
});    

test ("Can get to log in page", async () => {
    await bestbuy.navigate();
    await bestbuy.closeWindow();
    await bestbuy.openMenu();
    await bestbuy.clickSignIn();
})