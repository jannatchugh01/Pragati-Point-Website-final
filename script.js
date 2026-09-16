/* =========================================================
   PRAGATI POINT COACHING CLASSES
   Main JavaScript
   ========================================================= */

const CONFIG = {
  email: "tanejajyoti884@gmail.com",

  // Add the tuition phone/WhatsApp number here later.
  // Example: phone: "918168961636"
  phone: "918168961636",

  mapsUrl: "https://maps.app.goo.gl/QxMoi981RV9bBLxZA?g_st=aw"
};

/* ---------------- MOBILE MENU ---------------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------------- ACTIVE NAV LINK ---------------- */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.remove("active"));
        const current = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        current?.classList.add("active");
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

sections.forEach(section => sectionObserver.observe(section));

/* ---------------- SCROLL REVEAL ---------------- */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------------- BACK TO TOP ---------------- */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 650);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------- CONTACT PHONE / WHATSAPP ---------------- */

const phoneLink = document.getElementById("phoneLink");
const phoneDisplay = document.getElementById("phoneDisplay");

if (CONFIG.phone) {
  phoneDisplay.textContent = "+91-816-896-1636";

  phoneLink.href = `https://wa.me/${CONFIG.phone}`;
  phoneLink.target = "_blank";
  phoneLink.rel = "noopener";
}

/* ---------------- ENQUIRY FORM ---------------- */

const enquiryForm = document.getElementById("enquiryForm");
const formStatus = document.getElementById("formStatus");

enquiryForm?.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(enquiryForm);
  const student = data.get("student")?.trim() || "";
  const parent = data.get("parent")?.trim() || "";
  const studentClass = data.get("class")?.trim() || "";
  const subject = data.get("subject")?.trim() || "";
  const phone = data.get("phone")?.trim() || "";
  const message = data.get("message")?.trim() || "";

  const emailSubject = encodeURIComponent(
    `New Enquiry - ${student} - Class ${studentClass}`
  );

  const body = encodeURIComponent(
`Hello Pragati Point,

I would like to enquire about coaching classes.

Student Name: ${student}
Parent Name: ${parent}
Class: ${studentClass}
Subject: ${subject}
Phone Number: ${phone}

Message:
${message}

Thank you.`
  );

  window.location.href = `mailto:${CONFIG.email}?subject=${emailSubject}&body=${body}`;

  formStatus.textContent =
    "Your email app should open with the enquiry prepared. If it does not, email us directly at " + CONFIG.email + ".";

  enquiryForm.reset();
});

/* ---------------- YEAR ---------------- */

document.getElementById("year").textContent = new Date().getFullYear();
