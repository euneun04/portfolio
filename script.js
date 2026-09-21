const year = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(contactForm).get("name");
    formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
    contactForm.reset();
  });
}
