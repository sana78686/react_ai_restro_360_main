import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import { useLang } from '../hooks/useLang'
import { buildCompressPdfBreadcrumbItems } from '../utils/breadcrumbTrail'
import './Breadcrumbs.css'

export default function Breadcrumbs() {
  const lang = useLang()
  const location = useLocation()
  const t = useTranslation(lang)
  const items = useMemo(
    () => buildCompressPdfBreadcrumbItems(location.pathname, t),
    [location.pathname, t],
  )

  if (!items?.length) return null

  return (
    <nav className="site-breadcrumbs" aria-label="Breadcrumb">
      <ol className="site-breadcrumbs-list">
        {items.map((crumb, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${crumb.label}-${i}-${crumb.to || ''}`} className="site-breadcrumbs-item">
              {last || !crumb.to ? (
                <span className="site-breadcrumbs-current" aria-current={last ? 'page' : undefined}>
                  {crumb.label}
                </span>
              ) : (
                <Link className="site-breadcrumbs-link" to={crumb.to}>
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
