document.addEventListener("DOMContentLoaded", () => {
  const trackingForm = document.getElementById("tracking-form")
  const resultContainer = document.getElementById("tracking-result")

  if (trackingForm && resultContainer) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const trackingId = document.getElementById("tracking-id").value.trim()

      if (!trackingId) {
        window.showToast("error", "Error de búsqueda", "Por favor ingrese un número de orden válido")
        return
      }

      // Show loading state
      const submitButton = trackingForm.querySelector('button[type="submit"]')
      submitButton.classList.add("loading")

      // Clear previous results
      resultContainer.innerHTML = ""

      // Simulate API call to get tracking data
      setTimeout(() => {
        // Hide loading state
        submitButton.classList.remove("loading")

        // Check if order exists (mock data)
        const mockOrders = {
          "ORD-1234": {
            id: "ORD-1234",
            client: "Juan Pérez",
            device: "Laptop Dell XPS 15",
            status: "en_proceso",
            statusText: "En proceso",
            entryDate: "2023-05-15",
            estimatedDelivery: "2023-05-20",
            description: "Reemplazo de disco duro y limpieza de ventiladores",
            progress: 60,
            history: [
              { date: "2023-05-15", status: "Recibido", description: "Equipo recibido en el taller" },
              {
                date: "2023-05-16",
                status: "Diagnóstico",
                description: "Se detectó disco duro defectuoso y ventiladores obstruidos",
              },
              { date: "2023-05-17", status: "En proceso", description: "Reemplazo de disco duro en progreso" },
            ],
          },
          "ORD-5678": {
            id: "ORD-5678",
            client: "María González",
            device: "PC de Escritorio HP",
            status: "diagnostico",
            statusText: "En diagnóstico",
            entryDate: "2023-05-17",
            estimatedDelivery: "2023-05-22",
            description: "Problemas de arranque, posible falla de fuente de poder",
            progress: 30,
            history: [
              { date: "2023-05-17", status: "Recibido", description: "Equipo recibido en el taller" },
              {
                date: "2023-05-18",
                status: "Diagnóstico",
                description: "Evaluación de problemas de arranque en progreso",
              },
            ],
          },
          "ORD-9012": {
            id: "ORD-9012",
            client: "Carlos Rodríguez",
            device: "MacBook Pro 2019",
            status: "completado",
            statusText: "Reparación completada",
            entryDate: "2023-05-10",
            estimatedDelivery: "2023-05-16",
            description: "Reemplazo de batería y teclado",
            progress: 100,
            history: [
              { date: "2023-05-10", status: "Recibido", description: "Equipo recibido en el taller" },
              {
                date: "2023-05-11",
                status: "Diagnóstico",
                description: "Se detectó batería defectuosa y teclas dañadas",
              },
              { date: "2023-05-13", status: "En proceso", description: "Reemplazo de batería y teclado en progreso" },
              {
                date: "2023-05-15",
                status: "Completado",
                description: "Reparación finalizada, equipo listo para entrega",
              },
            ],
          },
        }

        const order = mockOrders[trackingId]

        if (order) {
          // Create tracking card
          const trackingCard = document.createElement("div")
          trackingCard.className = "tracking-card"

          // Format dates
          const entryDate = new Date(order.entryDate).toLocaleDateString()
          const estimatedDelivery = new Date(order.estimatedDelivery).toLocaleDateString()

          // Create history HTML
          let historyHTML = ""
          if (order.history && order.history.length > 0) {
            historyHTML = `
                            <div class="tracking-history">
                                <h3>Historial de la reparación</h3>
                                <ul class="history-timeline">
                        `

            order.history.forEach((item) => {
              const itemDate = new Date(item.date).toLocaleDateString()
              historyHTML += `
                                <li class="history-item">
                                    <div class="history-marker"></div>
                                    <div class="history-content">
                                        <div class="history-date">${itemDate}</div>
                                        <div class="history-status">${item.status}</div>
                                        <div class="history-description">${item.description}</div>
                                    </div>
                                </li>
                            `
            })

            historyHTML += `
                                </ul>
                            </div>
                        `
          }

          trackingCard.innerHTML = `
                        <div class="tracking-card-header">
                            <div>
                                <div class="tracking-card-title">${order.device}</div>
                                <div class="tracking-card-subtitle">Orden: ${order.id}</div>
                            </div>
                            <span class="tracking-status status-${order.status}">${order.statusText}</span>
                        </div>
                        <div class="tracking-card-body">
                            <div class="tracking-details">
                                <div class="tracking-detail-item">
                                    <div class="tracking-detail-label">Cliente</div>
                                    <div class="tracking-detail-value">${order.client}</div>
                                </div>
                                <div class="tracking-detail-item">
                                    <div class="tracking-detail-label">Fecha de ingreso</div>
                                    <div class="tracking-detail-value">${entryDate}</div>
                                </div>
                                <div class="tracking-detail-item">
                                    <div class="tracking-detail-label">Entrega estimada</div>
                                    <div class="tracking-detail-value">${estimatedDelivery}</div>
                                </div>
                                <div class="tracking-detail-item">
                                    <div class="tracking-detail-label">Servicio</div>
                                    <div class="tracking-detail-value">${order.description}</div>
                                </div>
                            </div>
                            <div class="progress-container">
                                <div class="progress-header">
                                    <span>Progreso</span>
                                    <span>${order.progress}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 0%"></div>
                                </div>
                            </div>
                            ${historyHTML}
                        </div>
                    `

          resultContainer.appendChild(trackingCard)

          // Animate progress bar
          setTimeout(() => {
            const progressFill = trackingCard.querySelector(".progress-fill")
            progressFill.style.width = `${order.progress}%`
          }, 100)

          // Add styles for history timeline
          const style = document.createElement("style")
          style.textContent = `
                        .tracking-history {
                            margin-top: var(--spacing-xl);
                            padding-top: var(--spacing-lg);
                            border-top: 1px solid var(--color-border);
                        }
                        
                        .tracking-history h3 {
                            margin-bottom: var(--spacing-md);
                            font-size: var(--font-size-lg);
                        }
                        
                        .history-timeline {
                            position: relative;
                            padding-left: 30px;
                        }
                        
                        .history-timeline::before {
                            content: '';
                            position: absolute;
                            left: 7px;
                            top: 0;
                            bottom: 0;
                            width: 2px;
                            background-color: var(--color-border);
                        }
                        
                        .history-item {
                            position: relative;
                            margin-bottom: var(--spacing-lg);
                        }
                        
                        .history-item:last-child {
                            margin-bottom: 0;
                        }
                        
                        .history-marker {
                            position: absolute;
                            left: -30px;
                            top: 0;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background-color: var(--color-primary);
                            border: 3px solid white;
                            box-shadow: 0 0 0 1px var(--color-border);
                        }
                        
                        .history-date {
                            font-size: var(--font-size-sm);
                            color: var(--color-text-light);
                            margin-bottom: var(--spacing-xs);
                        }
                        
                        .history-status {
                            font-weight: 600;
                            margin-bottom: var(--spacing-xs);
                        }
                        
                        .history-description {
                            font-size: var(--font-size-sm);
                            color: var(--color-text-light);
                        }
                    `

          document.head.appendChild(style)
        } else {
          // Show not found message
          resultContainer.innerHTML = `
                        <div class="tracking-not-found">
                            <p>No se encontró ninguna orden con el número <strong>${trackingId}</strong></p>
                            <p>Verifique el número e intente nuevamente o contacte con soporte.</p>
                        </div>
                    `

          window.showToast(
            "error",
            "Orden no encontrada",
            "No se encontró ninguna orden con ese número. Verifique e intente nuevamente.",
          )
        }
      }, 1000)
    })
  }
})
