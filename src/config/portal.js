/**
 * Portal (panel) URLs. Override with VITE_PORTAL_BASE_URL when the panel host differs.
 */
export const PORTAL_BASE_URL = String(
  import.meta.env.VITE_PORTAL_BASE_URL || 'https://portal.airestro360.com',
).replace(/\/+$/, '')
export const PORTAL_LOGIN_URL = `${PORTAL_BASE_URL}/login`
export const PORTAL_DASHBOARD_URL = `${PORTAL_BASE_URL}/dashboard`

/** My AI Restro 360 app — header Log in / Get started. */
export const RESTRO_LOGIN_URL = 'https://my.airestro360.com/restro-login'
export const RESTRO_REGISTER_URL = 'https://my.airestro360.com/restro-register'
