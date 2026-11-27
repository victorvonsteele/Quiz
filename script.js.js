const themeToggle = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll("#skill-filters button");
const skillItems = document.querySelectorAll("#skills-list li");
const hobbyCards = document.querySelectorAll(".hobby-card");
const hobbyDetail = document.getElementById("hobby-detail");
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    skillItems.forEach((item) => {
      const category = item.dataset.category;
      const shouldShow = selectedFilter === "all" || category === selectedFilter;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

if (filterButtons.length > 0) {
  filterButtons[0].classList.add("active");
}

hobbyCards.forEach((card) => {
  card.addEventListener("click", () => {
    hobbyCards.forEach((otherCard) => otherCard.classList.remove("active"));
    card.classList.add("active");
    hobbyDetail.textContent = card.dataset.detail;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formFeedback.textContent = "Fill out your name, email, and message first.";
    return;
  }

  if (!emailPattern.test(email)) {
    formFeedback.textContent = "Enter a valid email address.";
    return;
  }

  formFeedback.textContent = `Message ready for ${name} (${email}).`;
  contactForm.reset();
  hobbyCards.forEach((card) => card.classList.remove("active"));
});