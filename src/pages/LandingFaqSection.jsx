import { Link } from 'react-router-dom'

/**
 * FAQ — Deliverect-style two-column block (left: title + CTAs, right: dark accordion rows).
 * Questions/answers come from CMS via HomePage (`faqItems`).
 */
export default function LandingFaqSection({ t, faqItems, faqOpenIndex, setFaqOpenIndex, lp = '' }) {
  if (!faqItems.length) return null

  return (
    <section id="landing-faq" className="landing-section dx-faq" aria-labelledby="landing-faq-heading">
      <div className="dx-container">
        <div className="dx-faq-grid">
          <div className="dx-faq-left">
            <h2 id="landing-faq-heading" className="dx-faq-heading">
              {t('landing.faqTitle')}
            </h2>
            <p className="dx-faq-sub">{t('landing.dxFaqSubtitle')}</p>
            <div className="dx-faq-actions">
              <Link to={`${lp}/contact`} className="dx-faq-btn dx-faq-btn--primary">
                {t('landing.dxFaqCta')}
              </Link>
              <a href="#landing-faq-list" className="dx-faq-btn dx-faq-btn--ghost">
                {t('landing.dxFaqViewAll')}
              </a>
            </div>
          </div>
          <div id="landing-faq-list" className="dx-faq-right">
            <div className="dx-faq-list" role="list">
              {faqItems.map((item, i) => {
                const open = faqOpenIndex === i
                return (
                  <div key={i} className="dx-faq-item" role="listitem">
                    <button
                      type="button"
                      className="dx-faq-q"
                      onClick={() => setFaqOpenIndex((prev) => (prev === i ? null : i))}
                      aria-expanded={open}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                    >
                      <span className="dx-faq-q-text">{item.q}</span>
                      <span className="dx-faq-icon" aria-hidden="true">
                        {open ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${i}`}
                      className="dx-faq-a"
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      hidden={!open}
                    >
                      <div
                        className="dx-faq-a-inner cms-page-content"
                        dangerouslySetInnerHTML={{ __html: item.a }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
