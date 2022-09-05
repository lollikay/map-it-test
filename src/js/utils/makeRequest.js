export async function makeRequest(cfg) {
  let timer = null;
  const { urlPrefix = "", timeout = 7500, method = "GET", mode = "cors", signal = null, data = null, type = "json", url = window.location.href, headers = { "X-Requested-With": "XMLHttpRequest" } } = cfg;
  const body = (typeof method === "string" && method.toUpperCase() === "POST") ? data : null;
  const getReject = (reason) => Promise.reject(reason);
  const setTimer = (callback) => {
    timer = setTimeout(() => callback(408), timeout);
    return timer;
  };
  const setURL = () => {
    let queryUrl = url;
    if(urlPrefix) {
      try {
        queryUrl = new URL(queryUrl, urlPrefix);
      } catch {
        console.debug("Can't parse URL for request: ", urlPrefix, url);
      }
    }
    return queryUrl;
  }
  const getResponse = async (resp) => {
    clearTimeout(timer);
    const { ok, status } = resp;
    return await (ok) ? (type === "json") ? resp.json() : resp.text() : getReject(status);
  };
  const query = fetch(setURL(), { method, body, mode, signal, headers });
  const queries = [ query ];
  if(timeout) {
    const wait = new Promise((_, reject) => setTimer(reject));
    queries.push(wait);
  }
  return await Promise.race(queries).then(resp => getResponse(resp), reject => getReject(reject));
}