import { SITE_NAME, LOGO_SRC } from '../constants/brand'

/**
 * Site logo — uses `public/logos/airestro360.png`.
 */
export default function BrandLogo({ href, ariaLabel, text }) {
  const label = ariaLabel || text || SITE_NAME
  return (
    <a href={href} className="logo logo--brand logo--image" dir="ltr" aria-label={label}>
      <img
        className="logo-site-img"
        src={LOGO_SRC}
        alt=""
        width={280}
        height={72}
        decoding="async"
        loading="eager"
      />
      <span className="sr-only">{text || SITE_NAME}</span>
    </a>
  )
}
