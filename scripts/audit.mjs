import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--remote-debugging-port=9222"],
});
try {
  const result = await lighthouse(process.env.DEMO_URL || "http://localhost:3000", {
    port: 9222,
    onlyCategories: ["performance", "accessibility", "seo"],
    output: "html",
    logLevel: "error",
  });
  if (!result) throw new Error("Lighthouse returned no report");
  await writeFile("screenshots/lighthouse-mobile.html", result.report);
  for (const [name, category] of Object.entries(result.lhr.categories)) {
    console.log(name, Math.round(category.score * 100));
  }
  for (const [name, audit] of Object.entries(result.lhr.audits)) {
    if (audit.score !== null && audit.score < 0.9) console.log(name, audit.score, audit.displayValue ?? "");
  }
} finally {
  await browser.close();
}
