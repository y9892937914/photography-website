// ===============================
// SUPABASE CONNECTION
// ===============================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://jooupsivugyfscgvirsg.supabase.co";
const supabaseKey = "sb_publishable_1buYgOEnO_nlJc3KxrxBNA_n8TI0T4V";

const supabase = createClient(supabaseUrl, supabaseKey);


// ===============================
// MOBILE MENU
// ===============================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute(
      "class",
      isOpen ? "ri-close-line" : "ri-menu-line"
    );
  });

  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
}


// ===============================
// SCROLL REVEAL
// ===============================
if (typeof ScrollReveal !== "undefined") {
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  ScrollReveal().reveal(".about__container .section__header", {
    ...scrollRevealOption,
  });
  ScrollReveal().reveal(".about__container .section__description", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".about__container img", {
    ...scrollRevealOption,
    delay: 1000,
  });

  ScrollReveal().reveal(".service__container .section__header", {
    ...scrollRevealOption,
  });
  ScrollReveal().reveal(".service__card", {
    duration: 1000,
    delay: 500,
    interval: 300,
  });

  ScrollReveal().reveal(".blog__content .section__header", {
    ...scrollRevealOption,
  });
  ScrollReveal().reveal(".blog__content h4", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".blog__content p", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".blog__content .blog__btn", {
    ...scrollRevealOption,
    delay: 1500,
  });
}


// ===============================
// SWIPER
// ===============================
if (typeof Swiper !== "undefined") {
  new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}


// ===============================
// LOAD IMAGES FROM SUPABASE
// ===============================
async function loadImages() {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading images:", error.message);
    return;
  }

  const gallery = document.querySelector(".gallery");

  if (!gallery) {
    console.warn("Gallery element not found.");
    return;
  }

  gallery.innerHTML = "";

  data.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.image_url;
    img.alt = item.title || "gallery image";
    img.loading = "lazy";
    gallery.appendChild(img);
  });

  console.log("Images loaded successfully:", data);
}

loadImages();
