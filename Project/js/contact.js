document.addEventListener("DOMContentLoaded", function () {
  setupContactForm();
  setupSmoothScroll();
  setupTagsClick();
});

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll(".form-control");

  inputs.forEach((input) => {
    input.addEventListener("input", () => validateInputField(input));
    input.addEventListener("blur", () => validateInputField(input));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      const valid = validateInputField(input);
      if (!valid) isValid = false;
    });

    if (!isValid) return;

    const submitButton = form.querySelector(".submit-btn");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      form.reset();
      clearAllErrors(form);
      showFormMessage("Message sent successfully!", "success");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

function validateInputField(input) {
  const name = input.name;
  const value = input.value.trim();
  let message = "";

  if (name === "name" && value.length < 2) {
    message = "Name must be at least 2 characters.";
  }

  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Enter a valid email address.";
  }

  if (name === "subject" && value.length < 3) {
    message = "Subject must be at least 3 characters.";
  }

  if (name === "message" && value.length < 10) {
    message = "Message must be at least 10 characters.";
  }

  const group = input.closest(".form-group");
  let errorEl = group.querySelector(".error-msg");

  if (!errorEl) {
    errorEl = document.createElement("small");
    errorEl.className = "error-msg";
    errorEl.style.color = "red";
    errorEl.style.display = "block";
    errorEl.style.marginTop = "5px";
    group.appendChild(errorEl);
  }

  if (message) {
    errorEl.textContent = message;
    return false;
  } else {
    errorEl.textContent = "";
    return true;
  }
}

function clearAllErrors(form) {
  const errorEls = form.querySelectorAll(".error-msg");
  errorEls.forEach((el) => (el.textContent = ""));
}

function showFormMessage(message, type = "success") {
  const msgBox = document.createElement("div");
  msgBox.textContent = message;
  msgBox.style.position = "fixed";
  msgBox.style.top = "5%";
  msgBox.style.right = "5%";
  msgBox.style.zIndex = "9999";
  msgBox.style.background = type === "success" ? "#28a745" : "#dc3545";
  msgBox.style.color = "#fff";
  msgBox.style.padding = "2% 3%";
  msgBox.style.borderRadius = "5px";
  msgBox.style.maxWidth = "40%";
  msgBox.style.boxShadow = "0 0.5% 2% rgba(0,0,0,0.15)";
  msgBox.style.fontSize = "1rem";

  document.body.appendChild(msgBox);

  setTimeout(() => msgBox.remove(), 5000);
}

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById(
        link.getAttribute("href").slice(1)
      );
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function setupTagsClick() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      e.preventDefault();
      alert("You clicked on the tag: " + tag.textContent);
    });
  });
}
