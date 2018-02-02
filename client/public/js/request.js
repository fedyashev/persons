export default class Request {

  static getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      return callback(this.status, JSON.parse(xhr.responseText));
    }
  }

  static post(url, obj, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      return callback(this.status, JSON.parse(xhr.responseText));
    }
  }

  static delete(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      return callback(this.status, xhr.responseText ? JSON.parse(xhr.responseText) : null);
    }
  }

}