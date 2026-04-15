import { useState, useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import { useLang } from '../hooks/useLang'
import { getPages, getLegalNav, getFaq } from '../api/cms'
import Breadcrumbs from './Breadcrumbs'
import DxAnnouncementBar from './DxAnnouncementBar'
import DxHeaderNav from './DxHeaderNav'
import { langPrefix } from '../i18n/translations'

function faqListHasContent(res) {
  const list = res?.faq
  if (!Array.isArray(list) || list.length === 0) return false
  return list.some((item) => {
    const strip = (s) =>
      String(s ?? '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    return strip(item.question).length > 0 || strip(item.answer).length > 0
  })
}

const Footer = lazy(() => import('./Footer'))

export default function SiteLayout({ children }) {
  const lang = useLang()
  const location = useLocation()
  const pathname = location.pathname
  const t = useTranslation(lang)
  const [footerPages, setFooterPages] = useState([])
  const [legalVisibility, setLegalVisibility] = useState({})
  const [showFaqLink, setShowFaqLink] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const locale = lang

  useEffect(() => {
    let cancelled = false
    Promise.all([
      getPages(locale).catch(() => ({ pages: [] })),
      getLegalNav(locale).catch(() => ({ legal: {} })),
      getFaq(locale).catch(() => ({ faq: [] })),
    ]).then(([pagesRes, legalNavRes, faqRes]) => {
      if (cancelled) return
      setFooterPages(Array.isArray(pagesRes?.pages) ? pagesRes.pages : [])
      const legal = legalNavRes?.legal
      setLegalVisibility(legal && typeof legal === 'object' ? legal : {})
      setShowFaqLink(faqListHasContent(faqRes))
    })
    return () => {
      cancelled = true
    }
  }, [locale])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = 'ltr'
    }
  }, [lang])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setHeaderScrolled(y > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lp = langPrefix(lang)

  return (
    <div className="home-page">
      <header
        className={`header header--dx dx-header-shell${headerScrolled ? ' dx-header-shell--scrolled' : ''}`}
      >
        {scrollY < 1 ? (
          <DxAnnouncementBar t={t} lang={lang} className="dx-announcement-bar--desktop-only" />
        ) : null}
        <div className="dx-header-float-area">
          <DxHeaderNav
            t={t}
            lang={lang}
            lp={lp}
            pathname={pathname}
            showAnnouncement={scrollY < 1}
          />
        </div>
      </header>

      <main id="main-content" className="main cms-main" tabIndex="-1">
        <Breadcrumbs />
        {children}
      </main>

      <Suspense fallback={<div className="footer-placeholder" aria-hidden="true" />}>
        <Footer
          lang={lang}
          pathname={pathname}
          t={t}
          footerPages={footerPages}
          legalVisibility={legalVisibility}
          showFaqLink={showFaqLink}
        />
      </Suspense>
    </div>
  )
}
