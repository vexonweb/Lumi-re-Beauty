const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const menuToggle = $("#menuToggle");
const nav = $("#nav");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});
$$(".nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.textContent = "☰";
}));

// Reveal content on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .12});
$$(".section-aside,.service-card,.feature-copy,.gallery-item,.booking-copy,.booking-form").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// Service detail modal
const serviceDialog = $("#serviceDialog");
$$(".service-card").forEach(card => card.addEventListener("click", () => {
  $("#dialogTitle").textContent = card.dataset.service;
  $("#dialogDesc").textContent = card.dataset.desc;
  $("#dialogPrice").textContent = card.dataset.price;
  $("#dialogBook").onclick = () => {
    $("#serviceSelect").value = card.dataset.service;
    serviceDialog.close();
  };
  serviceDialog.showModal();
}));
$("#dialogClose").addEventListener("click", () => serviceDialog.close());

// Gallery horizontal controls + lightbox
const galleryTrack = $("#galleryTrack");
$("#prevPhoto").addEventListener("click", () => galleryTrack.scrollBy({left:-300,behavior:"smooth"}));
$("#nextPhoto").addEventListener("click", () => galleryTrack.scrollBy({left:300,behavior:"smooth"}));
const photoDialog = $("#photoDialog");
$$(".gallery-item").forEach(item => item.addEventListener("click", () => {
  $("#expandedPhoto").src = $("img", item).src;
  $("#expandedPhoto").alt = $("img", item).alt;
  photoDialog.showModal();
}));
$("#photoClose").addEventListener("click", () => photoDialog.close());

// Demo booking flow: no data is transmitted or stored.
const bookingForm = $("#bookingForm");
const successDialog = $("#successDialog");
bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  successDialog.showModal();
  bookingForm.reset();
});
$("#successClose").addEventListener("click", () => successDialog.close());
$("#successOk").addEventListener("click", () => successDialog.close());

// Close dialogs when clicking outside the dialog surface
[serviceDialog, photoDialog, successDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});
