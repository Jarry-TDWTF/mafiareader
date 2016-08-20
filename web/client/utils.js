
export const getAbsoluteUrl = function(url) {
  if(!isAbsoluteUrl(url)) {
    return 'https://what.thedailywtf.com/' + url;
  }
  return url;
};

function isAbsoluteUrl(url) {
  var pat = /^https?:\/\/|^\/\//i;
  return pat.test(url)
}

export const getThreadColor = function(tid) {
  const colors = ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"];
  return colors[tid & 0b111];
};