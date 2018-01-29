// "use strict"
// import Context from "./context";

class Context {
  constructor(data, error) {
      this.data = data;
      this.error = error;
  };
};

var personId = 0;

window.onload = function() {
  btnAddId.onclick = btnAddOnclick;

  let table = document.querySelector("#persons-table");
  let context = getPesonsList();
  if (context.data) {
    populateContentTable(table, context.data);
  }
  else {
    alert(context.error);
  }
};

function getPesonsList() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "api/persons", false);
  xhr.send();
  if (xhr.status != 200) {
    return new Context(null, "Error");
  }
  else {
    return new Context(JSON.parse(xhr.responseText), null);
  }
}

function btnAddOnclick() {
  let layout = document.querySelector("#modal-widow-layout");
  if (!layout) {
    layout = document.createElement("div");
    document.body.appendChild(layout);
    layout.id = "modal-widow-layout";

    let window = document.createElement("div");
    layout.appendChild(window);
    window.id = "modal-window";

    let btnClose = document.createElement("a");
    btnClose.className = "btn-close"
    btnClose.onclick = () => document.querySelector("#modal-widow-layout").remove();
    window.appendChild(btnClose);

    window.appendChild(createAddPersonForm());
  }
}

function createAddPersonForm() {
  let form = document.createElement("form");
  form.id = "addPersonForm";
  form.name = "add-person-form";
  form.method = "POST";
  form.action = "/api/persons/";

  let formHeader = document.createElement("h1");
  form.appendChild(formHeader);
  formHeader.innerText = "Create a new person";
  formHeader.className = "form-header";

  form.appendChild(createFormTable());

  return form;
}

function createFormTable() {
  let table = document.createElement("table");
  table.className = "form-table";
  table.appendChild(createFormInputRow("text", "firstName", "firstNameId", "form-control", "First name", false));
  table.appendChild(createFormInputRow("text", "lastName", "lastNameId", "form-control", "Last name", false));
  table.appendChild(createFormInputRow("email", "email", "emailId", "form-control", "Email", false));
  table.appendChild(createFormInputRow("text", "phone", "phoneId", "form-control", "Phone", false));
  table.appendChild(createFormInputRow("text", "salary", "salaryId", "form-control", "Salary", false));
  table.appendChild(createFormButtonRow("button", "btnCreate", "btnCreateId", "btn btn-green", "Create", btnCreateOnclick));
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

function createFormButtonRow(type, name, id, className, innerText, handler) {
  let tr = document.createElement("tr");
  let tdButton = document.createElement("td");
  let button = createButton(type, name, id, className, innerText);
  button.onclick = handler;

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

function createTd(name, innerText) {
  let td = document.createElement("td");
  td.innerText = innerText;
  td.setAttribute("name", name);
  return td;
}

function btnCreateOnclick() {
  let xhr = new XMLHttpRequest();
  let formData = new FormData(document.forms.addPersonForm);
  let obj = {
    firstName: firstNameId.value,
    lastName: lastNameId.value,
    email: emailId.value,
    phone: phoneId.value,
    salary: salaryId.value,
    date: Date.now()
  };
  xhr.open("POST", "/api/persons/", false);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(JSON.stringify(obj));
  if (xhr.status == 201) {
    alert("Success!");
    let table = document.querySelector("#persons-table");
    table.querySelector(".table-body").innerText = "";
    populateContentTable(table, getPesonsList());
  }
  else {
    let context = JSON.parse(xhr.responseText);
    alert(context.error);
  }
}

// Population

function createTableRow(obj) {
  let tr = document.createElement("tr");
  tr.id = obj.id;
  
  tr.appendChild(createTd("id", obj.id));
  tr.appendChild(createTd("firstName", obj.firstName));
  tr.appendChild(createTd("lastName", obj.lastName));
  tr.appendChild(createTd("email", obj.email));
  tr.appendChild(createTd("phone", obj.phone));
  tr.appendChild(createTd("salary", obj.salary));
  tr.appendChild(createTd("date", obj.date));

  let tdButtonDelete = document.createElement("td");
  //let btnDelete = createButton("button", "btnDelete", "btnDeleteId", "btn btn-red", "X");
  let btnDelete = document.createElement("a");
  btnDelete.className = "btn-delete";
  btnDelete.innerText = " ";
  btnDelete.onclick = btnDeleteOnclick;

  tdButtonDelete.appendChild(btnDelete);
  tr.appendChild(tdButtonDelete);

  return tr;
}

function btnDeleteOnclick() {
  console.log(this.parentNode.parentNode.id);
}

// Potulate content table

function populateContentTable(table, context) {
  if (context.data) {
    context.data.forEach(obj => {
      obj.date = new Date(obj.date).toLocaleString();
      table.querySelector(".table-body").appendChild(createTableRow(obj));
    });
  }
}