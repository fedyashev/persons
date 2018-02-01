"use strict"

import Request from "./request.js";

import {
  FlashMessage,
  CreatePersonDialog,
  SuccessFlashMessage,
  FailFlashMessage
} from "./dialog.js";

window.onload = function() {
  btnAddId.onclick = btnAddOnclick;
  let table = document.querySelector("#persons-table");
  Request.getJSON("/api/persons", function(status, response) {
    if (status == 200) {
      populateContentTable(table, response);
    }
    else {
      FailFlashMessage(response.data);
    }
  });
};

function updatePerson(obj) {

}

///////////////////////////////////////////////////////////////////////////////////////////////////

function btnAddOnclick() {
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
  Request.post("/api/persons/", obj, function(status, response) {
    if (status == 201) {
      SuccessFlashMessage(document.body, "New person created.");
      response.data.date = new Date(response.data.date).toLocaleString();
      document.querySelector("#persons-table .table-body").appendChild(createTableRow(response.data));
    }
    else {
      FailFlashMessage(document.body, response.data);
    }
  });
}

function btnDeleteOnclick() {
  let tr = this.parentNode.parentNode
  let id = tr.getAttribute("data-id");
  Request.delete(`/api/persons/${id}`, function(status, response) {
    if (status == 204) {
      SuccessFlashMessage(document.body, `Person with ${id} was deleted.`);
      tr.remove();
    }
    else {
      FailFlashMessage(document.body, response.data);
    }
  });
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