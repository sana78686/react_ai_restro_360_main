/**
 * Fallback home rich text when CMS has no body for this locale.
 * English = long SEO block; Indonesian = shorter intro (add full copy in CMS per language).
 */
function siteName() {
  return String(import.meta.env.VITE_PUBLIC_SITE_NAME || 'AI Restro 360').trim() || 'AI Restro 360'
}

const SHORT_BY_LANG = {
  id: (name) => `
<section class="default-landing-seo">
  <p class="default-landing-lead"><strong>${name}</strong> membantu restoran memanfaatkan AI untuk operasional dan pengalaman tamu. Ganti teks ini dengan konten lengkap di CMS untuk bahasa Indonesia jika perlu.</p>
  <h2>Apa itu AI Restro 360?</h2>
  <p>Platform untuk tim F&amp;B yang ingin mengotomatisasi tugas berulang, menganalisis data, dan meningkatkan layanan — tanpa mengganti seluruh sistem POS Anda sekaligus.</p>
  <p class="default-landing-note">Ganti teks ini dengan konten lengkap di CMS untuk bahasa Indonesia jika perlu.</p>
</section>`.trim(),
}

export function getDefaultLandingHomeHtml(lang = 'en') {
  const name = siteName()
  const builder = SHORT_BY_LANG[lang]
  if (builder) return builder(name)

  return `
<section class="default-landing-seo">
  <p class="default-landing-lead"><strong>${name}</strong> helps restaurants and hospitality teams use artificial intelligence where it matters: faster service, clearer insights, and smoother day-to-day operations.</p>

  <h2>What is AI Restro 360?</h2>
  <p>It is a marketing and operations companion for modern dining brands. We focus on practical AI that fits into how you already work — from the front of house to back-office planning — without forcing a one-size-fits-all stack.</p>

  <h2>What you can explore</h2>
  <ul class="default-landing-list">
    <li><strong>Guest experience</strong> — Ideas and tools that support consistent, friendly service across channels.</li>
    <li><strong>Operations</strong> — Ways to reduce manual work on recurring tasks so your team can focus on guests.</li>
    <li><strong>Growth</strong> — Content and guidance aimed at owners and managers who care about sustainable growth, not buzzwords.</li>
  </ul>
  <p>Use the site menu to browse tools, guides, and updates. When your CMS content is published, it replaces this placeholder text.</p>

  <h2>Who is this for?</h2>
  <p>Independent restaurants, small groups, and operators who want clear, plain-language help with AI — not another vague “platform” pitch. If you care about <strong>SEO</strong> and discoverability, the pages you manage in the CMS drive titles, descriptions, and structured data on the live site.</p>

  <h2>Getting started</h2>
  <ol class="default-landing-steps">
    <li>Read the home and product sections managed in your CMS.</li>
    <li>Contact us if you need a demo or a tailored rollout plan.</li>
    <li>Follow announcements for new features and integrations.</li>
  </ol>

  <h2>Privacy and responsibility</h2>
  <p>Only adopt tools and workflows that match your policies and local regulations. For sensitive business data, involve your IT or legal team before connecting third-party services.</p>

  <h2>Need help?</h2>
  <p>Visit the <strong>Contact</strong> page (link in the footer). We read messages and respond when we can.</p>

  <p class="default-landing-note">This text helps search engines and new visitors understand what ${name} is about. Replace it with your CMS copy when ready.</p>
</section>
`.trim()
}
