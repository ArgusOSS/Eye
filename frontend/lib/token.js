/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */
export function removeToken() {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");

  window.sessionStorage.removeItem("refresh_token");
  window.sessionStorage.removeItem("access_token");
  window.sessionStorage.removeItem("name");
  window.sessionStorage.removeItem("size");
}

/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
  const access_token = window.localStorage.getItem("access_token") || window.sessionStorage.getItem("access_token");
  return access_token;
}

export function getRefreshToken() {
  const refresh_token = window.localStorage.getItem("refresh_token") || window.sessionStorage.getItem("refresh_token");
  return refresh_token;
}
