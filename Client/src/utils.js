let url = "http://127.0.0.1:3000/";
// let url = "https://git.heroku.com/bodi-tic.git";
let globalRequestParameters = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

let compareName = function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

module.exports.globalRequestParameters = globalRequestParameters;
module.exports.url = url;
module.exports.compareName = compareName;
