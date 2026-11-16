const portfolioData = {
  name: "Valentin Husak",
  initials: "VH",
  greeting: "Valentin Husak",
  age: "18",
  occupation: "Second-year Cybersecurity Student",
  location: "Paris, France",
  intro:
    "I am a second-year cybersecurity student interested in low-level programming, emulation, and systems development.",
  about:
    "I am a second-year cybersecurity student interested in low-level programming, emulation, and systems development. My projects include a Wii U emulator, a Windows NTFS compression utility, and a PostgreSQL store database.",
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
  stack: [
    {
      role: "C++23 and emulation",
      company: "Affogato · Nintendo Wii U emulator",
      date: "C++23",
      description:
        "An experimental emulator with an early PowerPC interpreter, RPX/RPL loading, and a small Cafe OS HLE layer.",
      skills: ["C++23", "PowerPC", "RPX / RPL"],
    },
    {
      role: "Windows desktop development",
      company: "Compresso · NTFS LZX utility",
      date: "Windows",
      description:
        "A desktop tool for analyzing game folders and applying Windows transparent NTFS LZX compression to eligible files.",
      skills: ["C++23", "Qt", "NTFS", "LZX"],
    },
    {
      role: "Relational databases",
      company: "Online Store Database",
      date: "PostgreSQL",
      description:
        "A PostgreSQL online-store schema with sample data and queries for customers, products, orders, payments, and shipments.",
      skills: ["PostgreSQL", "SQL", "Schema design"],
    },
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
  notes: [
    {
      title: "Affogato development notes",
      description: "Current implementation status, supported systems, and build instructions.",
      meta: "C++23 / emulation",
      href: "https://github.com/val168/Affogato#readme",
    },
    {
      title: "Compresso usage and limitations",
      description: "How the utility applies Windows LZX compression and which filesystems it supports.",
      meta: "Windows / NTFS",
      href: "https://github.com/val168/Compresso#readme",
    },
    {
      title: "Online store database schema",
      description: "Database structure, relationships, sample data, and example queries.",
      meta: "PostgreSQL / SQL",
      href: "https://github.com/val168/DB-Project#readme",
    },
  ],
  contact: [
    { label: "GitHub", value: "github.com/val168", href: "https://github.com/val168" },
  ],
};

const fields = document.querySelectorAll("[data-field]");
const stackList = document.querySelector("#stack-list");
const projectList = document.querySelector("#project-list");
const contactList = document.querySelector("#contact-list");
const skillList = document.querySelector("#skill-list");
const noteList = document.querySelector("#note-list");
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

stackList.innerHTML = portfolioData.stack
  .map(
    (item) => `
      <article class="card reveal">
        <div class="card-header">
          <div>
            <h3>${item.role}</h3>
            <p class="card-meta">${item.company}</p>
          </div>
          <span class="card-date">${item.date}</span>
        </div>
        <p class="card-description">${item.description}</p>
        <div class="chip-list" aria-label="Technologies and skills">${createChips(item.skills)}</div>
      </article>
    `
  )
  .join("");

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

noteList.innerHTML = portfolioData.notes
  .map(
    (note) => `
      <a class="note-item reveal" href="${note.href}" target="_blank" rel="noreferrer">
        <div>
          <h3>${note.title}</h3>
          <p>${note.description}</p>
        </div>
        <span>${note.meta}</span>
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
