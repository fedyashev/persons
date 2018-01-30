export default class ModalWindow {
  constructor(container, content) {
    this.container = container;
    this.content = content;
  }

  show() {
    let layout = document.createElement("div");
    layout.id = "modal-layout-id";

    let wnd = document.createElement("div");
    wnd.id = "window-id"

    let btnClose = document.createElement("a");
    btnClose.className = "btn-close";
    btnClose.onclick = () => layout.remove();

    wnd.appendChild(btnClose);
    wnd.appendChild(this.content);
    layout.appendChild(wnd);
    this.container.appendChild(layout);
  }
}