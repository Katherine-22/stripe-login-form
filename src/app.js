const formWrapper = document.querySelector(".right_column_wrapper");
const logo = document.querySelector(".logo");
const footer = document.querySelector(".footer");
const valuesContainer = document.querySelector(".left_column");
const form = document.querySelector("form");

const passwordContainer = document.querySelector(".password_field");
const passwordInput = document.querySelector("#user_password");
const fullName = document.querySelector("#user_name");

const submitBtn = document.querySelector(".btn_submit");

window.addEventListener("resize", () => {
  if (window.innerWidth <= 900) {
    formWrapper.appendChild(footer);
    formWrapper.prepend(logo);
  } else {
    valuesContainer.appendChild(footer);
    valuesContainer.prepend(logo);
  }
});

// Password events
let passValid = false;
const passwordPattern = /.{10,}/;

const msg = document.querySelector(".pass_msg");

const clue = document.createElement("p");
clue.innerHTML =
  "Your password needs to be at least 10 characters. Include multiple words and phrases to make it more secure.";

const error = document.createElement("p");
error.innerHTML =
  "<img src='img/warning_sign.svg'/> Your password is not strong enough. Your password must be at least 10 characters.";

const success = document.createElement("p");
success.innerHTML =
  "<img src='img/success.svg'/> Nice work. Your password is good.";

passwordInput.addEventListener("focus", () => {
  if (passwordInput.value.length === 0 || passwordInput.value.length < 10) {
    msg.innerHTML = "";
    msg.appendChild(clue);
    passwordContainer.classList.remove("error");
  }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length >= 10) {
    validatePass(passwordInput);
  } else {
    msg.innerHTML = "";
    msg.appendChild(clue);
    passwordContainer.classList.remove("error");
    passValid = false;
    isFormValid();
  }
});

passwordInput.addEventListener("blur", () => {
  if (passwordInput.value.length === 0) msg.innerHTML = "";
  else {
    validatePass(passwordInput);
  }
});

function validatePass(userInput) {
  if (passwordPattern.test(userInput.value) === false) {
    msg.replaceChild(error, msg.childNodes[0]);
    passwordContainer.classList.add("error");
  } else {
    msg.replaceChild(success, msg.childNodes[0]);
    passwordContainer.classList.remove("error");
    passValid = true;
    isFormValid();
  }
}

//Email validation
const userEmail = document.querySelector("#email");
const emailError = document.querySelector(".email_error");
const emailField = document.querySelector(".email_field");

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
let emailValid = false;

userEmail.addEventListener("change", () => {
  if (emailPattern.test(userEmail.value) === false)
    emailField.classList.add("error");
  else {
    emailField.classList.remove("error");
    emailValid = true;
  }
});

userEmail.addEventListener("input", () => {
  emailValid = emailPattern.test(userEmail.value);
  isFormValid();
});

userEmail.addEventListener("focus", () => {
  emailField.classList.remove("error");
  emailValid = emailPattern.test(userEmail.value);
  isFormValid();
});

//Check if user agrees with the terms
const agreeCheckbox = document.querySelector("#policy_agree");

agreeCheckbox.addEventListener("change", () => {
  isFormValid();
  console.log(agreeCheckbox.checked);
});

fullName.addEventListener("input", isFormValid);
//checking the form completion

function isFormValid() {
  // let emailValid = emailPattern.test(userEmail.value);
  let nameValid = fullName.value.trim().length > 0;
  let checkBoxValid = agreeCheckbox.checked;

  if (emailValid && nameValid && passValid && checkBoxValid) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.add("active");
  } else {
    submitBtn.setAttribute("disabled", "disabled");
    submitBtn.classList.remove("active");
  }
}

// Country selection area
const selectedElem = document.querySelector(".selected_element"); //button displaying chosen country
const listBox = document.querySelector(".countries"); //div with search input and ul with countries
const options = document.querySelector(".options"); // ul with countries
const liCountries = document.querySelectorAll(".options li"); //array with all countries
const inputCountry = document.querySelector("#country"); //hidden input for a country
const userCountry = document.querySelector(".user_country"); // div with chosen country and svg
let searchInp = document.querySelector(".search_country"); // input field for searching a country

selectedElem.addEventListener("click", (e) => {
  e.preventDefault();
  listBox.classList.toggle("open_select");
});

document.onclick = function (event) {
  if (!listBox.contains(event.target) && !selectedElem.contains(event.target)) {
    listBox.classList.remove("open_select");
  }
};

inputCountry.value = liCountries[0].textContent.trim();

liCountries.forEach((country) => {
  country.addEventListener("click", () => {
    inputCountry.value = country.innerText;

    let newLi = country.cloneNode(true);

    selectedElem.replaceChild(newLi, selectedElem.children[0]);
    listBox.classList.remove("open_select");
  });
});

searchInp.addEventListener("keyup", () => {
  let searchVal = searchInp.value.toLowerCase();
  let arr = [...liCountries];
  let result = arr.filter((item) => {
    return item.innerText.toLowerCase().startsWith(searchVal);
  });
  console.dir(result[0]);

  options.innerHTML = "";
  result.forEach((item) => {
    options.append(item);
  });
});

selectedElem.addEventListener("click", () => {
  searchInp.value = "";
  searchInp.focus();
  liCountries.forEach((country) => {
    options.append(country);
  });
});
