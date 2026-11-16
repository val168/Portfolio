const portfolioData = {
  name: "Val",
  initials: "V",
  greeting: "Building systems from the inside out.",
  tagline: "Cybersecurity student focused on low-level programming, emulation, and systems development.",
  occupation: "2nd-year cybersecurity",
  intro:
    "I build software that explores how systems work, from a Nintendo Wii U emulator to Windows file compression tools and relational database design.",
  about:
    "I am a second-year cybersecurity student interested in low-level programming, emulation, and systems development. My public work includes a C++23 Wii U emulator, a Windows utility for NTFS LZX compression, and a PostgreSQL online-store database.",
  skills: [
    "C++23",
    "Emulation",
    "PowerPC",
    "Windows",
    "NTFS / LZX",
    "Qt",
    "SDL3",
    "Dear ImGui",
    "PostgreSQL",
  ],
  projects: [
    {
      name: "Affogato",
      description:
        "An experimental Nintendo Wii U emulator in modern C++23. It includes an early PowerPC interpreter, RPX/RPL loading, a small Cafe OS HLE layer, and a minimal desktop frontend.",
      technologies: ["C++23", "Wii U emulation", "PowerPC", "SDL3", "Dear ImGui"],
      link: "https://github.com/val168/Affogato",
      linkLabel: "View repository",
    },
    {
      name: "Compresso",
      description:
        "A Windows desktop utility that analyzes game folders and applies Windows native transparent NTFS LZX compression to eligible files in place.",
      technologies: ["C++23", "Windows", "NTFS", "LZX", "Qt"],
      link: "https://github.com/val168/Compresso",
      linkLabel: "View repository",
    },
    {
      name: "Online Store Database",
      description:
        "A PostgreSQL schema for an online store, with customers, products, categories, orders, payments, and shipments, plus sample data and example queries.",
      technologies: ["PostgreSQL", "SQL", "Relational databases"],
      link: "https://github.com/val168/DB-Project",
      linkLabel: "View repository",
    },
  ],
  contact: [
    { label: "GitHub", value: "github.com/val168", href: "https://github.com/val168" },
  ],
};

const fields = document.querySelectorAll("[data-field]");
const projectList = document.querySelector("#project-list");
const contactList = document.querySelector("#contact-list");
const skillList = document.querySelector("#skill-list");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#current-year");
const brandMark = document.querySelector(".brand-mark");

const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
};

fields.forEach((field) => {
  const key = field.dataset.field;
  if (portfolioData[key]) {
    field.textContent = portfolioData[key];
  }
});

setText(".brand-mark", portfolioData.initials);
year.textContent = new Date().getFullYear();
document.title = `${portfolioData.name} | Portfolio`;

const createChips = (items) =>
  items.map((item) => `<span class="chip">${item}</span>`).join("");

skillList.innerHTML = portfolioData.skills
  .map((skill) => `<span class="skill-pill"><strong>${skill}</strong></span>`)
  .join("");

projectList.innerHTML = portfolioData.projects
  .map((project) => {
    const linkMarkup = project.link
      ? `<a class="card-link" href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel}</a>`
      : `<span class="card-link placeholder">${project.linkLabel}</span>`;

    return `
      <article class="card reveal">
        <div>
          <h3>${project.name}</h3>
          <p class="card-meta">${project.technologies.join(" / ")}</p>
        </div>
        <p class="card-description">${project.description}</p>
        <div class="chip-list" aria-label="Technologies used">${createChips(project.technologies)}</div>
        ${linkMarkup}
      </article>
    `;
  })
  .join("");

contactList.innerHTML = portfolioData.contact
  .map(
    (item) => `
      <a class="contact-link" href="${item.href}" target="_blank" rel="noreferrer">
        <strong>${item.label}</strong>
        <span>${item.value}</span>
      </a>
    `
  )
  .join("");

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

brandMark.setAttribute("aria-hidden", "true");
