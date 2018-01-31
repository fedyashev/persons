"use strict"
// import Context from "./context";
import ModalWindow from "./modal-window.js";
import Request from "./request.js";
import { FlashMessage, CreatePersonDialog } from "./dialog.js";

class Context {
  constructor(data, isSuccess) {
      this.data = data;
      this.isSuccess = isSuccess;
  };
};

window.onload = function() {
  btnAddId.onclick = btnAddOnclick;
  let table = document.querySelector("#persons-table");
  let req = new Request();
  req.GetJSON("/api/persons", function(status, data) {
    if (status == 200) {
      populateContentTable(table, data);
    }
    else {
      alert(context.data);
    }
  });
};

/*
  Server interaction
*/

// Get persons list from server
// function getPersons() {
//   // let xhr = new XMLHttpRequest();
//   // xhr.open("GET", "/api/persons", false);
//   // xhr.send();
//   // if (xhr.status == 200) {
//   //   return new Context(JSON.parse(xhr.responseText), true);
//   // }
//   // else {
//   //   return new Context("Can't get persons.", false);
//   // }
//   let req = new Request();
//   return req.GetJSON("/api/persons", function(status, data) {
//     console.log(data);
//     if (status == 200) {
//       return new Context(data, true);
//     }
//     else {
//       return new Context("Can't get persons.", false);
//     }
//   });
// }

// Create a new person 
function postPerson(obj) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/persons/", false);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(JSON.stringify(obj));
  let context = JSON.parse(xhr.responseText);
  if (xhr.status == 201) {
    return new Context(context.data, true);
  }
  else {
    return new Context(context.data, false);
  }
}

function updatePerson(obj) {

}

function deletePerson(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `/api/persons/${id}`, false);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send();
  //let context = JSON.parse(xhr.responseText);
  if (xhr.status == 204) {
    return new Context("Deleted", true);
  }
  else {
    return new Context(`Can't delete person by id=${id}`, false);
  }
}

/*
  Buttons events handlers
*/

function btnAddOnclick() {
  //let createPersonDialog = new ModalWindow(document.body, createAddPersonForm());
  //createPersonDialog.show();
  let dlg = new CreatePersonDialog(document.body, btnCreateOnclick);
  dlg.show();
}

function btnCreateOnclick() {
  let obj = {
    firstName: firstNameId.value,
    lastName: lastNameId.value,
    email: emailId.value,
    phone: phoneId.value,
    salary: salaryId.value,
    date: Date.now()
  };
  let context = postPerson(obj);
  if (context.isSuccess) {
    alert("Success");
    context.data.date = new Date(context.data.date).toLocaleString();
    document.querySelector("#persons-table .table-body").appendChild(createTableRow(context.data));
  }
  else {
    alert(context.data);
  }
}

function btnDeleteOnclick() {
  let tr = this.parentNode.parentNode
  let id = tr.getAttribute("data-id");
  let context = deletePerson(id);
  if (context.isSuccess) {
    alert("Success");
    tr.remove();
  }
  else {
    alert(context.data);
  }
}

///////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createTd(name, innerText) {
  let td = document.createElement("td");
  td.innerText = innerText;
  td.setAttribute("name", name);
  return td;
}

function createTableRow(obj) {
  let tr = document.createElement("tr");
  tr.setAttribute("data-id", obj.id);
  
  tr.appendChild(createTd("id", obj.id));
  tr.appendChild(createTd("firstName", obj.firstName));
  tr.appendChild(createTd("lastName", obj.lastName));
  tr.appendChild(createTd("email", obj.email));
  tr.appendChild(createTd("phone", obj.phone));
  tr.appendChild(createTd("salary", obj.salary));
  tr.appendChild(createTd("date", obj.date));

  let tdButtonDelete = document.createElement("td");
  let btnDelete = document.createElement("a");
  btnDelete.className = "btn-delete";
  btnDelete.innerText = " ";
  btnDelete.title = "Delete";
  btnDelete.onclick = btnDeleteOnclick;

  tdButtonDelete.appendChild(btnDelete);
  tr.appendChild(tdButtonDelete);

  return tr;
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