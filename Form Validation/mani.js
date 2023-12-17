// Element selection
const form = document.getElementById("myform"),
 passwordInput = document.getElementById("password"),
 passTogglebtn = document.getElementById("pass-toggle-btn"),
 thankYouMessage = document.querySelector(".thank-you-content");

// Error handling function
// Updated error handling function
const showError = (field, errorText) => {
  // Remove existing error elements for the given field
  const formGroup = field.closest(".form-group");
  formGroup.classList.remove("error");
  const existingErrorElements = formGroup.querySelectorAll(".error-text");
  existingErrorElements.forEach((error) => error.remove());

  // Display the new error
  field.classList.add("error");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  formGroup.appendChild(errorElement);
};


// Password strength check
const checkPasswordStrength = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

// Validate password
const validatePassword = (password) => {
  if (password === "") {
    showError(passwordInput, "Enter the password");
  } else if (!checkPasswordStrength(password)) {
    showError(
      passwordInput,
      "Please enter at least 8 characters with uppercase letters and special characters."
    );
  }
};

// Form data handling
const handleFormData = (e) => {
  e.preventDefault();
  const [fullnameInput, emailInput, dateInput, genderInput] = [
    "fullname",
    "email",
    "date",
    "gender",
  ].map((id) => document.getElementById(id));

  const [fullname, email, data, gender] = [
    fullnameInput,
    emailInput,
    dateInput,
    genderInput,
  ].map((input) => input.value.trim());

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  document
    .querySelectorAll(".form-group.error")
    .forEach((input) => input.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((error) => error.remove());

  if (fullname === "") showError(fullnameInput, "Enter the full name");
  if (!emailPattern.test(email))
    showError(emailInput, "Enter a valid email address");
  validatePassword(data);
  if (data === "") showError(dateInput, "Select your date of birth");
  if (gender === "") showError(genderInput, "Select your gender");

  if (!document.querySelectorAll(".form-group.error").length) {
    form.style.display = "none";
    thankYouMessage.style.display = "block";
  }
};

// Toggle password visibility
passTogglebtn.addEventListener("click", () => {
  passTogglebtn.className =
    passwordInput.type === "password"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});

// Form submission event handling
form.addEventListener("submit", handleFormData);
