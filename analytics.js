// Propriedade GA4 informada pelo proprietário.
const GA_MEASUREMENT_ID = 'G-95Y7GT7CDT';

(() => {
  if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;
  const key = 'ws-rocha-analytics-consent';
  let allowed = false;
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  function enable() {
    allowed = true;
    window['ga-disable-' + GA_MEASUREMENT_ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.append(script);
  }
  const banner = document.createElement('section');
  banner.className = 'analytics-choice';
  banner.setAttribute('aria-label', 'Preferências de estatísticas');
  banner.innerHTML = '<p>Podemos usar o Google Analytics para entender as visitas e melhorar o site? <a href="/privacidade.html">Política de Privacidade</a></p><div><button type="button" data-choice="yes">Permitir estatísticas</button><button type="button" data-choice="no">Não permitir</button></div>';
  const preferences = document.createElement('button');
  preferences.type = 'button';
  preferences.className = 'analytics-preferences';
  preferences.textContent = 'Preferências de cookies';
  document.querySelector('.copyright')?.append(preferences);
  document.body.append(banner);
  let saved;
  try { saved = localStorage.getItem(key); } catch { /* Storage can be unavailable. */ }
  banner.hidden = saved === 'yes' || saved === 'no';
  if (saved === 'yes') enable();
  preferences.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button').focus();
  });
  banner.addEventListener('click', event => {
    const choice = event.target.closest('[data-choice]')?.dataset.choice;
    if (!choice) return;
    if (choice === 'yes') enable();
    else {
      allowed = false;
      window['ga-disable-' + GA_MEASUREMENT_ID] = true;
      gtag('consent', 'update', { analytics_storage: 'denied' });
      // Remove first-party GA cookies when permission is withdrawn.
      for (const entry of document.cookie.split(';')) {
        const name = entry.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        const expire = name + '=; Max-Age=0; path=/; SameSite=Lax';
        document.cookie = expire;
        const parts = location.hostname.split('.');
        for (let i = 0; i < parts.length - 1; i++) document.cookie = expire + '; domain=' + parts.slice(i).join('.');
      }
    }
    try { localStorage.setItem(key, choice); } catch { /* Keep the current-page choice. */ }
    banner.hidden = true;
    preferences.focus();
  });
  document.addEventListener('click', event => {
    if (!allowed) return;
    const link = event.target.closest('a');
    if (!link) return;
    let name;
    if (link.matches('[data-whatsapp]')) name = 'whatsapp_click';
    else if (link.getAttribute('href')?.startsWith('tel:')) name = 'phone_click';
    else if (link.href.startsWith('https://www.google.com/maps/dir/')) name = 'directions_click';
    if (name) gtag('event', name, { section: link.closest('section')?.id || (link.closest('header') ? 'header' : 'footer'), transport_type: 'beacon' });
  });
})();
