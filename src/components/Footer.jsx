import { useState, useRef, useEffect } from 'react'
import { supportedLangs, langOptions, defaultLang, langPrefix as lp, writeUserLocalePreference } from '../i18n/translations'
import LangFlag from './LangFlag'
import { ucWords } from '../utils/ucWords'
import './Footer.css'

function buildLangSwitchHref(pathname, currentLang, targetLang) {
  let suffix = pathname || '/'
  if (currentLang !== defaultLang) {
    suffix = suffix.replace(new RegExp(`^/${currentLang}(/|$)`), '$1') || '/'
  }
  if (!suffix.startsWith('/')) suffix = '/' + suffix
  if (targetLang === defaultLang) return suffix
  return `/${targetLang}${suffix === '/' ? '' : suffix}`
}

function IconTranslate({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconGlobe({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
}

function IconLinkedIn({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconYouTube({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function IconChat({ className }) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
    </svg>
  )
}

export default function Footer({
  lang,
  pathname,
  t,
  footerPages = [],
  legalVisibility = {},
  showFaqLink = false,
}) {
  const [langOpen, setLangOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const langRef = useRef(null)
  const regionRef = useRef(null)

  const cmsFooterLinks = footerPages.filter(
    (p) => p.placement === 'footer' || p.placement === 'both',
  )

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
      if (regionRef.current && !regionRef.current.contains(e.target)) setRegionOpen(false)
    }
    if (langOpen || regionOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [langOpen, regionOpen])

  const effectiveLang = supportedLangs.includes(lang) ? lang : defaultLang
  const prefix = lp(effectiveLang)
  const toolsPath = `${prefix}/tools`

  const aboutHref = legalVisibility['about-us'] ? `${prefix}/legal/about-us` : `${prefix}/#about`
  const privacyHref = legalVisibility['privacy-policy']
    ? `${prefix}/legal/privacy-policy`
    : `${prefix}/legal/cookie-policy`
  const showPrivacyCookie = !!(legalVisibility['privacy-policy'] || legalVisibility['cookie-policy'])
  const securityHref = legalVisibility.disclaimer
    ? `${prefix}/legal/disclaimer`
    : legalVisibility.terms
      ? `${prefix}/legal/terms`
      : null

  return (
    <footer className="footer footer--dark">
      <div className="footer-inner">
        <div className="footer-main-grid">
          <div className="footer-brand-col">
            <a href={`${prefix}/`} className="footer-logo-link">
              <img
                src="/logos/airestro360-white.png"
                alt="AI Restro 360"
                className="footer-logo-img"
                width={180}
                height={40}
                decoding="async"
              />
            </a>
            <nav className="footer-social footer-social--brand" aria-label="Social links">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="footer-social-svg" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="YouTube"
              >
                <IconYouTube className="footer-social-svg" />
              </a>
            </nav>

            <div className="footer-selectors">
              <div className="footer-pill-wrap" ref={langRef}>
                <button
                  type="button"
                  className="footer-pill-btn"
                  onClick={() => {
                    setLangOpen((o) => !o)
                    setRegionOpen(false)
                  }}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                >
                  <IconTranslate className="footer-pill-icon" />
                  <span>{langOptions[effectiveLang]?.label || t('footerLanguage')}</span>
                  <span className="footer-pill-chevron" aria-hidden>▾</span>
                </button>
                {langOpen && (
                  <ul className="footer-pill-menu" role="listbox">
                    {supportedLangs.map((l) => (
                      <li key={l} role="option">
                        <a
                          href={buildLangSwitchHref(pathname, effectiveLang, l)}
                          className="footer-pill-item"
                          onClick={() => writeUserLocalePreference(l)}
                        >
                          <span className="footer-pill-item-flag" aria-hidden>
                            <LangFlag lang={l} width={18} />
                          </span>
                          <span>{langOptions[l]?.label || l.toUpperCase()}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="footer-pill-wrap" ref={regionRef}>
                <button
                  type="button"
                  className="footer-pill-btn"
                  onClick={() => {
                    setRegionOpen((o) => !o)
                    setLangOpen(false)
                  }}
                  aria-expanded={regionOpen}
                  aria-haspopup="listbox"
                  aria-label={t('footerRegionAria')}
                >
                  <IconGlobe className="footer-pill-icon" />
                  <span>{t('footerRegionGlobal')}</span>
                  <span className="footer-pill-chevron" aria-hidden>▾</span>
                </button>
                {regionOpen && (
                  <ul className="footer-pill-menu" role="listbox">
                    <li role="option">
                      <span className="footer-pill-item footer-pill-item--static">{t('footerRegionGlobal')}</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <p className="footer-copy-block">{t('footerCopyrightFull')}</p>
            <p className="footer-address">{t('footerAddressLine')}</p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">{t('footerColResources')}</h3>
            <a href={aboutHref}>{t('footerAbout')}</a>
            <a href={`${prefix}/#careers`}>{t('footerCareers')}</a>
            <a href={`${prefix}/contact`}>{t('footerContact')}</a>
            {showFaqLink ? <a href={`${prefix}/#landing-faq`}>{t('footerFaq')}</a> : null}
            <a href={`${prefix}/blog`}>{t('footerBlog')}</a>
            <a href={`${prefix}/#customer-stories`}>{t('footerCustomerStories')}</a>
            <a href={`${prefix}/#newsletter`}>{t('footerNewsletter')}</a>
            {cmsFooterLinks.map((p) => (
              <a key={p.id} href={`${prefix}/page/${p.slug}`}>
                {ucWords(p.title)}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">{t('footerColSolutions')}</h3>
            <a href={toolsPath}>{t('footerSolSentinel')}</a>
            <a href={toolsPath}>{t('footerSolDeliveryApp')}</a>
            <a href={toolsPath}>{t('footerSolDirect')}</a>
            <a href={toolsPath}>{t('footerSolDispatch')}</a>
            <a href={toolsPath}>{t('footerSolKiosk')}</a>
            <a href={toolsPath}>{t('footerSolTableOrdering')}</a>
            <a href={toolsPath}>{t('footerSolQuestApp')}</a>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">{t('footerColIntegrations')}</h3>
            <a href={toolsPath}>{t('footerIntAll')}</a>
            <a href={toolsPath}>{t('footerIntPos')}</a>
            <a href={toolsPath}>{t('footerInt3p')}</a>
            <a href={toolsPath}>{t('footerIntOnline')}</a>
            <a href={toolsPath}>{t('footerIntRetail')}</a>
            <a href={toolsPath}>{t('footerIntLoyalty')}</a>
            <a href={`${prefix}/contact`}>{t('footerIntPartner')}</a>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">{t('footerColFor')}</h3>
            <a href={`${prefix}/#restaurants`}>{t('footerForRestaurants')}</a>
            <a href={`${prefix}/#retail`}>{t('footerForRetail')}</a>
            <a href={`${prefix}/#enterprise`}>{t('footerForEnterprise')}</a>
          </div>
        </div>

        {(legalVisibility.terms || showPrivacyCookie || securityHref) ? (
          <nav className="footer-legal-row" aria-label="Legal">
            {legalVisibility.terms ? (
              <a href={`${prefix}/legal/terms`}>{t('footerTermsOfService')}</a>
            ) : null}
            {showPrivacyCookie ? (
              <a href={privacyHref}>{t('footerPrivacyCookieNotice')}</a>
            ) : null}
            {securityHref ? <a href={securityHref}>{t('footerSecurity')}</a> : null}
          </nav>
        ) : null}
      </div>

      <a href={`${prefix}/contact`} className="footer-chat-fab" aria-label={t('footerChatAria')}>
        <IconChat className="footer-chat-icon" />
      </a>
    </footer>
  )
}
