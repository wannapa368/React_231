# คำอธิบายการทำงานของโค้ด Playwright สำหรับทดสอบ SauceDemo

โค้ดนี้เป็นสคริปต์ทดสอบอัตโนมัติที่เขียนด้วย JavaScript โดยใช้ **Playwright** เพื่อทดสอบฟังก์ชันการทำงานของเว็บไซต์ **SauceDemo** ซึ่งเป็นเว็บจำลองสำหรับ e-commerce การทดสอบครอบคลุมการล็อกอิน, การเรียงลำดับสินค้า, และกระบวนการชำระเงิน ต่อไปนี้เป็นคำอธิบายการทำงานของโค้ดแต่ละส่วน

## 1. การนำเข้า Playwright
```javascript
const { test, expect } = require('@playwright/test');
```
- **ทำอะไร**: นำเข้าโมดูล `test` และ `expect` จาก `@playwright/test` ซึ่งเป็นเครื่องมือสำหรับรันและตรวจสอบการทดสอบ
- **จุดประสงค์**:
  - `test`: ใช้กำหนดโครงสร้างการทดสอบ เช่น การจัดกลุ่มทดสอบ (`test.describe`), การตั้งค่าก่อน/หลังทดสอบ (`test.beforeEach`, `test.afterEach`), และการเขียนเคสทดสอบ (`test`)
  - `expect`: ใช้สำหรับการยืนยันผลลัพธ์ เช่น ตรวจสอบว่า element แสดงอยู่ (`toBeVisible`) หรือ URL ถูกต้อง (`toHaveURL`)
- **การทำงาน**: โมดูลนี้ช่วยให้สามารถควบคุมเบราว์เซอร์ (เช่น Chromium) และตรวจสอบผลลัพธ์ เช่น `expect(page).toHaveURL(/inventory.html/)` ตรวจสอบว่า URL มี `/inventory.html/`

## 2. ฟังก์ชันล็อกอิน
```javascript
async function login(page, username, password) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory.html/); // ยืนยันว่ามาถึงหน้า inventory
}
```
- **ทำอะไร**: ฟังก์ชัน `login` ซึ่งเป็น asynchronous ทำการล็อกอินเข้าเว็บ SauceDemo ด้วย `username` และ `password` ที่ระบุ
- **จุดประสงค์**: สร้างฟังก์ชันที่นำกลับมาใช้ได้เพื่อล็อกอินและยืนยันว่าไปถึงหน้า inventory หลังล็อกอินสำเร็จ
- **การทำงาน**:
  - `page.goto('https://www.saucedemo.com/')`: เปิดหน้าเว็บล็อกอินของ SauceDemo
  - `page.locator('#user-name').fill(username)`: ค้นหาช่องใส่ชื่อผู้ใช้ (ด้วย ID `#user-name`) และกรอกค่า `username`
  - `page.locator('#password').fill(password)`: ค้นหาช่องรหัสผ่าน (ด้วย ID `#password`) และกรอกค่า `password`
  - `page.locator('#login-button').click()`: คลิกปุ่มล็อกอิน (ด้วย ID `#login-button`)
  - `await expect(page).toHaveURL(/inventory.html/)`: ตรวจสอบว่า URL มี `/inventory.html/` เพื่อยืนยันว่าล็อกอินสำเร็จและไปถึงหน้า inventory

## 3. การตั้งค่าทั่วไป
```javascript
test.describe('SauceDemo E-commerce Tests', () => {
  const user = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' }
  };
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });
  // test.afterEach(async ({ page }) => {
  //   await page.close();
  // });
```
- **ทำอะไร**:
  - `test.describe`: จัดกลุ่มการทดสอบทั้งหมดภายใต้ชื่อ "SauceDemo E-commerce Tests" เพื่อความเป็นระเบียบ
  - `const user`: กำหนดข้อมูลผู้ใช้สองประเภท (`standard` และ `lockedOut`) เพื่อใช้ในเคสทดสอบ
  - `test.beforeEach`: รันโค้ดก่อนแต่ละเคสทดสอบเพื่อตั้งค่าสภาพแวดล้อมเริ่มต้น
  - `test.afterEach` (ถูกคอมเมนต์ไว้): ถ้าเปิดใช้งาน จะปิดหน้าเว็บหลังแต่ละเคสทดสอบเพื่อทำความสะอาด
- **จุดประสงค์**:
  - `user`: เก็บข้อมูลชื่อผู้ใช้และรหัสผ่านในรูปแบบอ็อบเจ็กต์เพื่อให้เรียกใช้ได้ง่ายและลดข้อผิดพลาด
  - `beforeEach`: รับรองว่าแต่ละเคสเริ่มต้นที่หน้าแรกของ SauceDemo
  - `afterEach`: (ถ้าใช้) ป้องกันการรบกวนระหว่างเคสทดสอบ
- **การทำงาน**:
  - อ็อบเจ็กต์ `user` มีสองชุดข้อมูล:
    - `standard`: ผู้ใช้ปกติ (`standard_user`, `secret_sauce`)
    - `lockedOut`: ผู้ใช้ที่ถูกล็อก (`locked_out_user`, `secret_sauce`)
  - `beforeEach` ใช้ `page.goto` เพื่อเปิดหน้าแรกก่อนเริ่มทุกเคสทดสอบ

## 4. ชุดทดสอบ: Login Functionality
```javascript
test.describe('Login Functionality', () => {
  test('should login successfully with standard user', async ({ page }) => {
    await page.locator('#user-name').fill(user.standard.username);
    await page.locator('#password').fill(user.standard.password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
  test('should show error for locked out user', async ({ page }) => {
    await page.locator('#user-name').fill(user.lockedOut.username);
    await page.locator('#password').fill(user.lockedOut.password);
    await page.locator('#login-button').click();
    const errorMessage = await page.locator('.error-message-container').textContent();
    await expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
```
- **ทำอะไร**: ทดสอบการล็อกอินในสองกรณี:
  1. ล็อกอินด้วยผู้ใช้ปกติ (`standard_user`) ควรสำเร็จและไปที่หน้า inventory
  2. ล็อกอินด้วยผู้ใช้ที่ถูกล็อก (`locked_out_user`) ควรแสดงข้อความข้อผิดพลาด
- **จุดประสงค์**: ตรวจสอบว่าระบบล็อกอินทำงานถูกต้องทั้งในกรณีที่สำเร็จและล้มเหลว
- **การทำงาน**:
  - **เคสแรก (ล็อกอินสำเร็จ)**:
    - กรอกชื่อผู้ใช้และรหัสผ่านของ `standard_user` จากอ็อบเจ็กต์ `user`
    - คลิกปุ่มล็อกอิน
    - ตรวจสอบว่า URL มี `/inventory.html/` (ยืนยันว่าอยู่ในหน้า inventory)
    - ตรวจสอบว่า element `.inventory_list` (รายการสินค้าในหน้า inventory) แสดงอยู่
  - **เคสที่สอง (ผู้ใช้ถูกล็อก)**:
    - กรอกชื่อผู้ใช้และรหัสผ่านของ `locked_out_user`
    - คลิกปุ่มล็อกอิน
    - ดึงข้อความจาก element `.error-message-container`
    - ตรวจสอบว่าข้อความมีคำว่า "Epic sadface: Sorry, this user has been locked out."

## 5. ชุดทดสอบ: Inventory Page
```javascript
test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await page.waitForSelector('.inventory_list', { state: 'visible', timeout: 10000 });
  });
  test('should sort items by price low to high', async ({ page }) => {
    const sortDropdown = (await page.locator('[data-test="product_sort_container"]').count())
      ? page.locator('[data-test="product_sort_container"]')
      : page.locator('select[class*="product_sort_container"], select');
    await page.waitForSelector('[data-test="product_sort_container"], select[class*="product_sort_container"], select', { state: 'visible', timeout: 15000 });
    await sortDropdown.selectOption('lohi');
    await page.waitForTimeout(1000);
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices
      .map((p) => parseFloat(p.replace('$', '')))
      .filter((p) => !isNaN(p));
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);
  });
});
```
- **ทำอะไร**: ทดสอบฟังก์ชันการเรียงลำดับสินค้าในหน้า inventory ตามราคาจจากน้อยไปมาก
- **จุดประสงค์**: ตรวจสอบว่า dropdown การเรียงลำดับทำงานถูกต้องและสินค้าแสดงตามลำดับราคาที่เลือก
- **การทำงาน**:
  - **`beforeEach`**:
    - เรียกฟังก์ชัน `login` เพื่อล็อกอินด้วย `standard_user` และ `secret_sauce`
    - รอให้หน้าเว็บโหลดสมบูรณ์ด้วย `waitForLoadState('networkidle')` (รอจนไม่มี network request ใหม่ ภายใน 10 วินาที)
    - รอให้ element `.inventory_list` (รายการสินค้า) แสดงบนหน้า (ภายใน 10 วินาที) เพื่อยืนยันว่าเป็นหน้า inventory
  - **เคสทดสอบ (เรียงลำดับราคา)**:
    - กำหนดตัวแปร `sortDropdown` โดย:
      - ตรวจสอบว่า element `[data-test="product_sort_container"]` มีอยู่หรือไม่ (ใช้ `count()`)
      - ถ้าไม่มี ใช้ selector สำรอง: `select[class*="product_sort_container"], select` (เลือก `<select>` ที่มีคลาสเกี่ยวข้องหรือ `<select>` ใดๆ)
    - รอให้ dropdown แสดงด้วย `waitForSelector` โดยใช้ selector รวม (ทั้ง `data-test` และสำรอง) ภายใน 15 วินาที
    - เลือกตัวเลือก `lohi` (เรียงจากน้อยไปมาก) ใน dropdown
    - รอ 1 วินาทีด้วย `waitForTimeout` เพื่อให้หน้าเว็บอัปเดตการเรียงลำดับ
    - ดึงราคาทั้งหมดจาก element `.inventory_item_price` (เช่น "$7.99", "$15.99") ด้วย `allTextContents`
    - แปลงราคาเป็นตัวเลขโดยลบสัญลักษณ์ "$" และใช้ `parseFloat`
    - กรองราคาที่ไม่ถูกต้อง (เช่น ค่าว่างหรือไม่ใช่ตัวเลข) ด้วย `filter`
    - สร้างลิสต์ราคาที่เรียงจากน้อยไปมาก (`sorted`) โดยใช้ `sort`
    - ตรวจสอบว่าราคาที่ได้ (`numericPrices`) ตรงกับลิสต์ที่เรียงแล้ว (`sorted`) ด้วย `expect`
- **ปัญหาในเคสนี้**: การทดสอบล้มเหลวเพราะไม่พบ element `[data-test="product_sort_container"]` สาเหตุที่เป็นไปได้:
  - **Selector เปลี่ยน**: เว็บอาจใช้ `data-test` ค่าอื่นหรือไม่มี `data-test`
  - **หน้าไม่โหลดสมบูรณ์**: การล็อกอินอาจล้มเหลวหรือหน้า inventory โหลดไม่ถึง
  - **เวลาไม่พอ**: Dropdown อาจโหลดช้ากว่า 15 วินาที
- **การแก้ไขในโค้ด**:
  - เพิ่ม fallback selector เพื่อรองรับกรณีที่ `data-test` เปลี่ยน
  - ใช้ `waitForLoadState` และ `waitForSelector` เพื่อยืนยันหน้าโหลดสมบูรณ์
  - รอ dropdown นานขึ้น (15 วินาที)

## 6. ชุดทดสอบ: Checkout Process
```javascript
test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#user-name').fill(user.standard.username);
    await page.locator('#password').fill(user.standard.password);
    await page.locator('#login-button').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
  });
  test('should complete checkout process', async ({ page }) => {
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
```
- **ทำอะไร**: ทดสอบขั้นตอนการชำระเงินตั้งแต่เพิ่มสินค้าลงตะกร้าจนถึงสั่งซื้อสำเร็จ
- **จุดประสงค์**: ตรวจสอบว่าระบบชำระเงินทำงานถูกต้องและแสดงข้อความยืนยันเมื่อสั่งซื้อสำเร็จ
- **การทำงาน**:
  - **`beforeEach`**:
    - ล็อกอินด้วย `standard_user` โดยใช้ข้อมูลจากอ็อบject `user`
    - คลิกปุ่ม "Add to Cart" สำหรับสินค้า "Sauce Labs Backpack" (ด้วย selector `[data-test="add-to-cart-sauce-labs-backpack"]`)
    - คลิกไอคอนตะกร้า (`.shopping_cart_link`) เพื่อไปที่หน้าตะกร้า
    - คลิกปุ่ม "Checkout" (ด้วย selector `[data-test="checkout"]`) เพื่อเริ่มกระบวนการชำระเงิน
  - **เค

สทดสอบ**:
    - กรอกข้อมูลในหน้าชำระเงิน: ชื่อ `John` (ใน `#first-name`), นามสกุล `Doe` (ใน `#last-name`), รหัสไปรษณีย์ `12345` (ใน `#postal-code`)
    - คลิกปุ่ม "Continue" (ด้วย `[data-test="continue"]`) เพื่อไปต่อ
    - คลิกปุ่ม "Finish" (ด้วย `[data-test="finish"]`) เพื่อยืนยันการสั่งซื้อ
    - ตรวจสอบว่า element `.complete-header` มีข้อความ "Thank you for your order!" เพื่อยืนยันว่าการสั่งซื้อสำเร็จ

## สรุปการทำงานโดยรวม
โค้ดนี้ใช้ Playwright เพื่อทดสอบฟังก์ชันหลักของเว็บ SauceDemo:
- **การล็อกอิน**: ทดสอบทั้งกรณีที่สำเร็จ (ผู้ใช้ปกติ) และล้มเหลว (ผู้ใช้ถูกล็อก)
- **การเรียงลำดับสินค้า**: ตรวจสอบว่า dropdown การเรียงลำดับในหน้า inventory ทำงานถูกต้อง
- **การชำระเงิน**: ทดสอบกระบวนการตั้งแต่เพิ่มสินค้าลงตะกร้าจนถึงสั่งซื้อสำเร็จ
- การใช้ `test.describe` ช่วยจัดกลุ่มทดสอบให้เป็นระเบียบ
- `beforeEach` ตั้งค่าสภาพแวดล้อมเริ่มต้น เช่น เปิดหน้าเว็บหรือล็อกอิน
- การใช้ `await` ในทุกการกระทำ (เช่น `goto`, `fill`, `click`) รับรองว่า Playwright Rอให้แต่ละขั้นตอนเสร็จก่อนไปต่อ
- การใช้ `expect` ตรวจสอบผลลัพธ์ เช่น URL, การแสดง element, หรือข้อความ

## บริบทของปัญหา
- **ข้อผิดพลาดในเคส `should sort items by price low to high`**: การทดสอบล้มเหลวเพราะไม่พบ element `[data-test="product_sort_container"]` สาเหตุที่เป็นไปได้:
  1. **Selector ไม่ถูกต้อง**: เว็บอาจเปลี่ยน `data-test` หรือใช้ element อื่น (เช่น เปลี่ยนเป็น `data-test="product-sort"`)
  2. **หน้าไม่โหลดสมบูรณ์**: การล็อกอินอาจล้มเหลวหรือหน้า inventory ไม่โหลด
  3. **เวลาไม่พอ**: Dropdown อาจโหลดช้าเกิน 15 วินาที
- **การแก้ไขในโค้ด**:
  - ใช้ selector สำรอง (fallback) เพื่อรองรับกรณีที่ `data-test` เปลี่ยน
  - เพิ่ม `waitForLoadState('networkidle')` และ `waitForSelector('.inventory_list')` เพื่อยันยันว่าโหลดหน้า inventory แล้ว
  - รอ dropdown นานขึ้น (15 วินาที) และใช้ selector รวมทั้งแบบปกติและสำรอง

## วิธีแก้ปัญหาการทดสอบที่ล้มเหลว
เพื่อแก้ไขปัญหาการทดสอบ `should sort items by price low to high`:
1. **รันในโหมด headed**:
   ```bash
   npx playwright test tests/test_saucedemo.spec.js --headed
   ```
   - ดูว่าหน้า inventory โหลดหรือไม่ และ dropdown แสดงหรือไม่
2. **เปิดใช้งาน tracing**:
   ```bash
   npx playwright test tests/test_saucedemo.spec.js --trace on
   ```
   - ดู trace ด้วย:
     ```bash
     npx playwright show-trace test-results/<trace-file>.zip
     ```
   - ตรวจสอบ snapshot ของ DOM ว่า element `[data-test="product_sort_container"]` มีอยู่หรือไม่
3. **ตรวจสอบหน้าเว็บ**:
   - เปิด `https://www.saucedemo.com` ล็อกอินด้วย `standard_user` และ `secret_sauce`
   - ตรวจสอบ element dropdown ในหน้า inventory (ปกติเป็น `<select data-test="product_sort_container" class="product_sort_container">`)
   - ถ้า `data-test` เปลี่ยน (เช่น เป็น `product-sort`) อัปเดตโค้ด:
     ```javascript
     const sortDropdown = page.locator('[data-test="product-sort"]');
     ```