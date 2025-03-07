// server.js
const express = require("express");
const next = require("next");

// ตรวจสอบว่าอยู่ในโหมด Development หรือ Production
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// เริ่มต้นเซิร์ฟเวอร์
app.prepare().then(() => {
    const server = express();

    // Middleware ตัวอย่าง (ถ้าต้องการ)
/*     server.use((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    }); */

    // Routing แบบกำหนดเอง (ถ้าต้องการ)
/*     server.get("/custom-route", (req, res) => {
        return app.render(req, res, "/custom-page", req.query);
    }); */

    // จัดการทุก route ที่เหลือด้วย Next.js
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    // เริ่มต้นเซิร์ฟเวอร์
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});