const puppeteer = require('puppeteer');
const express = require('express');
const { writeFile } = require('fs-extra');

const htmlToImageRouter = express.Router();


htmlToImageRouter.post('/htmlToImage', async (req, res) => {
  try {
    const browser = await puppeteer.launch({headless: 'new', args: ['--disable-features=site-per-process']});
    const page = await browser.newPage();
    await page.setViewport({
      width: 2080,
      height: 1040,
    });
    html  = Buffer.from(req.body.htmlString, 'base64').toString('utf-8');
    await page.setContent(html, {
      waitUntil: ["load","networkidle0"]
  });
    const imageBuffer = await page.screenshot({type: 'png',fullPage: true});

    await browser.close();

    await writeFile(`htmlToImageNode${new Date().getMilliseconds()}.png`, imageBuffer);

    res.status(200).json({
      status: 'Success',
      data: imageBuffer.toString('base64'),
    });
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
      message: e.message,
    });
  }
});

module.exports = htmlToImageRouter;
