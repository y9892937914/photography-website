import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://jooupsivugyfscgvirsg.supabase.co";
const supabaseKey = "sb_publishable_1buYgOEnO_nlJc3KxrxBNA_n8TI0T4V";

const supabase = createClient(supabaseUrl, supabaseKey);



const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

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
  interval: 500,
});
ScrollReveal().reveal(".about__container img", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".service__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".service__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__card", {
  duration: 1000,
  delay: 1000,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
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

const instagram = document.querySelector(".instagram__flex");

Array.from(instagram.children).forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  instagram.appendChild(duplicateNode);
});

async function loadImages() {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading images:", error);
    return;
  }

  const instagram = document.querySelector(".instagram__flex");
  instagram.innerHTML = "";

  data.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.image_url;
    img.alt = "gallery image";
    instagram.appendChild(img);
  });
}

loadImages();

async function testConnection() {
  const { data, error } = await supabase.from("images").select("*");
  console.log("DATA:", data);
  console.log("ERROR:", error);
}

testConnection();



async function loadImages() {
  const { data, error } = await supabase
    .from("images")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  const gallery = document.querySelector(".gallery");

  data.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.image_url;
    img.alt = item.title;
    gallery.appendChild(img);
  });
}

loadImages();
