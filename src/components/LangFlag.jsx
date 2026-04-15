import { langToCountryCode } from '../i18n/langMeta'

/**
 * Renders a small flag image (reliable on Windows vs emoji flags).
 * @param {{ lang: string, width?: number, className?: string }} props
 */
export default function LangFlag({ lang, width = 22, className = '' }) {
  const code = langToCountryCode[lang] || 'un'
  const h = Math.round((width * 15) / 20)
  const src = `https://flagcdn.com/w40/${code}.png`
  const alt = ''

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={h}
      className={`lang-flag-img ${className}`.trim()}
      loading="lazy"
      decoding="async"
    />
  )
}
