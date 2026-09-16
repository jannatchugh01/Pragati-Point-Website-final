/* =========================================================
   PRAGATI POINT COACHING CLASSES
   Main JavaScript
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {
  email: "tanejajyoti884@gmail.com",

  phone: "918168961636",

  mapsUrl:
    "https://maps.app.goo.gl/QxMoi981RV9bBLxZA?g_st=aw"
};


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");


menuToggle?.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


document.querySelectorAll("#navLinks a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navItems =
  document.querySelectorAll(
    ".nav-links a[href^='#']"
  );


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navItems.forEach(item => {
            item.classList.remove("active");
          });


          const current =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );


          current?.classList.add("active");

        }

      });

    },
    {
      rootMargin: "-30% 0px -60% 0px"
    }
  );


sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "is-visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(el => {
    revealObserver.observe(el);
  });


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop =
  document.getElementById("backToTop");


if (backToTop) {

  window.addEventListener("scroll", () => {

    backToTop.classList.toggle(
      "show",
      window.scrollY > 650
    );

  });


  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   CONTACT PHONE / WHATSAPP
   ========================================================= */

const phoneLink =
  document.getElementById("phoneLink");

const phoneDisplay =
  document.getElementById("phoneDisplay");


if (
  CONFIG.phone &&
  phoneLink &&
  phoneDisplay
) {

  phoneDisplay.textContent =
    "+91-816-896-1636";


  phoneLink.href =
    `https://wa.me/${CONFIG.phone}`;


  phoneLink.target =
    "_blank";


  phoneLink.rel =
    "noopener";

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   SUPABASE PUBLIC GALLERY
   ========================================================= */

const SUPABASE_URL =
  "https://tqpllyvfcnvpciasyxqn.supabase.co";


const SUPABASE_KEY =
  "sb_publishable_1ojIIv2SwIh80LB_UJR9Hg_1s2B58-8";


const publicSupabase =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================================
   LOAD PUBLIC GALLERY
   ========================================================= */

async function loadPublicGallery() {

  const gallery =
    document.getElementById(
      "publicGallery"
    );


  const status =
    document.getElementById(
      "publicGalleryStatus"
    );


  /*
    If this page does not contain
    the public gallery, stop here.
  */

  if (!gallery) {
    return;
  }


  gallery.innerHTML = "";


  const { data: files, error } =
    await publicSupabase.storage
      .from("gallery")
      .list("", {

        limit: 100,

        sortBy: {
          column: "created_at",
          order: "desc"
        }

      });


  /* ---------------- ERROR ---------------- */

  if (error) {

    console.error(
      "Gallery could not be loaded:",
      error
    );


    if (status) {

      status.textContent =
        "Gallery could not be loaded.";

    }


    return;
  }


  /* ---------------- NO PHOTOS ---------------- */

  if (
    !files ||
    files.length === 0
  ) {

    if (status) {

      status.textContent =
        "Photos coming soon.";

    }


    return;
  }


  /* ---------------- PHOTOS FOUND ---------------- */

  if (status) {

    status.textContent = "";

  }


  files.forEach(file => {

    /*
      Ignore invalid entries.
    */

    if (!file.name) {
      return;
    }


    /* Get public image URL */

    const { data } =
      publicSupabase.storage
        .from("gallery")
        .getPublicUrl(
          file.name
        );


    /* Create gallery item */

    const item =
      document.createElement(
        "div"
      );


    item.className =
      "gallery-public-item";


    /* Create image */

    const image =
      document.createElement(
        "img"
      );


    image.src =
      data.publicUrl;


    image.alt =
      "Pragati Point Coaching Classes Gallery";


    image.loading =
      "lazy";


    /*
      These ensure the image
      displays correctly even if
      the CSS does not specify them.
    */

    image.style.width =
      "100%";

    image.style.height =
      "250px";

    image.style.objectFit =
      "cover";

    image.style.display =
      "block";


    /* Add image to item */

    const link = document.createElement("a");

    link.href = data.publicUrl;
    link.target = "_blank";
    link.rel = "noopener";

    link.appendChild(image);

    item.appendChild(link);
    gallery.appendChild(item);

      });

}


/* =========================================================
   START PUBLIC GALLERY
   ========================================================= */

loadPublicGallery();