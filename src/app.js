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
