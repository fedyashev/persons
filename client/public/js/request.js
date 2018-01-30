export default class Request {

  constructor() {}

  GetJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      return callback(this.status, JSON.parse(xhr.responseText));
    }
  }
}

