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
import { test, expect } from '@playwright/test';
import { email, password } from './user';

test('Successful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', email);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page).toHaveURL('https://netology.ru/profile');
  const pageTitleLocator = page.locator('//*[text()="Моё обучение"]');
  await expect(pageTitleLocator).toHaveText('Моё обучение');
});

test('Unsuccessful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', 'Invalidn.@gmail.com');
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', '88!!88');
  await page.click('[data-testid="login-submit-btn"]');

  const pageTitleLocator = page.locator('//*[text()="Вы ввели неправильно логин или пароль"]');
  await expect(pageTitleLocator).toHaveText('Вы ввели неправильно логин или пароль');
});