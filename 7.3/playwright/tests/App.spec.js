// const { test, expect } = require("@playwright/test");

// test("test", async ({ page }) => {
//   // Go to https://netology.ru/free/management#/
//   await page.goto("https://netology.ru/free/management#/");

//   // Click a
//   await page.click("a");
//   await expect(page).toHaveURL("https://netology.ru/");

//   // Click text=Учиться бесплатно
//   await page.click("text=Учиться бесплатно");
//   await expect(page).toHaveURL("https://netology.ru/free");

//   page.click("text=Бизнес и управление");

//   // Click text=Как перенести своё дело в онлайн
//   await page.click("text=Как перенести своё дело в онлайн");
//   await expect(page).toHaveURL(
//     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
//   );
// });
import { chromium } from 'playwright'
import { test, expect } from '@playwright/test'
import { email, password } from './user'
test('Successful authorization', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://netology.ru/?modal=sign_in')
  await page.getByPlaceholder('Email').click()
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Пароль').click()
  await page.getByPlaceholder('Пароль').fill(password)
  await page.getByTestId('login-submit-btn').click()

  await expect(page).toHaveURL('https://netology.ru/profile');
  const pageTitleLocator = page.locator('//*[text()="Моё обучение"]');
  await expect(pageTitleLocator).toHaveText('Моё обучение');
  await context.close()
  await browser.close()
})
test('Unsuccessful authorization', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://netology.ru/?modal=sign_in')
  await page.getByPlaceholder('Email').click()
  await page.getByPlaceholder('Email').fill("Invalidn.@gmail.com")
  await page.getByPlaceholder('Пароль').click()
  await page.getByPlaceholder('Пароль').fill("88!!88")
  await page.getByTestId('login-submit-btn').click()

  const pageTitleLocator = page.locator('//*[text()="Вы ввели неправильно логин или пароль"]');
  await expect(pageTitleLocator).toHaveText('Вы ввели неправильно логин или пароль');
  await context.close()
  await browser.close()
})