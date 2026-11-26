import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const browser = await chromium.launch({channel: "msedge", headless: true});
try {
  for (const [name, width, height] of [["desktop",1440,1000], ["tablet",768,1024], ["mobile-390",390,844]]) {
    const page = await browser.newPage({viewport: {width,height}, reducedMotion: "reduce", locale: "en-US"});
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", res => { if (res.status() >= 400) errors.push(res.status() + " " + res.url()); });
    await page.goto("http://localhost:3000", {waitUntil:"networkidle"});
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].filter(img => img.getClientRects().length).map(async img => {
        img.loading = "eager";
        await img.decode();
      }));
    });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, "Horizontal overflow");
    assert.equal(await page.getByRole("heading", {level:1}).count(), 1);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to content");
    await page.locator(":focus").blur();
    if (name !== "tablet") {
      await page.screenshot({path:"screenshots/" + name + ".png", fullPage:true, animations:"disabled"});
      await page.screenshot({path:"screenshots/" + name + "-hero.png", animations:"disabled"});
    }
    if (width === 390) {
      await page.getByRole("button",{name:"Menu",exact:true}).click();
      await page.getByRole("navigation").getByRole("link",{name:"Our Work"}).click();
      assert.equal(await page.getByRole("button",{name:"Menu",exact:true}).getAttribute("aria-expanded"), "false");
    }
    const photo = page.getByRole("button",{name:/Enlarge photo/}).first();
    await photo.click();
    await page.getByRole("dialog").waitFor({state:"visible"});
    const photos = await page.getByRole("button",{name:/Enlarge photo/}).count();
    if (photos > 1) {
      await page.keyboard.press("ArrowRight");
      assert.equal(await page.getByRole("dialog").locator("[aria-live=polite]").textContent(), "2 / " + photos);
    }
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(),0);
    assert.equal(await photo.evaluate(el => document.activeElement === el),true);
    await page.getByLabel("Name",{exact:true}).fill("Demo User");
    await page.getByLabel("Email",{exact:true}).fill("demo@example.com");
    await page.getByLabel("Type of space").selectOption("Spa/Clinic/Studio");
    await page.getByLabel("Project details").fill("Commercial spa fit-out.");
    await page.getByRole("button",{name:/Submit Project Details/}).click();
    assert.match(await page.getByRole("status").textContent(), /confirmed in this demo/);
    assert.deepEqual(errors, []);
    console.log(name + " passed");
    await page.close();
  }
} finally { await browser.close(); }


