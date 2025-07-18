// Counter animation: animates numbers when scrolled into view
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-number");

  const animate = (counter) => {
    const target = +counter.dataset.target;
    const step = Math.ceil(target / 200);
    const update = () => {
      let curr = +counter.innerText;
      if (curr < target) {
        counter.innerText = Math.min(curr + step, target);
        requestAnimationFrame(update);
      }
    };
    update();
  };

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => obs.observe(c));
});

// Portfolio filter: show/hide cards by category
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const items = document.querySelectorAll(".tab-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      const cat = tab.dataset.category;
      items.forEach((item) =>
        item.classList.toggle(
          "show",
          cat === "all" || item.classList.contains(cat)
        )
      );
    });
  });

  // Show initial state
  document.querySelector(".tab-btn.active-tab").click();
});

// Back-to-top button: show on scroll and smooth-scroll to top
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () =>
    btn.classList.toggle("show", window.scrollY > 200)
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
});

// price toggle
document.addEventListener("DOMContentLoaded", () => {
  const monthBtn = document.getElementById("toggleMonth").parentElement;
  const yearBtn = document.getElementById("toggleYear").parentElement;
  const amounts = document.querySelectorAll(".price-amount");
  const cards = document.querySelectorAll(".pricing-card");

  function updateBilling(isYearly) {
    amounts.forEach((el) => {
      el.textContent = isYearly ? el.dataset.year : el.dataset.month;
    });
    monthBtn.classList.toggle("active", !isYearly);
    yearBtn.classList.toggle("active", isYearly);
    cards.forEach((c, i) => c.classList.toggle("active", !isYearly && i === 1));
  }

  monthBtn.addEventListener("click", () => updateBilling(false));
  yearBtn.addEventListener("click", () => updateBilling(true));

  updateBilling(false);
});
