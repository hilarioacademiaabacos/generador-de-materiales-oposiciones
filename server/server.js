const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*', methods: ['POST', 'GET'] }));
app.use(express.json({ limit: '20mb' }));

// ── Healthcheck ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Generador de Materiales de Oposiciones — API activa (Gemini)' });
});

// ── Prompts ──────────────────────────────────────────────
function getPrompt(type) {
  if (type === 'infografia') return `Eres un experto en didáctica y diseño web. Analiza el documento PDF adjunto que corresponde a un tema de oposiciones al Cuerpo de Maestros de Educación Primaria en Extremadura.

Tu tarea es generar una INFOGRAFÍA INTERACTIVA completa en formato HTML autocontenido (todo en un único archivo: HTML + CSS + JS, sin dependencias externas salvo Google Fonts).

REQUISITOS OBLIGATORIOS:
1. El título principal debe ser el nombre del tema tal como aparece en el documento.
2. Estructura el contenido siguiendo los apartados del tema, destacando los conceptos más importantes.
3. Incluye el marco legislativo (leyes, decretos, órdenes) mencionado en el documento, destacando la normativa de Extremadura.
4. Usa acordeones/desplegables para los apartados con más contenido.
5. Incluye ejemplos prácticos de aula en los apartados donde sea relevante.
6. Diseño visual profesional: Google Fonts (Playfair Display + DM Sans), paleta navy/amber/teal, tarjetas con sombras, animaciones fadeIn con IntersectionObserver, efectos hover.
7. El archivo debe funcionar offline una vez descargado (excepto Google Fonts).

Responde ÚNICAMENTE con el código HTML completo, empezando por <!DOCTYPE html> y terminando en </html>. Sin explicaciones, sin markdown, sin bloques de código.`;

  if (type === 'discurso') return `Eres un experto en didáctica y comunicación oral. Analiza el documento PDF adjunto que corresponde a un tema de oposiciones al Cuerpo de Maestros de Educación Primaria en Extremadura.

Tu tarea es generar un DISCURSO PÍLDORA de aproximadamente 15 minutos para presentar el tema a alumnos de oposiciones mientras se proyecta una infografía.

El output debe ser un archivo HTML imprimible (diseño A4, con estilos de impresión) autocontenido.

REQUISITOS DEL DISCURSO:
1. Bloques con tiempo orientativo que sumen ~15 minutos.
2. Tono cercano y conversacional: párrafos fluidos, no listas ni esquemas.
3. Conectores naturales entre bloques.
4. Cada bloque incluye una indicación visual (recuadro dorado) sobre qué señalar en la infografía.
5. Términos clave, autores y normativa en negrita.
6. Conclusión sintética y potente de 2-3 frases.

REQUISITOS HTML:
- Diseño limpio estilo documento imprimible, max-width 800px.
- Cabecera con título del tema y subtítulo "Discurso Píldora · ~15 min".
- @media print para impresión correcta en A4.
- Google Fonts: Playfair Display + DM Sans.
- Todo autocontenido en un único archivo HTML.

Responde ÚNICAMENTE con el código HTML completo, empezando por <!DOCTYPE html> y terminando en </html>. Sin explicaciones, sin markdown, sin bloques de código.`;

  if (type === 'test') return `Eres un experto en evaluación educativa. Analiza el documento PDF adjunto que corresponde a un tema de oposiciones al Cuerpo de Maestros de Educación Primaria en Extremadura.

Tu tarea es generar un TEST DE REPASO INTERACTIVO completo en formato HTML autocontenido.

REQUISITOS DEL TEST:
1. Mínimo 30 preguntas con 4 opciones de respuesta (A,B,C,D).
2. Cubre: conceptos clave, autores y citas, normativa, técnicas, metodologías, etapas, y cualquier contenido relevante.
3. Cada pregunta tiene explicación del error/acierto basada en el documento.
4. Preguntas en orden aleatorio (shuffle) cada vez.

INTERFAZ:
- Pantalla 1: título "Test de repaso del [NOMBRE DEL TEMA]", campo de nombre obligatorio, stats.
- Pantalla 2: preguntas una a una, barra de progreso, contador. Opción correcta en verde + explicación; incorrecta en rojo + explicación. Botón "Siguiente" solo tras responder.
- Pantalla 3: nombre, aciertos/total, porcentaje, barra coloreada (verde ≥75%, naranja ≥50%, rojo <50%), mensaje motivador, botón repetir.

DISEÑO: Playfair Display + DM Sans, paleta navy/amber/teal, tarjeta max-width 720px, todo en un único HTML autocontenido.

Responde ÚNICAMENTE con el código HTML completo, empezando por <!DOCTYPE html> y terminando en </html>. Sin explicaciones, sin markdown, sin bloques de código.`;
}

// ── Endpoint principal ───────────────────────────────────
app.post('/generate', async (req, res) => {
  const { type, fileBase64 } = req.body;

  if (!type || !fileBase64) {
    return res.status(400).json({ error: 'Faltan parámetros: type y fileBase64 son obligatorios.' });
  }
  if (!['infografia', 'discurso', 'test'].includes(type)) {
    return res.status(400).json({ error: 'Tipo no válido. Usa: infografia, discurso o test.' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key de Gemini no configurada en el servidor.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const body = {
      contents: [{
        parts: [
          { inline_data: { mime_type: 'application/pdf', data: fileBase64 } },
          { text: getPrompt(type) }
        ]
      }],
      generationConfig: { maxOutputTokens: 16000, temperature: 0.7 }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Error HTTP ${response.status}`);
    }

    const data = await response.json();
    let html = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Limpiar posibles bloques markdown
    html = html.replace(/^```html?\s*/i, '').replace(/```\s*$/, '').trim();

    if (!html.toLowerCase().includes('<!doctype') && !html.toLowerCase().includes('<html')) {
      throw new Error('La respuesta no contiene HTML válido. Inténtalo de nuevo.');
    }

    res.json({ html });

  } catch (err) {
    console.error('Error Gemini:', err.message);
    res.status(500).json({ error: err.message || 'Error al llamar a la API de Gemini.' });
  }
});

// ── Arrancar servidor ────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en puerto ${PORT} — usando Gemini 1.5 Flash (gratuito)`);
});
