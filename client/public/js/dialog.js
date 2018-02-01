export class Dialog {
  constructor(container) {
    this.container = container;
    this.layout = document.createElement("div");
    this.wnd = document.createElement("div");
    this.btnClose = document.createElement("a");
    this.isShowed = false;
  }

  get Layout() {return this.layout};
  get Window() {return this.wnd;}
  get IsShowed() {return this.isShowed;}
  set IsShowed(isShowed) {this.isShowed = isShowed;}

  initComponents() {
    this.btnClose.className = "btn-close";
    this.btnClose.onclick = () => this.close();

    this.wnd.appendChild(this.btnClose);
    this.layout.appendChild(this.wnd);
  }

  show() {
    if (this.isShowed) return;
    this.container.appendChild(this.layout);
    this.isShowed = true;
  }

  close() {
    this.layout.remove();
  }
};

export class FlashMessage extends Dialog  {
  constructor(container) {
    super(container);
    this.text = document.createElement("p");
    this.initComponents();
  }

  initComponents() {
    super.initComponents();
    super.Layout.className = "flash-message-layout";
    super.Window.className = "flash-message-window";

    super.Window.appendChild(this.text);
  }

  showMessage(text, isSuccess) {
    if (super.IsShowed) return;
    this.text.innerText = text;
    if (isSuccess) {
      super.Window.className += " flash-message-success";
    }
    else {
      super.Window.className += " flash-message-warning"
    }
    super.show();
    super.IsShowed = true;
  }
}


export function SuccessFlashMessage(container, text) {
  let flash = new FlashMessage(container);
  flash.showMessage(text, true);
}

export function FailFlashMessage(container, text) {
  let flash = new FlashMessage(container);
  flash.showMessage(text, false);
}

export class CreatePersonDialog extends Dialog {
  constructor(container, btnCreateOnclickHandler) {
    super(container);
    this.form = document.createElement("form");
    this.handler = btnCreateOnclickHandler;;
    this.initComponents();
  }

  initComponents() {
    super.initComponents();
    super.Layout.className = "create-person-dialog-layout";
    super.Window.className = "create-person-dialog-window";
    super.Window.appendChild(this.form);

    this.form.id = "createPersonFormId";
    this.form.name = "createPersonForm";

    let formHeader = document.createElement("h1");
    formHeader.innerText = "Create a new person";
    formHeader.className = "form-header";

    let formTable = createFormTable();

    this.form.appendChild(formHeader);
    this.form.appendChild(formTable);

    let btn = this.form.querySelector("#btnCreateId");
    btn.onclick = this.handler;
  }

  getObject() {
    return {
      firstName: firstNameId.value,
      lastName: lastNameId.value,
      email: emailId.value,
      phone: phoneId.value,
      salary: salaryId.value,
    }
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////

function createFormTable() {
  let table = document.createElement("table");
  table.className = "form-table";
  table.appendChild(createFormInputRow("text", "firstName", "firstNameId", "form-control", "First name", false));
  table.appendChild(createFormInputRow("text", "lastName", "lastNameId", "form-control", "Last name", false));
  table.appendChild(createFormInputRow("email", "email", "emailId", "form-control", "Email", false));
  table.appendChild(createFormInputRow("text", "phone", "phoneId", "form-control", "Phone", false));
  table.appendChild(createFormInputRow("text", "salary", "salaryId", "form-control", "Salary", false));
  table.appendChild(createFormButtonRow("button", "btnCreate", "btnCreateId", "btn btn-green", "Create"));
  return table;
}

function createFormInputRow(type, name, id, className, placeholder, isRequired) {
  let tr = document.createElement("tr");
  let tdLabel = document.createElement("td");
  let tdInput = document.createElement("td");
  let label = document.createElement("label");
  let input = document.createElement("input");

  label.htmlFor = id;
  label.className = "form-label";
  label.innerText = placeholder;

  input.type = type;
  input.name = name;
  input.className = className;
  input.id = id;
  input.placeholder = placeholder;
  input.required = isRequired;

  tdLabel.appendChild(label);
  tdInput.appendChild(input);
  tr.appendChild(tdLabel);
  tr.appendChild(tdInput);

  return tr;
}

function createFormButtonRow(type, name, id, className, innerText) {
  let tr = document.createElement("tr");
  let tdButton = document.createElement("td");
  let button = createButton(type, name, id, className, innerText);

  tdButton.appendChild(button);
  tr.appendChild(tdButton);

  return tr;
}

function createButton(type, name, id, className, innerText) {
  let button = document.createElement("button");
  button.type = type;
  button.name = name;
  button.id = id;
  button.className = className;
  button.innerText = innerText;
  return button;
}