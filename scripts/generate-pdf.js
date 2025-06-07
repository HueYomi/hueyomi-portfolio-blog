const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = path.join(__dirname, '../public/assets/cv/resume.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // Generate PDF with no headers/footers
  await page.pdf({
    path: path.join(__dirname, '../public/assets/cv/resume.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    displayHeaderFooter: false, // This removes headers and footers
  });
  
  await browser.close();
  console.log('PDF generated successfully at public/assets/cv/resume.pdf');
}

generatePDF().catch(console.error); 