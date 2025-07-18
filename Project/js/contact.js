// Run setup on page load
document.addEventListener("DOMContentLoaded", () => {
  setupContactForm(); // Form validation & submission
  setupSmoothScroll(); // Smooth anchor scrolling
  setupTagsClick(); // Tag click handling
});

// Set up contact form behavior
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll(".form-control");
  // Validate on input and blur
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateInputField(input));
    input.addEventListener("blur", () => validateInputField(input));
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    inputs.forEach((input) => {
      if (!validateInputField(input)) valid = false;
    });
    if (!valid) return;

    const btn = form.querySelector(".submit-btn");
    const orig = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    // Simulate send delay
    setTimeout(() => {
      form.reset();
      clearAllErrors(form);
      showFormMessage("Message sent!", "success");
      btn.textContent = orig;
      btn.disabled = false;
    }, 2000);
  });
}

// Validate a single input field
function validateInputField(input) {
  const { name, value } = input;
  let msg = "";

  if (name === "name" && value.trim().length < 2) msg = "Min 2 chars";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    msg = "Invalid email";
  if (name === "subject" && value.trim().length < 3) msg = "Min 3 chars";
  if (name === "message" && value.trim().length < 10) msg = "Min 10 chars";

  const group = input.closest(".form-group");
  let err = group.querySelector(".error-msg");
  if (!err) {
    err = document.createElement("small");
    err.className = "error-msg";
    err.style.color = "red";
    err.style.display = "block";
    err.style.marginTop = "5px";
    group.appendChild(err);
  }

  err.textContent = msg;
  return !msg;
}

// Clear all error messages in form
function clearAllErrors(form) {
  form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
}

// Show a temporary popup message
function showFormMessage(text, type = "success") {
  const box = document.createElement("div");
  box.textContent = text;
  Object.assign(box.style, {
    position: "fixed",
    top: "5%",
    right: "5%",
    zIndex: "9999",
    background: type === "success" ? "#28a745" : "#dc3545",
    color: "#fff",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 0.5rem rgba(0,0,0,0.15)",
  });
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

// Enable smooth scroll for in-page links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tgt = document.getElementById(link.hash.slice(1));
      if (tgt) tgt.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Alert on tag clicks
function setupTagsClick() {
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Clicked: " + tag.textContent);
    });
  });
}
