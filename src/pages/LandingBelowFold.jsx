import { Link } from 'react-router-dom'

/** Icon key → emoji for CMS-driven cards (match CMS list). */
const CARD_ICON_EMOJI = {
  lightning: '⚡',
  quality: '🎚️',
  lock: '🔒',
  star: '✨',
  document: '📄',
  shield: '🛡️',
  heart: '❤️',
  cloud: '☁️',
  download: '⬇️',
  upload: '⬆️',
  check: '✅',
  image: '🖼️',
  'file-plus': '📎',
  layers: '📑',
  sparkle: '✨',
  zap: '⚡',
  settings: '⚙️',
  globe: '🌐',
  mobile: '📱',
  clock: '⏱️',
}

function renderMediaIcon(item, idx) {
  const type = String(item.media_type || '').toLowerCase()
  const val = String(item.media_value || '').trim()
  if (type === 'number' || type === 'numbered') {
    return <span className="landing-step-num" aria-hidden="true">{val || idx + 1}</span>
  }
  if (type === 'fa-icon' && val) {
    return <i className={val} aria-hidden="true" />
  }
  if (type === 'icon' && val && CARD_ICON_EMOJI[val]) {
    return <span className="landing-card-icon" aria-hidden="true">{CARD_ICON_EMOJI[val]}</span>
  }
  if (type === 'image' && val) {
    return <img src={val} alt="" className="landing-step-img" loading="lazy" aria-hidden="true" />
  }
  return <span className="landing-step-num" aria-hidden="true">{idx + 1}</span>
}

function buildFourCards(cards, t) {
  const defaults = [1, 2, 3, 4].map((n) => ({
    id: `fallback-${n}`,
    title: t(`landing.feature${n}Title`),
    description: t(`landing.feature${n}Desc`),
    icon: ['lightning', 'quality', 'lock', 'star'][n - 1],
  }))
  const out = []
  for (let i = 0; i < 4; i += 1) {
    out.push(cards[i] || defaults[i])
  }
  return out
}

/**
 * Below-the-fold: WHAT / WHY / HOW / WHO / integrations / dual CTA — CMS cards & sections preserved.
 */
export default function LandingBelowFold({ t, cards = [], howSection = null, sections = [], lp = '' }) {
  const cardEmoji = (iconKey) => CARD_ICON_EMOJI[iconKey] ?? '✨'
  const whatFour = buildFourCards(cards, t)
  const whyFour = buildFourCards(cards, t)

  return (
    <>
      <section className="dx-what" aria-labelledby="dx-what-heading">
        <div className="dx-container dx-what-grid">
          <div className="dx-what-visual" aria-hidden="true">
            <div className="dx-what-visual-inner" />
          </div>
          <div>
            <h2 id="dx-what-heading" className="dx-what-label">
              {t('landing.dxWhatTitle')}
            </h2>
            <ul className="dx-what-list">
              {whatFour.map((card, idx) => (
                <li key={card.id ?? idx} className="dx-what-item">
                  <span className="dx-what-dot" aria-hidden="true" />
                  <div>
                    <p className="dx-what-item-title">{card.title}</p>
                    <p className="dx-what-item-desc">{card.description || ''}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="dx-why" aria-labelledby="dx-why-heading">
        <div className="dx-container">
          <h2 id="dx-why-heading" className="dx-why-title">
            {t('landing.dxWhyTitle')}
          </h2>
          <div className="dx-why-grid">
            {whyFour.map((card, idx) => (
              <div key={card.id ?? idx} className="dx-why-card">
                <span className="dx-why-card-icon" aria-hidden="true">
                  {cardEmoji(card.icon)}
                </span>
                <h3 className="dx-why-card-title">{card.title}</h3>
                <p className="dx-why-card-desc">{card.description || ''}</p>
                <Link to={`${lp}/tools`} className="dx-why-card-link">
                  {t('landing.dxExploreLink')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.map((sec) => {
        const items = Array.isArray(sec.items) ? sec.items : []
        if (!items.length) return null
        const sectionId = `cms-section-${sec.id}`
        return (
          <section key={sec.id} className="landing-section landing-how dx-how" aria-labelledby={sectionId}>
            <div className="dx-container">
              <h2 id={sectionId} className="landing-section-title">
                {sec.title || ''}
              </h2>
              {sec.description && <p className="landing-section-subtitle">{sec.description}</p>}
              <div className="landing-steps">
                {items.map((item, idx) => (
                  <div key={item.id ?? idx} className="landing-step">
                    {renderMediaIcon(item, idx)}
                    <h3 className="landing-step-title">{item.title || ''}</h3>
                    <p className="landing-step-desc">{item.description || ''}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {sections.length === 0 && (
        <section className="landing-section landing-how dx-how" aria-labelledby="landing-how-heading">
          <div className="dx-container">
            <h2 id="landing-how-heading" className="landing-section-title">
              {howSection?.title?.trim?.() || t('landing.howTitle')}
            </h2>
            {howSection?.description?.trim?.() && (
              <p className="landing-section-subtitle">{howSection.description.trim()}</p>
            )}
            <div className="landing-steps">
              <div className="landing-step">
                <span className="landing-step-num" aria-hidden="true">1</span>
                <h3 className="landing-step-title">{t('landing.howStep1')}</h3>
                <p className="landing-step-desc">{t('landing.howStep1Desc')}</p>
              </div>
              <div className="landing-step">
                <span className="landing-step-num" aria-hidden="true">2</span>
                <h3 className="landing-step-title">{t('landing.howStep2')}</h3>
                <p className="landing-step-desc">{t('landing.howStep2Desc')}</p>
              </div>
              <div className="landing-step">
                <span className="landing-step-num" aria-hidden="true">3</span>
                <h3 className="landing-step-title">{t('landing.howStep3')}</h3>
                <p className="landing-step-desc">{t('landing.howStep3Desc')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="dx-who" aria-labelledby="dx-who-heading">
        <div className="dx-container">
          <h2 id="dx-who-heading" className="dx-who-title">
            {t('landing.dxWhoTitle')}
          </h2>
          <div className="dx-who-grid">
            <div className="dx-who-card">
              <div className="dx-who-img" aria-hidden="true" />
              <h3 className="dx-who-card-title">{t('landing.dxWho1Title')}</h3>
              <p className="dx-who-card-desc">{t('landing.dxWho1Desc')}</p>
            </div>
            <div className="dx-who-card">
              <div className="dx-who-img" aria-hidden="true" />
              <h3 className="dx-who-card-title">{t('landing.dxWho2Title')}</h3>
              <p className="dx-who-card-desc">{t('landing.dxWho2Desc')}</p>
            </div>
            <div className="dx-who-card">
              <div className="dx-who-img" aria-hidden="true" />
              <h3 className="dx-who-card-title">{t('landing.dxWho3Title')}</h3>
              <p className="dx-who-card-desc">{t('landing.dxWho3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dx-integrations" aria-labelledby="dx-int-heading">
        <div className="dx-container">
          <h2 id="dx-int-heading" className="dx-int-title">
            {t('landing.dxIntegrationsTitle')}
          </h2>
          <div className="dx-int-logos" aria-hidden="true">
            <span className="dx-int-logo">PDF</span>
            <span className="dx-int-logo">Cloud</span>
            <span className="dx-int-logo">Drive</span>
            <span className="dx-int-logo">Secure</span>
            <span className="dx-int-logo">Fast</span>
          </div>
          <Link to={`${lp}/tools`} className="dx-btn-primary" style={{ margin: '0 auto', display: 'inline-flex' }}>
            {t('landing.dxExploreLink')}
          </Link>
        </div>
      </section>

      <section className="dx-dual" aria-labelledby="dx-dual-heading">
        <div className="dx-container">
          <h2 id="dx-dual-heading" className="dx-dual-title">
            {t('landing.dxDualTitle')}
          </h2>
          <div className="dx-dual-grid">
            <div className="dx-dual-card">
              <h3>{t('landing.dxCtaCard1Title')}</h3>
              <p>{t('landing.dxCtaCard1Desc')}</p>
              <Link to={`${lp}/tools`}>{t('landing.dxExploreLink')} →</Link>
            </div>
            <div className="dx-dual-card">
              <h3>{t('landing.dxCtaCard2Title')}</h3>
              <p>{t('landing.dxCtaCard2Desc')}</p>
              <Link to={`${lp}/contact`}>{t('landing.dxFaqCta')} →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
