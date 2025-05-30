document.addEventListener("DOMContentLoaded", function () {
  // Initialize navbar toggler
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });
  }

  // Animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const fadeInObserver = new IntersectionObserver(function (
    entries,
    fadeInObserver
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  fadeInOptions);

  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    fadeInObserver.observe(element);
  });
});
