import { useState, useEffect, lazy, Suspense, startTransition } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import { langPrefix } from '../i18n/translations'
import { useLang } from '../hooks/useLang'
import { getFaq, getHomeCards, getSections, getHomePageContent } from '../api/cms'
import JsonLd from '../components/JsonLd'
import './HomePage.css'
import './CmsPage.css'
const LandingBelowFold = lazy(() => import('./LandingBelowFold'))
const LandingFaqSection = lazy(() => import('./LandingFaqSection'))

function cmsHtmlHasVisibleText(html) {
  if (!html || typeof html !== 'string') return false
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > 0
}

/** English at `/`, Indonesian at `/id` (no trailing slash normalized). */
function isHomePath(pathname, lp) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (!lp) return p === '/'
  return p === lp.replace(/\/+$/, '')
}

function HomePage() {
  const lang = useLang()
  const location = useLocation()
  const pathname = location.pathname
  const t = useTranslation(lang)
  const lp = langPrefix(lang)
  const isHomeLanding = isHomePath(pathname, lp)

  const [faqOpenIndex, setFaqOpenIndex] = useState(null)
  const [showBelowFold, setShowBelowFold] = useState(false)
  const [landingFaq, setLandingFaq] = useState([])
  const [landingCards, setLandingCards] = useState([])
  const [cmsHomeHtml, setCmsHomeHtml] = useState('')
  const [howSection, setHowSection] = useState(null)
  const [cmsSections, setCmsSections] = useState([])
  const [homeJsonLd, setHomeJsonLd] = useState(null)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const publicPathForSeo = pathname.split('?')[0] || '/'

  useEffect(() => {
    if (!isHomeLanding) return undefined
    let cancelled = false
    const homePromise = getHomePageContent(lang, publicPathForSeo)
      .then((res) => {
        if (cancelled) return
        setCmsHomeHtml(typeof res?.content === 'string' ? res.content : '')
        const graph = res?.json_ld?.['@graph']
        setHomeJsonLd(Array.isArray(graph) && graph.length > 0 ? res.json_ld : null)
      })
      .catch(() => {
        if (!cancelled) {
          setCmsHomeHtml('')
          setHomeJsonLd(null)
        }
      })
    void Promise.all([homePromise])
    return () => {
      cancelled = true
    }
  }, [isHomeLanding, lang, publicPathForSeo])

  useEffect(() => {
    if (!showBelowFold) return undefined
    let cancelled = false
    Promise.all([
      getFaq(lang).catch(() => ({ faq: [] })),
      getHomeCards(lang).catch(() => ({ cards: [] })),
      getSections(lang).catch(() => ({ sections: [] })),
    ])
      .then(([faqRes, cardsRes, sectionsRes]) => {
        if (cancelled) return
        setLandingFaq(Array.isArray(faqRes.faq) ? faqRes.faq : [])
        setLandingCards(Array.isArray(cardsRes.cards) ? cardsRes.cards : [])
        setHowSection(cardsRes?.section && typeof cardsRes.section === 'object' ? cardsRes.section : null)
        setCmsSections(Array.isArray(sectionsRes.sections) ? sectionsRes.sections : [])
      })
      .catch(() => {
        if (cancelled) return
        setLandingFaq([])
        setLandingCards([])
        setHowSection(null)
        setCmsSections([])
      })
    return () => {
      cancelled = true
    }
  }, [showBelowFold, lang])

  useEffect(() => {
    const schedule = () => startTransition(() => setShowBelowFold(true))
    const id =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(schedule, { timeout: 1500 })
        : setTimeout(schedule, 100)
    return () => (typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  const faqItems =
    landingFaq.length > 0 ? landingFaq.map((item) => ({ q: item.question, a: item.answer })) : []

  return (
    <div className="home-page">
      <JsonLd data={isHomeLanding ? homeJsonLd : null} />
      <div className="main main--landing main--dx">
        <section className="dx-hero" aria-labelledby="dx-hero-title">
          <div className="dx-container dx-hero-grid">
            <div>
              <p className="dx-hero-kicker">{t('landing.dxHeroEyebrow')}</p>
              <h1 id="dx-hero-title" className="dx-hero-title">
                {t('landing.heroTitle')}
              </h1>
              <p className="dx-hero-sub">{t('landing.heroSubtitle')}</p>
              <div className="dx-hero-actions">
                <Link className="dx-btn-primary" to={`${lp}/contact`}>
                  {t('landing.dxGetStarted')}
                </Link>
                <Link className="dx-btn-ghost" to={`${lp}/contact`}>
                  {t('landing.dxContactLink')}
                </Link>
              </div>
            </div>
            <div className="dx-hero-visual" aria-hidden="true" />
          </div>
        </section>

        <section className="dx-stats" aria-label={t('landing.dxStatsAria')}>
          <div className="dx-container dx-stats-grid">
            <div>
              <span className="dx-stat-value">{t('landing.dxStat1Value')}</span>
              <span className="dx-stat-label">{t('landing.dxStat1Label')}</span>
            </div>
            <div>
              <span className="dx-stat-value">{t('landing.dxStat2Value')}</span>
              <span className="dx-stat-label">{t('landing.dxStat2Label')}</span>
            </div>
            <div>
              <span className="dx-stat-value">{t('landing.dxStat3Value')}</span>
              <span className="dx-stat-label">{t('landing.dxStat3Label')}</span>
            </div>
          </div>
        </section>

        <section className="dx-quote" aria-labelledby="dx-quote-heading">
          <div className="dx-container dx-quote-grid">
            <h2 id="dx-quote-heading" className="dx-quote-text">
              {t('landing.dxTestimonialQuote')}
            </h2>
            <div className="dx-quote-visual">
              <span className="dx-quote-badge">{t('landing.dxQuoteBadge')}</span>
            </div>
          </div>
        </section>

        {cmsHtmlHasVisibleText(cmsHomeHtml) && (
          <section className="dx-cms landing-cms-body-section" aria-label={t('landing.cmsSectionAria')}>
            <div className="dx-container">
              <div
                className="cms-home-cms-body cms-page-content"
                dangerouslySetInnerHTML={{ __html: cmsHomeHtml }}
              />
            </div>
          </section>
        )}

        {showBelowFold && (
          <Suspense fallback={null}>
            <LandingBelowFold
              t={t}
              cards={landingCards}
              howSection={howSection}
              sections={cmsSections}
              lp={lp}
            />
          </Suspense>
        )}

        {showBelowFold && faqItems.length > 0 && (
          <Suspense fallback={null}>
            <LandingFaqSection
              t={t}
              faqItems={faqItems}
              faqOpenIndex={faqOpenIndex}
              setFaqOpenIndex={setFaqOpenIndex}
              lp={lp}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default HomePage
