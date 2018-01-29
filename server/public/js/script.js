var personId = 0;

window.onload = function() {
  btnAddId.onclick = btnAddOnclick;
};

function btnAddOnclick() {
  let addFormLayout = document.querySelector("#form-add-layout");
  if (!addFormLayout) {
    addFormLayout = document.createElement("div");
    document.querySelector("body").append(addFormLayout);
    addFormLayout.id = "form-add-layout";

    let addFormWindow = document.createElement("div");
    addFormLayout.append(addFormWindow);
    addFormWindow.id = "form-add-window";

    let form = document.createElement("form");
    addFormWindow.append(form);
    form.setAttribute("method", "POST");
    form.setAttribute("action", "#");

    let formHeader = document.createElement("h1");
    form.append(formHeader);
    formHeader.innerText = "Create a new person";
    formHeader.setAttribute("class", "form-header");

    let fnameInput = createInput("text", "firstName", "firstNameId", "form-control", "First name", false);
    form.append(fnameInput);

    let lnameInput = createInput("text", "lastName", "lastNameId", "form-control", "Last name", false);
    form.append(lnameInput);

    let emailInput = createInput("email", "email", "emailId", "form-control", "Email", false);
    form.append(emailInput);

    let phoneInput = createInput("text", "phone", "phoneId", "form-control", "Phone", false);
    form.append(phoneInput);

    let salaryInput = createInput("text", "salary", "salaryId", "form-control", "Salary", false);
    form.append(salaryInput);

    let btnCreate = createButton("btnCreate", "btnCreateId", "btn btn-green", "Create");
    form.append(btnCreate);
    btnCreate.onclick = btnCreateOnclick;

    let btnCancel = createButton("btnCancel", "btnCancelId", "btn btn-green", "Cancel");
    form.append(btnCancel);
    btnCancel.onclick = btnCancelOnclick;

  }
}

function createInput(type, name, id, className, placeholder, isRequired) {
  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.setAttribute("id", id);
  input.setAttribute("class", className);
  input.setAttribute("placeholder", placeholder);
  if (isRequired) input.setAttribute("required", "true");
  return input; 
}

function createButton(name, id, className, innerText) {
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("name", name);
  button.setAttribute("id", id);
  button.setAttribute("class", className);
  button.innerText = innerText;
  return button;
}

function btnCreateOnclick() {
  let obj = {
    id: ++personId,
    firstName: "test",
    lastName: "test",
    email: "test",
    phone: "test",
    salary: "test",
    date: Date.now()
  };

  let table = document.querySelector("#table-content");
  addTableRow(table, obj);
}

function btnCancelOnclick() {
  document.querySelector("#form-add-layout").remove();
}

// Population

function addTableRow(table, obj) {
  let tr = document.createElement("tr");
  
  tr.append(createTd("id", obj.id));
  tr.append(createTd("firstName", obj.firstName));
  tr.append(createTd("lastName", obj.lastName));
  tr.append(createTd("email", obj.email));
  tr.append(createTd("phone", obj.phone));
  tr.append(createTd("salary", obj.salary));
  tr.append(createTd("date", obj.date));

  table.querySelector("tbody").append(tr);
}

function createTd(name, innerText) {
  let td = document.createElement("td");
  td.innerText = innerText;
  td.setAttribute("name", name);
  return td;
}