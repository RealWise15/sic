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

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Hide loading state
        submitButton.classList.remove("loading")

        // Show success message
        window.showToast("success", "Formulario enviado", "Nos pondremos en contacto con usted a la brevedad.")

        // Reset form
        contactForm.reset()
      }, 1500)
    })
  }
})
