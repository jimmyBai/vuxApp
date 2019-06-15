function computedClientHeight() {
  return document.documentElement.clientHeight - 50 + 'px';
}
function setSession(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}
function getSession(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

export default {
  computedClientHeight,
  setSession,
  getSession
}