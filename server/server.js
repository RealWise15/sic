const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dbPromise = require("./db"); // 👈 tu db.js
const destinatariosPorServicio = {
  "diagnostico": "squall260981@gmail.com",
  "servidores": "squall260981@gmail.com",
  "recuperacion": "squall260981@gmail.com",
  "reparacion": "quisbert.flores.miguel@gmail.com",
  "remoto": "quisbert.flores.miguel@gmail.com",
  "software": "quisbert.flores.miguel@gmail.com"
};
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir formulario (POST)
app.post("/api/contact", async (req, res) => {
  const db = await dbPromise;
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  const destinatario = destinatariosPorServicio[service] || "squall260981@gmail.com";

  try {
    // 1. Guardar en la base de datos
    await db.run(
      `INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, service, message]
    );

    // 2. Enviar email
    let transporter = nodemailer.createTransport({
      service: "gmail", // o tu servicio SMTP
      auth: {
        user: "squall260981@gmail.com",   // 🔹 CAMBIAR
        pass: "nwpfokkhwitcrlfx",      // 🔹 Contraseña de aplicación de Gmail
      },
    });

    try {
      await transporter.sendMail({
        from: `"Formulario Web SIC" <squall260981@gmail.com>`,
        to: destinatario, // 🔹 CAMBIAR
        subject: `${service}`, // 🔹 CAMBIAR
        html: `
        <head>
            <title>Nueva Consulta de Servicios</title>
            <style>
                body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; }
                .container { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1); }
                h2 { color: #0077cc; }
                .info { margin-bottom: 10px; font-size: 16px; }
                .footer { margin-top: 20px; font-size: 14px; color: #777; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>📩 Nueva Consulta Recibida</h2>
                <p class='info'><strong>👤 Nombre:</strong> ${name}</p>
                <p class='info'><strong>📧 Correo:</strong> <a href='mailto:${email}'>${email}</a></p>
                <p class='info'><strong>📞 Teléfono:</strong> ${phone}</p>
                <p class='info'><strong>🩺 Servicio solicitado:</strong> ${service}</p>
                <p class='info'><strong>📝 Mensaje:</strong><br>${message}</p>
                <hr>
                <p class='footer'>📍 Este mensaje fue generado automáticamente desde el sitio web de SIC Argentina.</p>
            </div>
        </body>
  `,
      });
    } catch (err) {
      console.error("Error al enviar email:", err);
    }

    res.json({ success: true, message: "Formulario guardado y procesado correctamente" });
  } catch (err) {
    console.error("Error DB:", err);
    res.status(500).json({ error: "Error al procesar el formulario" });
  }
});

// 📌 Nueva ruta para consultar todos los contactos
app.get("/api/contacts", async (req, res) => {
  const db = await dbPromise;

  try {
    const rows = await db.all("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error al leer DB:", err);
    res.status(500).json({ error: "No se pudieron obtener los contactos" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

