document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value,
      }

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      submitButton.classList.add("loading")

      // Dentro del submit del formulario:
fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
})
  .then((res) => res.json())
  .then((data) => {
    submitButton.classList.remove("loading");

    if (data.success) {
      window.showToast("success", "Formulario enviado", "Nos pondremos en contacto con usted a la brevedad.");
      contactForm.reset();
    } else {
      window.showToast("error", "Error", data.error || "No se pudo enviar el formulario.");
    }
  })
  .catch((err) => {
    submitButton.classList.remove("loading");
    window.showToast("error", "Error", "Hubo un problema con el servidor.");
  });
    })
  }
})
