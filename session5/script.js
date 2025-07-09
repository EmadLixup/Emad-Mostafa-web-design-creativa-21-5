var form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var FirstName = form.querySelector('input[placeholder="First name"]');
  var Email = form.querySelector('input[placeholder="Email"]');
  var Password = form.querySelector('input[placeholder="Password"]');

  var firstName = FirstName.value.trim();
  var email = Email.value.trim();
  var password = Password.value.trim();

  var tableBody = document.querySelector("table tbody");

  var newTr = document.createElement("tr");
  newTr.innerHTML = `
                <td>${firstName}</td>
                <td>${email}</td>
                <td>${password}</td>
            `;

  var newTd = document.createElement("td");

  var editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-success", "btn-sm", "me-2");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    FirstName.value = firstName;
    Email.value = email;
    Password.value = password;
  });

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn-sm");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    newTr.remove();
  });

  newTd.appendChild(editButton);
  newTd.appendChild(deleteButton);

  newTr.appendChild(newTd);

  tableBody.appendChild(newTr);

  form.reset();
});

function count(startCount, endCount, speed, countId) {
  var start = startCount;
  var counts = setInterval(updated, speed);

  function updated() {
    var count = document.getElementById(countId);
    count.innerHTML = ++start;
    if (start === endCount) {
      clearInterval(counts);
    }
  }
}
count(0, 8000, 0.00000001, "counter1");
count(0, 810, 50, "counter2");
count(0, 2000, 1, "counter3");
count(0, 20, 150, "counter4");
