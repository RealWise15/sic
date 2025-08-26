document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      navList.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  }

  // Toast notification system
  window.showToast = (type, title, message, duration = 5000) => {
    const toast = document.getElementById("toast")
    const toastTitle = toast.querySelector(".toast-title")
    const toastDescription = toast.querySelector(".toast-description")
    const successIcon = toast.querySelector(".toast-success")
    const errorIcon = toast.querySelector(".toast-error")

    // Set content
    toastTitle.textContent = title
    toastDescription.textContent = message

    // Show appropriate icon
    if (type === "success") {
      successIcon.style.display = "block"
      errorIcon.style.display = "none"
    } else {
      successIcon.style.display = "none"
      errorIcon.style.display = "block"
    }

    // Show toast
    toast.classList.add("show")

    // Hide toast after duration
    const toastTimeout = setTimeout(() => {
      toast.classList.remove("show")
    }, duration)

    // Close button
    const closeBtn = toast.querySelector(".toast-close")
    closeBtn.addEventListener("click", () => {
      toast.classList.remove("show")
      clearTimeout(toastTimeout)
    })
  }

  // Close toast when clicking outside
  document.addEventListener("click", (event) => {
    const toast = document.getElementById("toast")
    const toastContent = toast.querySelector(".toast-content")

    if (
      toast.classList.contains("show") &&
      !toastContent.contains(event.target) &&
      !event.target.closest(".toast-close")
    ) {
      toast.classList.remove("show")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const navList = document.querySelector(".nav-list")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

    if (
      navList &&
      navList.classList.contains("active") &&
      !navList.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      navList.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        e.preventDefault()

        // Close mobile menu if open
        const navList = document.querySelector(".nav-list")
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

        if (navList && navList.classList.contains("active")) {
          navList.classList.remove("active")
          mobileMenuBtn.classList.remove("active")
          document.body.classList.remove("menu-open")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })
})
