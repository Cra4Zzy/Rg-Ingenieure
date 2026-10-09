const menu = document.querySelector(".menu"),
  nav = document.querySelector("#navigation");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const o = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(o));
    nav.classList.toggle("is-open", o);
    const i = menu.querySelector("span");
    if (i) i.textContent = o ? "−" : "＋";
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      const i = menu.querySelector("span");
      if (i) i.textContent = "＋";
    }),
  );
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && nav) {
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    const i = menu.querySelector("span");
    if (i) i.textContent = "＋";
    menu.focus();
  }
});
const f = document.querySelector("#project-form");
if (f)
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    const data = new FormData(f);
    const fields = {
      name: "Name",
      company: "Unternehmen / Büro",
      email: "E-Mail",
      phone: "Telefon",
      type: "Projektart",
      service: "Leistungsbedarf",
      location: "Projektort",
      phase: "Projektphase",
      start: "Gewünschter Start",
      message: "Projektbeschreibung",
    };
    const body = Object.entries(fields)
      .map(([key, label]) => label + ": " + (data.get(key) || "—"))
      .join("\n");
    window.location.href =
      "mailto:info@rg-ing.de?subject=" +
      encodeURIComponent(
        "Projektanfrage · " + (data.get("service") || "Bauvorhaben"),
      ) +
      "&body=" +
      encodeURIComponent(body);
    const s = f.querySelector(".form-success");
    if (s) {
      s.hidden = false;
      s.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
const items = document.querySelectorAll(
  ".process-grid article,.audience-grid article,.feature-card,.values-grid article,.service-block,.checklist-grid>div",
);
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  items.forEach((x) => x.classList.add("reveal"));
  const o = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          o.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((x) => o.observe(x));
}
