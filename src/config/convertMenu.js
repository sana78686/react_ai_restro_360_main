/**
 * Convert PDF mega-menu: two columns – Convert to PDF, Convert from PDF.
 * Slugs route to /:lang/:slug (ComingSoonPage until tools are built).
 */
export const CONVERT_TO_PDF = [
  { slug: 'jpg-to-pdf', labelKey: 'tools.jpgToPdf' },
  { slug: 'word-to-pdf', labelKey: 'tools.wordToPdf' },
  { slug: 'powerpoint-to-pdf', labelKey: 'tools.powerpointToPdf' },
  { slug: 'excel-to-pdf', labelKey: 'tools.excelToPdf' },
  { slug: 'html-to-pdf', labelKey: 'tools.htmlToPdf' },
]

export const CONVERT_FROM_PDF = [
  { slug: 'pdf-to-jpg', labelKey: 'tools.pdfToJpg' },
  { slug: 'pdf-to-word', labelKey: 'tools.pdfToWord' },
  { slug: 'pdf-to-powerpoint', labelKey: 'tools.pdfToPowerpoint' },
  { slug: 'pdf-to-excel', labelKey: 'tools.pdfToExcel' },
  { slug: 'pdf-to-pdfa', labelKey: 'tools.pdfToPdfa' },
]
