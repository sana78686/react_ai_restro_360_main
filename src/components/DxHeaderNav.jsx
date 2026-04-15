import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getMegaMenuIcon } from './MegaMenuIcons'
import {
  DX_SOLUTIONS,
  DX_INTEGRATIONS_OUR,
  DX_INTEGRATIONS_PARTNERS,
  DX_RESOURCES,
} from '../config/dxHeaderNavData'
import { RESTRO_LOGIN_URL, RESTRO_REGISTER_URL } from '../config/portal'
import { SITE_NAME } from '../constants/brand'
import BrandLogo from './BrandLogo'
import LangFlag from './LangFlag'
import { supportedLangs, langOptions, defaultLang, writeUserLocalePreference } from '../i18n/translations'
import { langShortLabel } from '../i18n/langMeta'

function buildLangSwitchHref(pathname, currentLang, targetLang) {
  let suffix = pathname
  if (currentLang !== defaultLang) {
    suffix = pathname.replace(new RegExp(`^/${currentLang}(/|$)`), '$1') || '/'
  }
  if (!suffix.startsWith('/')) suffix = '/' + suffix
  if (targetLang === defaultLang) return suffix
  return `/${targetLang}${suffix === '/' ? '' : suffix}`
}

function GlobeIcon() {
  return (
    <svg className="dx-locale-globe" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function DxIntIcon({ name }) {
  const s = String(name || 'default')
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75 }
  switch (s) {
    case 'pos':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8M8 12h5M8 16h3" />
        </svg>
      )
    case 'delivery':
      return (
        <svg {...common}>
          <path d="M3 17h13l3-6V7H6a2 2 0 0 0-2 2v8z" />
          <circle cx="6.5" cy="18.5" r="1.5" />
          <circle cx="16.5" cy="18.5" r="1.5" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M10 18h4" />
        </svg>
      )
    case 'kiosk':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 21h6" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      )
    case 'heart':
      return (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    case 'partner':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="4" />
          <path d="M8 21v-3a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case 'wrench':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

function resolveHref(lp, item) {
  if (item.hash) return `${lp}/#${item.hash}`
  if (item.path) {
    const p = item.path.replace(/^\//, '')
    return `${lp}/${p}`
  }
  if (item.slug) return `${lp}/${item.slug}`
  return lp || '/'
}

export default function DxHeaderNav({
  t,
  lang,
  lp,
  pathname,
}) {
  const [openKey, setOpenKey] = useState(null)
  const [langOpen, setLangOpen] = useState(false)
  const closeTimer = useRef(null)
  const zoneRef = useRef(null)
  const langRef = useRef(null)

  const clearOpenTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = useCallback(() => {
    clearOpenTimer()
    closeTimer.current = setTimeout(() => setOpenKey(null), 160)
  }, [])

  const openMenu = (key) => {
    clearOpenTimer()
    setOpenKey(key)
  }

  useEffect(() => () => clearOpenTimer(), [])

  useEffect(() => {
    function onDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    if (langOpen) document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [langOpen])

  useEffect(() => {
    setOpenKey(null)
  }, [pathname])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpenKey(null)
        setLangOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const DxNavTrigger = ({ k, labelKey, hasMega }) => {
    const active = openKey === k
    return (
      <button
        type="button"
        className={`dx-nav-pill-link ${active ? 'dx-nav-pill-link--active' : ''}`}
        aria-expanded={active}
        aria-haspopup={hasMega ? 'true' : undefined}
        onMouseEnter={() => hasMega && openMenu(k)}
        onFocus={() => hasMega && openMenu(k)}
        onClick={() => {
          if (hasMega) setOpenKey((cur) => (cur === k ? null : k))
        }}
      >
        <span>{t(labelKey)}</span>
        {hasMega && (
          <span className="dx-nav-chevron" aria-hidden>
            ▾
          </span>
        )}
      </button>
    )
  }

  const MegaSolutions = () => (
    <div className="dx-mega dx-mega--solutions" role="region" aria-label={t('dxHeader.megaSolutions')}>
      <div className="dx-mega-panel-inner dx-mega-solutions-grid">
        {DX_SOLUTIONS.map((col) => (
          <div key={col.columnKey} className="dx-mega-col">
            <h3 className="dx-mega-col-title">{t(col.columnKey)}</h3>
            <ul className="dx-mega-list">
              {col.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={resolveHref(lp, item)}
                    className="dx-mega-item"
                    onClick={() => setOpenKey(null)}
                  >
                    <span className="dx-mega-item-icon" aria-hidden>
                      {getMegaMenuIcon(item.slug)}
                    </span>
                    <span className="dx-mega-item-text">
                      <span className="dx-mega-item-title">{t(item.titleKey)}</span>
                      <span className="dx-mega-item-sub">{t(item.subKey)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  const MegaIntegrations = () => (
    <div className="dx-mega dx-mega--integrations" role="region" aria-label={t('dxHeader.megaIntegrations')}>
      <div className="dx-mega-panel-inner dx-mega-integrations-grid">
        <div className="dx-mega-int-card">
          <p className="dx-mega-int-kicker">{t('dxHeader.intCardKicker')}</p>
          <p className="dx-mega-int-headline">{t('dxHeader.intCardTitle')}</p>
          <p className="dx-mega-int-desc">{t('dxHeader.intCardDesc')}</p>
          <Link to={`${lp}/tools`} className="dx-mega-int-cta" onClick={() => setOpenKey(null)}>
            {t('dxHeader.intCardCta')}
          </Link>
        </div>
        <div>
          <h3 className="dx-mega-col-title dx-mega-col-title--muted">{t('dxHeader.intOurTitle')}</h3>
          <ul className="dx-mega-int-list">
            {DX_INTEGRATIONS_OUR.map((row) => (
              <li key={row.titleKey}>
                <Link
                  to={row.path ? `${lp}/${row.path}` : resolveHref(lp, row)}
                  className="dx-mega-int-row"
                  onClick={() => setOpenKey(null)}
                >
                  <span className="dx-mega-int-row-icon" aria-hidden>
                    <DxIntIcon name={row.icon} />
                  </span>
                  <span>{t(row.titleKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="dx-mega-col-title dx-mega-col-title--muted">{t('dxHeader.intPartnersTitle')}</h3>
          <ul className="dx-mega-int-list">
            {DX_INTEGRATIONS_PARTNERS.map((row) => (
              <li key={row.titleKey}>
                <Link
                  to={row.path ? `${lp}/${row.path}` : resolveHref(lp, row)}
                  className="dx-mega-int-row"
                  onClick={() => setOpenKey(null)}
                >
                  <span className="dx-mega-int-row-icon dx-mega-int-row-icon--partner" aria-hidden>
                    {row.icon ? <DxIntIcon name={row.icon} /> : <span className="dx-mega-dot" />}
                  </span>
                  <span>{t(row.titleKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  const MegaResources = () => (
    <div className="dx-mega dx-mega--resources" role="region" aria-label={t('dxHeader.megaResources')}>
      <div className="dx-mega-panel-inner dx-mega-resources-grid">
        {DX_RESOURCES.map((col) => (
          <div key={col.columnKey} className="dx-mega-col">
            <h3 className="dx-mega-col-title">{t(col.columnKey)}</h3>
            <ul className="dx-mega-list dx-mega-list--compact">
              {col.items.map((item) => (
                <li key={item.titleKey}>
                  <Link
                    to={resolveHref(lp, item)}
                    className="dx-mega-item dx-mega-item--compact"
                    onClick={() => setOpenKey(null)}
                  >
                    <span className="dx-mega-item-icon dx-mega-item-icon--line" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M6 4h12v16H6z" />
                        <path d="M9 8h6M9 12h4" />
                      </svg>
                    </span>
                    <span className="dx-mega-item-title">{t(item.titleKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  const megaContent =
    openKey === 'solutions' ? (
      <MegaSolutions />
    ) : openKey === 'integrations' ? (
      <MegaIntegrations />
    ) : openKey === 'resources' ? (
      <MegaResources />
    ) : null

  return (
    <div
      className="dx-header-zone"
      ref={zoneRef}
      onMouseLeave={scheduleClose}
    >
      <div className="dx-header-pill">
        <BrandLogo href={`${lp}/`} ariaLabel={t('nav.home')} text={SITE_NAME} />
        <nav className="dx-header-pill-nav" aria-label="Primary">
          <DxNavTrigger k="solutions" labelKey="dxHeader.solutions" hasMega />
          <DxNavTrigger k="integrations" labelKey="dxHeader.integrations" hasMega />
          <Link
            to={`${lp}/contact`}
            className="dx-nav-pill-link dx-nav-pill-link--link dx-nav-pill-link--plain"
            onMouseEnter={() => setOpenKey(null)}
          >
            {t('dxHeader.pricing')}
          </Link>
          <DxNavTrigger k="resources" labelKey="dxHeader.resources" hasMega />
        </nav>

        <div className="dx-header-pill-actions">
          <div className="dx-locale-wrap" ref={langRef}>
            <button
              type="button"
              className={`dx-locale-pill ${langOpen ? 'dx-locale-pill--open' : ''}`}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={t('dxHeader.localeLabel')}
              onClick={() => setLangOpen((o) => !o)}
            >
              <GlobeIcon />
              <span className="dx-locale-code">{langShortLabel[lang] ?? lang?.toUpperCase() ?? 'EN'}</span>
            </button>
            {langOpen && (
              <ul className="dx-locale-menu" role="listbox">
                {supportedLangs.map((l) => (
                  <li key={l} role="option" aria-selected={lang === l}>
                    <a
                      href={buildLangSwitchHref(pathname, lang, l)}
                      className={`dx-locale-item ${lang === l ? 'dx-locale-item--active' : ''}`}
                      onClick={() => {
                        writeUserLocalePreference(l)
                        setLangOpen(false)
                      }}
                    >
                      <span className="dx-locale-item-flag" aria-hidden>
                        <LangFlag lang={l} width={20} />
                      </span>
                      <span>{langOptions[l]?.label ?? l.toUpperCase()}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span className="dx-header-actions-divider" aria-hidden />

          <a className="dx-header-log-in" href={RESTRO_LOGIN_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.logIn')}
          </a>
          <a className="dx-header-cta" href={RESTRO_REGISTER_URL} target="_blank" rel="noopener noreferrer">
            {t('landing.dxGetStarted')}
          </a>
        </div>
      </div>

      {megaContent && (
        <div
          className="dx-mega-host"
          onMouseEnter={clearOpenTimer}
        >
          {megaContent}
        </div>
      )}
    </div>
  )
}
