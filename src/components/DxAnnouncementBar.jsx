import { useState, useCallback, useEffect } from 'react'

export default function DxAnnouncementBar({ t, lang, className }) {
  const items = [t('dxHeader.announce1'), t('dxHeader.announce2'), t('dxHeader.announce3')].filter(Boolean)
  const [index, setIndex] = useState(0)
  const n = items.length || 1

  useEffect(() => {
    setIndex(0)
  }, [lang])

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + n) % n)
    },
    [n],
  )

  if (items.length === 0) return null

  return (
    <div
      className={['dx-announcement-bar', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={t('dxHeader.announceAria')}
    >
      <button
        type="button"
        className="dx-announcement-nav"
        aria-label={t('dxHeader.announcePrev')}
        onClick={() => go(-1)}
      >
        ‹
      </button>
      <p className="dx-announcement-text" aria-live="polite">
        {items[index]}
      </p>
      <button
        type="button"
        className="dx-announcement-nav"
        aria-label={t('dxHeader.announceNext')}
        onClick={() => go(1)}
      >
        ›
      </button>
    </div>
  )
}
