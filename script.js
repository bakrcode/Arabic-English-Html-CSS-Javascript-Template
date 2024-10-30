// const langMenu = document.querySelector('.lang-menu');

// // console.log(langList)
// const langListItems = langList.querySelectorAll('li');
// // console.log(langListItems)

// langList.addEventListener('click', (e)=>{

//     if(e.target.classList.contains('lang-item')){

//         selectedLang.textContent = e.target.textContent;

//         selectedLangImg.src = e.target.querySelector('img').src;
//         }
//         console.log(e.target.classList)
// })

import { translations } from "./translations.js";

const menu = document.querySelector(".toggle-menu");
const menuUl = document.querySelector(".menu-ul");

const langMenu = document.querySelector(".lang-menu");
const langList = document.querySelector(".lang-options");

const langOptions = langMenu.querySelectorAll(".lang-option");

const currentLang = document.querySelector(".current-lang");
const currentLangImg = document.querySelector(".current-lang-img");

menu.addEventListener("click", () => {
  menuUl.classList.toggle("show-menu");
});

langMenu.addEventListener("click", () => {
  langList.classList.toggle("show");
});

const setLanguage = (language) => {
  if (language == "ar") {
    updateLanguage(language);
    document.body.dir = "rtl";
  } else if (language == "en") {
    updateLanguage(language);
    document.body.dir = "ltr";
  }
};

langOptions.forEach((langOption) => {
  langOption.addEventListener("click", () => {
    let selectedLang = langOption.querySelector(".lang-text").innerText;
    let selectedLangImg = langOption.querySelector("img").src;
    currentLang.textContent = selectedLang;
    currentLangImg.src = selectedLangImg;

    let languageValue = langOption
      .querySelector(".lang-text")
      .getAttribute("value");

    setLanguage(languageValue);
  });
});

function updateLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    if (!element.placeholder) {
      const key = element.dataset.translate;
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    }
  });

  document.querySelectorAll("[placeholder]").forEach((element) => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
}

// Initialize with arabic
setLanguage("ar");

// emailjs

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "ZzfIFGUbZIsMhpPGc",
  });
})();

const msg = document.querySelector(".form-message");

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      // these IDs from the previous steps
      emailjs.sendForm("service_w9enr0v", "template_go3xq7q", this).then(
        function () {
          document.getElementById("contact-form").reset();
          document.querySelector(".loader").classList.remove("show");

          msg.innerHTML = "";
          msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
          msg.classList.add("show");
          setTimeout(() => msg.classList.remove("show"), 2000);
        },
        function (error) {
          document.querySelector(".loader").classList.toggle("show");
          msg.classList.add("show");
          msg.innerHTML = "<span class='error-msg''>Email not Sent</span>";
        }
      );
    });
};
