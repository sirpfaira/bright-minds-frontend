const API_URL = "https://localhost:7289/api"; // Replace with your actual API URL

document.addEventListener("DOMContentLoaded", function () {
  // Animate hero shapes
  const heroShapes = document.querySelectorAll(".hero-shape");

  heroShapes.forEach((shape) => {
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;

    shape.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${xPos}px, ${yPos}px)` },
        { transform: "translate(0, 0)" },
      ],
      {
        duration: Math.random() * 3000 + 5000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
  });

  // Gallery functionality
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const prevButton = document.querySelector(".gallery-prev");
  const nextButton = document.querySelector(".gallery-next");
  const galleryDotsContainer = document.querySelector(".gallery-dots");

  if (gallerySlides.length > 0) {
    let currentSlide = 0;

    // Create dots for each slide
    gallerySlides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("gallery-dot");
      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        showSlide(index);
      });

      if (galleryDotsContainer) {
        galleryDotsContainer.appendChild(dot);
      }
    });

    const galleryDots = document.querySelectorAll(".gallery-dot");

    // Show specific slide
    function showSlide(index) {
      // Hide all slides
      gallerySlides.forEach((slide) => {
        slide.classList.remove("active");
      });

      // Remove active class from all dots
      galleryDots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show selected slide
      gallerySlides[index].classList.add("active");
      galleryDots[index].classList.add("active");

      currentSlide = index;
    }

    // Navigate to previous slide
    function prevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
        prevIndex = gallerySlides.length - 1;
      }
      showSlide(prevIndex);
    }

    // Navigate to next slide
    function nextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= gallerySlides.length) {
        nextIndex = 0;
      }
      showSlide(nextIndex);
    }

    // Add button event listeners
    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Show first slide
    showSlide(0);

    // Add keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });
  }

  // Load Testimonials from API
  loadTestimonials();
});

async function loadTestimonials() {
  try {
    const response = await fetch(`${API_URL}/Testimonials`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Testimonials data loaded:", data);

    const testimonialsContainer = document.getElementById(
      "testimonials-container"
    );
    if (!testimonialsContainer) {
      throw new Error(`Element with id 'testimonials-container' not found`);
    }

    testimonialsContainer.innerHTML = ""; // Clear previous content

    data.forEach((item, index) => {
      const testimonialDiv = document.createElement("div");
      testimonialDiv.id = `testimonial-${index}`;
      testimonialDiv.className = "col-md-4 mb-4";
      testimonialDiv.innerHTML = `
              <div class="testimonial-card fade-in">
                <div class="testimonial-content">
                  <p>
                    ${item.message}
                  </p>
                </div>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">${item.name
                    .match(/(\b\S)?/g)
                    .join("")
                    .match(/(^\S|\S$)?/g)
                    .join("")
                    .toUpperCase()}
					</div>
                  <div class="testimonial-name-container">
                    <h5 class="testimonial-name">${item.name}</h5>
                    <p class="testimonial-role">${item.designation}</p>
                  </div>
                </div>
              </div>
             `;
      testimonialsContainer.appendChild(testimonialDiv);
    });
  } catch (error) {
    const testimonialsContainer = document.getElementById(
      "testimonials-container"
    );
    testimonialsContainer.innerHTML = `<p class='error'>Error loading testimonials: ${error.message}</p>`;
  }
}
