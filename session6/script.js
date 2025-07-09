var form = document.querySelector("form");

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function Table() {
  var tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";
  var users = getUsers();
  users.forEach((user, index) => {
    var newTr = document.createElement("tr");
    newTr.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
    `;

    var newTd = document.createElement("td");

    var editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-success", "btn-sm", "me-2");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      form.querySelector('input[placeholder="First name"]').value =
        user.firstName;
      form.querySelector('input[placeholder="Email"]').value = user.email;
      form.querySelector('input[placeholder="Password"]').value = user.password;
      form.setAttribute("data-edit-index", index);
    });

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      users.splice(index, 1);
      setUsers(users);
      Table();
    });

    newTd.appendChild(editButton);
    newTd.appendChild(deleteButton);
    newTr.appendChild(newTd);
    tableBody.appendChild(newTr);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var FirstName = form.querySelector('input[placeholder="First name"]');
  var Email = form.querySelector('input[placeholder="Email"]');
  var Password = form.querySelector('input[placeholder="Password"]');

  var firstName = FirstName.value.trim();
  var email = Email.value.trim();
  var password = Password.value.trim();

  var users = getUsers();
  var editIndex = form.getAttribute("data-edit-index");

  if (editIndex !== null) {
    users[editIndex] = { firstName, email, password };
    form.removeAttribute("data-edit-index");
  } else {
    users.push({ firstName, email, password });
  }

  setUsers(users);
  Table();
  form.reset();
});

Table();

function animateCounter(startValue, endValue, duration, elementId) {
  const element = document.getElementById(elementId);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1
    const value = Math.floor(startValue + (endValue - startValue) * progress);
    element.innerHTML = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const duration = 2000; // 2 seconds

animateCounter(0, 8000, duration, "counter1");
animateCounter(0, 810, duration, "counter2");
animateCounter(0, 2000, duration, "counter3");
animateCounter(0, 20, duration, "counter4");
