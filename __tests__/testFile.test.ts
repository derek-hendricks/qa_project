import { Bestbuy } from "./pageObjects";

const bestbuy = new Bestbuy;

afterAll(async () => {
  await bestbuy.driver.quit();
});
//caution: if we run log in too many times we get a password error
/*test("Can login and logout of an account", async () => {
  await bestbuy.navigate();
  // when running outside of US
  await bestbuy.goToAmericanSite();
  //await bestbuy.closeWindow();
  await bestbuy.openMenu();
  await bestbuy.clickSignIn();
  await bestbuy.email("qa_group2@yahoo.com")
  await bestbuy.password("PleaseWork!")
  await bestbuy.confirmLogin();
  await bestbuy.openMenu();
  await bestbuy.clickLogout();
})*/
test("can use menu categories", async () => {
  await bestbuy.navigate();
  await bestbuy.clickMenu();
  await bestbuy.clickAppliances();
  await bestbuy.clickAllAppliances();
  expect(await bestbuy.appliancesResults()).toContain("Refrigerators")
})
test("Can do a search", async () => {
  await bestbuy.navigate();
  await bestbuy.search("sims 4");
  await bestbuy.clickSearch();
  expect(await bestbuy.getResults()).toContain("The Sims 4")
})
test("Can add to cart", async () => {
  await bestbuy.clickAddToCart();
  await bestbuy.clickGoToCart();
  expect(await bestbuy.viewCart()).toContain("The Sims 4")
})
test ("can open checkout page", async () => {
  await bestbuy.clickCheckOut();
  await bestbuy.clickContinueAsGuest();
  expect (await bestbuy.checkOutResults()).toContain("The Sims 4")
})

test("Can save an item from the search results", async () => {
  await bestbuy.navigate();
  await bestbuy.search("Xbox");
  await bestbuy.clickSearch();
  await bestbuy.clickSaveItem();
  await bestbuy.viewSavedItems();
  expect(await bestbuy.getText(bestbuy.savedItemsResults)).toContain("Xbox");
});

test("Can compare two items from the search results", async () => {
  const xboxSearch: string = "Xbox";
  await bestbuy.navigate();
  await bestbuy.search(xboxSearch);
  await bestbuy.clickSearch();
  await bestbuy.clickCompareCheckbox(bestbuy.compareCheckboxOne);
  expect(await bestbuy.getText(bestbuy.comparison)).toContain("Compare (1)");
  await bestbuy.clickCompareCheckbox(bestbuy.compareCheckboxTwo);
  expect(await bestbuy.getText(bestbuy.comparison)).toContain("Compare (2)");
  await bestbuy.viewComparedResults();
  let compareResults = await bestbuy.getText(bestbuy.compareResults);
  expect(compareResults).toContain(xboxSearch);
  expect(compareResults).toContain("All Specs");
});

