/**
 * Mega menu structure for "All PDF Tools" – categories and tools with slugs.
 * Slugs route to /:slug (ComingSoon or tool page).
 */
export const MEGA_MENU_CATEGORIES = [
  {
    categoryKey: 'megaMenu.organizePdf',
    tools: [
      { slug: 'merge', labelKey: 'tools.mergePdf' },
      { slug: 'split', labelKey: 'tools.splitPdf' },
      { slug: 'remove-pages', labelKey: 'tools.removePages' },
      { slug: 'extract-pages', labelKey: 'tools.extractPages' },
      { slug: 'rearrange', labelKey: 'tools.rearrangePages' },
      { slug: 'webpage-to-pdf', labelKey: 'tools.webpageToPdf' },
    ],
  },
  {
    categoryKey: 'megaMenu.optimizePdf',
    tools: [
      { slug: 'ocr', labelKey: 'tools.pdfOcr' },
    ],
  },
  {
    categoryKey: 'megaMenu.convertToPdf',
    tools: [
      { slug: 'images-to-pdf', labelKey: 'tools.imagesToPdf' },
      { slug: 'convert', labelKey: 'tools.convertPdf' },
    ],
  },
  {
    categoryKey: 'megaMenu.convertFromPdf',
    tools: [
      { slug: 'pdf-to-images', labelKey: 'tools.pdfToImages' },
    ],
  },
  {
    categoryKey: 'megaMenu.editPdf',
    tools: [
      { slug: 'rotate', labelKey: 'tools.rotatePdf' },
      { slug: 'page-numbers', labelKey: 'tools.addPageNumbers' },
      { slug: 'watermark', labelKey: 'tools.addWatermark' },
      { slug: 'edit', labelKey: 'tools.editPdf' },
    ],
  },
  {
    categoryKey: 'megaMenu.pdfSecurity',
    tools: [
      { slug: 'unlock', labelKey: 'tools.unlockPdf' },
      { slug: 'protect', labelKey: 'tools.protectPdf' },
      { slug: 'sign', labelKey: 'tools.signPdf' },
      { slug: 'redact', labelKey: 'tools.redactPdf' },
      { slug: 'compare', labelKey: 'tools.comparePdfs' },
    ],
  },
  {
    categoryKey: 'megaMenu.pdfIntelligence',
    tools: [
      { slug: 'translate', labelKey: 'tools.translatePdf' },
    ],
  },
]
