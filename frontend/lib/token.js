import { getCookie, removeCookies } from 'cookies-next';

/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */

export function removeToken() {
  removeCookies('user')
}

/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
  const tokens = getCookie('user').tokens;
  return tokens.access_token;
}

export function getRefreshToken() {
  const tokens = getCookie('user').tokens;
  return tokens.refresh_token;
}
