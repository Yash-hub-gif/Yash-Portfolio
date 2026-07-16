"use strict";

const projects = {
  finflow: {
    type: "Mobile App Redesign",
    title: "FinFlow Mobile Banking App",
    description: "A demo redesign focused on making everyday banking tasks easier to understand, faster to complete, and more trustworthy.",
    tools: ["Figma", "FigJam", "User Flows", "Design System", "Interactive Prototype"],
    sections: [
      ["Problem", "Important actions were hard to find, transaction language felt technical, and the visual hierarchy did not give users enough confidence."],
      ["Research", "Reviewed common banking patterns, mapped frequent user tasks, and organized pain points around navigation, visibility, and trust."],
      ["Wireframes", "Explored a simplified home screen, clearer quick actions, predictable transaction details, and fewer steps for common transfers."],
      ["Design System", "Created reusable components, clear states, accessible contrast, spacing rules, and a calm visual language for financial information."],
      ["Prototype", "Connected core flows including balance review, money transfer, transaction history, and confirmation states."],
      ["Final Solution", "A focused mobile experience that makes priority actions visible and presents financial information in a cleaner, more reassuring way."]
    ]
  },
  insight: {
    type: "Web Dashboard",
    title: "Insight SaaS Dashboard",
    description: "A demo analytics dashboard designed to help campaign teams scan performance, understand trends, and act with less cognitive load.",
    tools: ["Figma", "Miro", "Information Architecture", "Responsive UI", "Accessibility"],
    sections: [
      ["User Flow", "Mapped the path from campaign overview to detailed performance, audience analysis, and report export."],
      ["Information Architecture", "Grouped metrics by decision value and reduced competition between primary KPIs, trends, and supporting data."],
      ["Dashboard Components", "Designed modular cards, comparison states, trend visualizations, filters, tables, empty states, and status messaging."],
      ["Responsive Layout", "Prioritized summary metrics and key actions on smaller screens while preserving access to detailed analysis."],
      ["Accessibility Considerations", "Used readable contrast, non-color status cues, clear labels, keyboard-friendly controls, and predictable focus order."]
    ]
  },
  homeserve: {
    type: "Responsive Website",
    title: "HomeServe Service Booking Platform",
    description: "A demo service marketplace experience created to reduce uncertainty and make finding, comparing, and booking help feel simple.",
    tools: ["Figma", "FigJam", "Journey Mapping", "High-Fidelity UI", "Developer Handoff"],
    sections: [
      ["Discovery", "Identified common booking concerns such as unclear pricing, trust, availability, service scope, and too many decisions."],
      ["User Journey", "Mapped the journey from service search through provider comparison, date selection, pricing review, and booking confirmation."],
      ["Wireframes", "Tested simplified search, progressive disclosure, transparent pricing summaries, and a shorter booking sequence."],
      ["High-Fidelity Design", "Built a warm but professional interface with clear service cards, trust signals, responsive layouts, and strong action hierarchy."],
      ["Prototype", "Connected the complete booking flow and key states including search results, provider details, checkout, and confirmation."],
      ["Developer Handoff", "Prepared component states, spacing rules, responsive behavior, interaction notes, and reusable design tokens."]
    ]
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastFocused = null;
let toastTimer = null;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = document.querySelector(".theme-toggle");
  const light = theme === "light";
  button?.setAttribute("aria-pressed", String(light));
  button?.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", light ? "#f6f7fb" : "#0b0d12");
}

function initTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  applyTheme(saved || preferred);
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next);
    applyTheme(next);
  });
}

function setMenu(open) {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  const header = document.querySelector("#site-header");
  if (!toggle || !menu || !header) return;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  menu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  header.classList.toggle("menu-active", open);
  if (open) menu.querySelector("a")?.focus();
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  document.querySelectorAll(".mobile-nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => { if (window.innerWidth > 1120) setMenu(false); });
}

function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    history.pushState?.(null, "", link.getAttribute("href"));
  }));
}

function initScrollState() {
  const header = document.querySelector("#site-header");
  const top = document.querySelector(".back-to-top");
  const update = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
    top?.classList.toggle("visible", window.scrollY > 620);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
}

function initActiveNav() {
  const links = [...document.querySelectorAll(".nav-link")];
  const map = new Map(links.map(link => [link.hash.slice(1), link]));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    links.forEach(link => link.classList.remove("active"));
    map.get(visible[0].target.id)?.classList.add("active");
  }, { rootMargin: "-25% 0px -58% 0px", threshold: [.08, .2, .45] });
  document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    }
  }), { rootMargin: "0px 0px -70px 0px", threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".project-card");
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    cards.forEach(card => card.classList.toggle("is-hidden", button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter));
  }));
}

function focusables(container) {
  return [...container.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
    .filter(element => !element.hidden && element.offsetParent !== null);
}

function openModal(key) {
  const project = projects[key];
  const modal = document.querySelector("#case-study-modal");
  const dialog = modal?.querySelector(".modal-dialog");
  if (!project || !modal || !dialog) return;
  document.querySelector("#modal-type").textContent = project.type;
  document.querySelector("#modal-title").textContent = project.title;
  document.querySelector("#modal-description").textContent = project.description;
  const content = document.querySelector("#modal-content");
  content.replaceChildren(...project.sections.map(([title, text]) => {
    const section = document.createElement("section");
    section.className = "modal-section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    section.append(heading, paragraph);
    return section;
  }));
  const tools = document.querySelector("#modal-tools");
  tools.replaceChildren(...project.tools.map(tool => {
    const span = document.createElement("span");
    span.textContent = tool;
    return span;
  }));
  lastFocused = document.activeElement;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => dialog.focus());
}

function closeModal() {
  const modal = document.querySelector("#case-study-modal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus?.();
}

function initModal() {
  document.querySelectorAll(".case-study-button").forEach(button => button.addEventListener("click", () => openModal(button.dataset.project)));
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    const modal = document.querySelector("#case-study-modal");
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") return closeModal();
    if (event.key !== "Tab") return;
    const list = focusables(modal.querySelector(".modal-dialog"));
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

async function copyEmail(button) {
  const email = button.dataset.email;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else {
      const temporary = document.createElement("textarea");
      temporary.value = email;
      temporary.setAttribute("readonly", "");
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.appendChild(temporary);
      temporary.select();
      document.execCommand("copy");
      temporary.remove();
    }
    button.textContent = "Copied";
    showToast("Email address copied");
    setTimeout(() => { button.textContent = "Copy"; }, 1800);
  } catch {
    showToast(`Copy this email: ${email}`);
  }
}

function validate(field) {
  const value = field.value.trim();
  let error = "";
  if (!value) error = "This field is required.";
  else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address.";
  else if (field.id === "contact-name" && value.length < 2) error = "Enter at least 2 characters.";
  else if (field.id === "contact-subject" && value.length < 3) error = "Enter a clearer subject.";
  else if (field.id === "contact-message" && value.length < 10) error = "Please add at least 10 characters.";
  field.setAttribute("aria-invalid", String(Boolean(error)));
  const message = document.getElementById(field.getAttribute("aria-describedby"));
  if (message) message.textContent = error;
  return !error;
}

function initContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;
  const fields = [...form.querySelectorAll("input,textarea")];
  fields.forEach(field => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") validate(field); });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      fields.find(field => field.getAttribute("aria-invalid") === "true")?.focus();
      status.style.display = "none";
      return;
    }
    const data = new FormData(form);
    const subject = data.get("subject").trim();
    const body = `Hello Yash,\n\n${data.get("message").trim()}\n\nFrom: ${data.get("name").trim()}\nReply email: ${data.get("email").trim()}`;
    status.textContent = "Your default email application is opening. Please review and send the email from there.";
    status.style.display = "block";
    window.location.href = `mailto:yashvala709@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function init() {
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  initTheme();
  initMenu();
  initSmoothLinks();
  initScrollState();
  initActiveNav();
  initReveal();
  initFilters();
  initModal();
  document.querySelectorAll(".copy-email").forEach(button => button.addEventListener("click", () => copyEmail(button)));
  initContactForm();
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.querySelector(".menu-toggle")?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      document.querySelector(".menu-toggle")?.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
