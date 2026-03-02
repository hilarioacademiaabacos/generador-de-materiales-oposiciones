const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*', methods: ['POST', 'GET'] }));
app.use(express.json({ limit: '20mb' }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Generador de Materiales de Oposiciones — API activa (Gemini)' });
});

function getPrompt(type) {

  if (type === 'infografia') return `Eres un experto en didáctica y diseño web. Analiza el PDF adjunto (tema de oposiciones al Cuerpo de Maestros de Educación Primaria en Extremadura) y genera una INFOGRAFÍA INTERACTIVA en HTML.

USA EXACTAMENTE ESTAS VARIABLES CSS en :root:
--navy:#1a2744; --amber:#e8a020; --amber-d:#c4790a; --amber-p:#fff8e8; --cream:#faf6f0; --teal:#1a7a6e; --teal-p:#e8f5f3; --border:#e2d8cc;

FUENTES OBLIGATORIAS:
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
Títulos: font-family:'Playfair Display',serif — Cuerpo: font-family:'DM Sans',sans-serif

ESTILOS GLOBALES obligatorios en <style>:
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);margin:0}
.container{max-width:900px;margin:0 auto;padding:40px 20px}
.section{background:white;border-radius:20px;padding:32px;margin-bottom:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
.section-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:var(--amber);color:var(--navy);border-radius:50%;font-weight:900;font-size:1rem;margin-bottom:12px}
.section h2{font-family:'Playfair Display',serif;color:var(--navy);font-size:1.4rem;margin-bottom:16px}
.acc-header{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:var(--amber-p);border:1px solid var(--border);border-radius:10px;cursor:pointer;font-weight:600;color:var(--navy)}
.acc-header:hover{background:var(--amber);color:white}
.acc-arrow{transition:transform .3s}
.acc-body{display:none;padding:16px 18px;border:1px solid var(--border);border-top:none;border-radius:0 0 10px 10px;line-height:1.7}
.accordion.open .acc-body{display:block}
.accordion.open .acc-arrow{transform:rotate(180deg)}
.accordion{margin-bottom:10px}

ESTRUCTURA OBLIGATORIA:

1. HERO: fondo var(--navy), título en Playfair Display blanco, badge dorado "Oposiciones · Ed. Primaria · Extremadura", subtítulo gris, 4-5 tags de colores.

2. SECCIONES con clase "section": número en círculo amber, título en navy, contenido en tarjetas blancas.

3. ACORDEONES para contenido extenso:
<div class="accordion">
  <div class="acc-header" onclick="this.parentElement.classList.toggle('open')">
    <span>TÍTULO</span><span class="acc-arrow">▼</span>
  </div>
  <div class="acc-body">CONTENIDO</div>
</div>

4. TARJETAS DE CONCEPTOS en grid:
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:16px">
  <div style="background:var(--teal-p);border-left:4px solid var(--teal);border-radius:12px;padding:16px">
    <div style="font-weight:700;color:var(--teal)">TÍTULO</div>
    <div style="font-size:.9rem;margin-top:6px">CONTENIDO</div>
  </div>
</div>

5. EJEMPLOS DE AULA en recuadro verde:
<div style="background:var(--teal-p);border-left:4px solid var(--teal);border-radius:8px;padding:16px;margin:12px 0">
  <strong style="color:var(--teal)">📚 Ejemplo de aula:</strong> DESCRIPCIÓN
</div>

6. LEGISLACIÓN en caja navy al final:
<div style="background:var(--navy);color:white;border-radius:16px;padding:28px;margin-top:28px">
  <h2 style="color:var(--amber);font-family:'Playfair Display',serif;margin-bottom:16px">⚖️ Marco Legislativo</h2>
  <ul style="list-style:none;padding:0">
    <li style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.1)">• NORMA</li>
  </ul>
</div>

7. ANIMACIONES antes de </body>:
<script>
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:0.1});
document.querySelectorAll('.section').forEach(s=>{s.style.opacity='0';s.style.transform='translateY(30px)';s.style.transition='opacity 0.6s ease,transform 0.6s ease';obs.observe(s);});
<\/script>

CONTENIDO: todos los apartados del PDF, legislación completa, mínimo 3 ejemplos de aula, bibliografía.
Responde ÚNICAMENTE con HTML completo desde <!DOCTYPE html> hasta </html>. Sin markdown.`;

  if (type === 'discurso') return `Eres un experto en didáctica y comunicación oral. Analiza el PDF adjunto (tema de oposiciones al Cuerpo de Maestros de Educación Primaria en Extremadura) y genera un DISCURSO PÍLDORA de 15 minutos en HTML imprimible.

USA EXACTAMENTE ESTE HTML BASE y rellena el contenido:

<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--navy:#1a2744;--amber:#e8a020;--amber-p:#fff8e8;--teal:#1a7a6e;--teal-p:#e8f5f3;--border:#e2d8cc}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#faf6f0;color:#1e1e1e}
.page{max-width:800px;margin:0 auto;padding:48px 40px}
.doc-header{background:var(--navy);color:white;border-radius:16px;padding:32px;margin-bottom:32px}
.tag{background:var(--amber);color:var(--navy);font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:2px;display:inline-block;margin-bottom:12px;letter-spacing:.08em;text-transform:uppercase}
.doc-header h1{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;line-height:1.2;margin-bottom:8px}
.doc-header h1 span{color:var(--amber)}
.doc-header p{color:rgba(255,255,255,.6);font-size:.9rem}
.time-badge{display:inline-block;background:var(--navy);color:var(--amber);font-size:.8rem;font-weight:700;padding:6px 14px;border-radius:20px;margin-bottom:8px}
.block-title{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--navy);margin-bottom:12px}
.block{margin-bottom:36px;padding-bottom:36px;border-bottom:1px solid var(--border)}
.block:last-child{border-bottom:none}
.cue{background:var(--amber-p);border-left:4px solid var(--amber);border-radius:0 8px 8px 0;padding:12px 16px;font-size:.87rem;color:#6b3a00;font-style:italic;margin-bottom:16px}
.cue::before{content:'▶  '}
p{line-height:1.8;margin-bottom:14px;font-size:.97rem}
strong{color:var(--navy)}
.conclusion{background:var(--navy);color:white;border-radius:12px;padding:24px;margin-top:32px}
.conclusion h3{font-family:'Playfair Display',serif;color:var(--amber);margin-bottom:12px}
.conclusion p{color:rgba(255,255,255,.85);line-height:1.75}
@media print{body{background:white}.page{padding:20px}.block{page-break-inside:avoid}@page{margin:2cm;size:A4}}
</style></head><body><div class="page">

AQUÍ EL CONTENIDO: cabecera + bloques + conclusión usando exactamente estas clases.

Para cada bloque:
<div class="block">
  <div class="time-badge">⏱ BLOQUE N · Título · ~X min</div>
  <div class="block-title">Título</div>
  <div class="cue">Señala [elemento] en la infografía.</div>
  <p>Texto conversacional...</p>
</div>

Cierra con:
<div class="conclusion"><h3>✓ Para cerrar</h3><p>Conclusión potente...</p></div>

REQUISITOS: 6-8 bloques, ~15 min total, tono conversacional, conectores naturales, negrita en términos clave y normativa.
</div></body></html>

Responde ÚNICAMENTE con HTML completo. Sin markdown.`;

 if (type === 'test') return `Eres un experto en evaluación educativa. Analiza el PDF adjunto y genera un TEST DE REPASO en HTML. Debes rellenar EXACTAMENTE esta plantilla, solo cambiando TITULO_DEL_TEMA, SUBTITULO_DEL_TEMA y ARRAY_DE_PREGUNTAS_AQUI:

<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Test de repaso</title><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"><style>:root{--navy:#1a2744;--amber:#e8a020;--amber-d:#c4790a;--amber-p:#fff8e8;--cream:#faf6f0;--teal:#1a7a6e;--teal-p:#e8f5f3;--red:#c0392b;--red-p:#fdecea;--green:#16a34a;--green-p:#dcfce7;--border:#e2d8cc}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:var(--cream);min-height:100vh;padding:32px 16px 60px}.card{width:100%;max-width:720px;margin:0 auto;background:white;border-radius:20px;box-shadow:0 12px 48px rgba(0,0,0,0.14);overflow:hidden}.card-header{background:var(--navy);padding:32px 36px 28px}.tag{display:inline-block;background:var(--amber);color:var(--navy);font-weight:700;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:2px;margin-bottom:14px}.card-header h1{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,4vw,1.7rem);font-weight:900;color:white;line-height:1.2}.card-header h1 span{color:var(--amber)}.subtitle{color:rgba(255,255,255,.6);font-size:.88rem;margin-top:8px}.card-body{padding:36px}.welcome-text{font-size:.97rem;color:#444;line-height:1.75;margin-bottom:24px}.stats-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}.stat-pill{display:flex;align-items:center;gap:8px;background:var(--amber-p);border:1px solid var(--amber);border-radius:8px;padding:10px 14px;font-size:.85rem;font-weight:600;color:var(--amber-d)}.name-label{display:block;font-weight:600;font-size:.88rem;color:var(--navy);margin-bottom:8px}.name-input{width:100%;border:2px solid var(--border);border-radius:10px;padding:14px 18px;font-family:'DM Sans',sans-serif;font-size:1rem;background:var(--cream);outline:none;margin-bottom:24px;transition:border-color .2s}.name-input:focus{border-color:var(--amber);box-shadow:0 0 0 3px rgba(232,160,32,.2)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border:none;border-radius:10px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:600;transition:all .15s;width:100%}.btn:active{transform:scale(.97)}.btn-primary{background:var(--amber);color:var(--navy);box-shadow:0 4px 16px rgba(232,160,32,.35)}.btn-primary:hover{background:var(--amber-d);color:white}.btn-next{background:var(--navy);color:white;margin-top:18px;display:none}.btn-next:hover{background:#243260}.btn-next.show{display:inline-flex;animation:slideUp .3s ease}.progress-row{display:flex;align-items:center;gap:12px;margin-bottom:20px}.progress-label{font-size:.82rem;font-weight:600;color:#6b7280;white-space:nowrap}.progress-wrap{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden}.progress-fill{height:100%;background:var(--amber);border-radius:4px;transition:width .4s ease}.score-badge{background:var(--navy);color:var(--amber);font-size:.78rem;font-weight:700;padding:4px 10px;border-radius:20px;white-space:nowrap}.q-num{font-size:.78rem;font-weight:700;color:var(--amber-d);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}.q-text{font-family:'Playfair Display',serif;font-size:clamp(1rem,3vw,1.15rem);font-weight:700;color:var(--navy);line-height:1.45;margin-bottom:22px}.options{display:flex;flex-direction:column;gap:10px}.option{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border:2px solid var(--border);border-radius:12px;cursor:pointer;transition:all .18s;background:white;font-size:.93rem;line-height:1.5}.option:hover:not(.locked){border-color:var(--amber);background:var(--amber-p);transform:translateX(3px)}.opt-letter{width:28px;height:28px;flex-shrink:0;border-radius:50%;background:var(--border);color:var(--navy);font-weight:700;font-size:.85rem;display:flex;align-items:center;justify-content:center;transition:all .18s}.option:hover:not(.locked) .opt-letter{background:var(--amber);color:var(--navy)}.option.correct{border-color:var(--green);background:var(--green-p);cursor:default}.option.correct .opt-letter{background:var(--green);color:white}.option.wrong{border-color:var(--red);background:var(--red-p);cursor:default}.option.wrong .opt-letter{background:var(--red);color:white}.option.locked{cursor:default;opacity:.6}.option.locked:hover{transform:none}.feedback{margin-top:18px;border-radius:12px;padding:14px 16px;font-size:.88rem;line-height:1.6;display:none}.feedback.correct{background:var(--green-p);border-left:4px solid var(--green);color:#14532d;display:block;animation:slideUp .3s ease}.feedback.wrong{background:var(--red-p);border-left:4px solid var(--red);color:#7f1d1d;display:block;animation:slideUp .3s ease}.fb-title{font-weight:700;font-size:.8rem;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}.result-hero{text-align:center;padding:8px 0 24px}.result-emoji{font-size:3.5rem;display:block;margin-bottom:10px}.result-name{font-size:.9rem;color:#6b7280;margin-bottom:6px}.result-score{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,8vw,4rem);font-weight:900;color:var(--navy);line-height:1}.result-score span{color:var(--amber)}.result-pct{font-size:1.1rem;font-weight:600;color:#6b7280;margin:8px 0 16px}.result-bar-wrap{width:100%;height:12px;background:var(--border);border-radius:6px;overflow:hidden;margin-bottom:8px}.result-bar{height:100%;border-radius:6px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}.result-msg{font-size:.93rem;color:#444;line-height:1.65;background:var(--amber-p);border-radius:12px;padding:16px 18px;border-left:4px solid var(--amber);margin-top:18px;text-align:left}.btn-retry{background:var(--navy);color:white;margin-top:20px}.btn-retry:hover{background:#243260}.screen{display:none}.screen.active{display:block;animation:fadeIn .4s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media(max-width:500px){.card-body{padding:24px 18px}.card-header{padding:24px 20px}}</style></head><body><div class="card"><div class="card-header"><div class="tag">Oposiciones · Cuerpo de Maestros · Ed. Primaria</div><h1>Test de repaso del <span>TITULO_DEL_TEMA</span></h1><p class="subtitle">SUBTITULO_DEL_TEMA</p></div><div class="card-body"><div id="s-welcome" class="screen active"><p class="welcome-text">Bienvenido/a a este test de autoevaluación basado en los contenidos del tema. Las preguntas aparecerán de una en una con feedback inmediato.</p><div class="stats-row"><div class="stat-pill">📝 30 preguntas</div><div class="stat-pill">⏱️ ~15 minutos</div><div class="stat-pill">💡 Feedback inmediato</div></div><label class="name-label" for="pname">Introduce tu nombre para comenzar:</label><input id="pname" class="name-input" type="text" placeholder="Tu nombre completo..." autocomplete="off"><button class="btn btn-primary" onclick="startQuiz()">¡Comenzar el test! →</button></div><div id="s-quiz" class="screen"><div class="progress-row"><span class="progress-label" id="prog-label">Pregunta 1 de 30</span><div class="progress-wrap"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div><span class="score-badge" id="score-badge">✓ 0</span></div><div class="q-num" id="q-num">Pregunta 1</div><div class="q-text" id="q-text"></div><div class="options" id="q-options"></div><div class="feedback" id="q-feedback"></div><button class="btn btn-next" id="btn-next" onclick="nextQ()">Siguiente pregunta →</button></div><div id="s-result" class="screen"><div class="result-hero"><span class="result-emoji" id="r-emoji">🎉</span><div class="result-name" id="r-name"></div><div class="result-score"><span id="r-hits">0</span> / <span id="r-total">30</span></div><div class="result-pct" id="r-pct"></div><div class="result-bar-wrap"><div class="result-bar" id="r-bar" style="width:0%"></div></div></div><div class="result-msg" id="r-msg"></div><button class="btn btn-retry" onclick="retryQuiz()">🔄 Repetir el test</button></div></div></div><script>const QUESTIONS=ARRAY_DE_PREGUNTAS_AQUI;let questions=[],current=0,score=0,answered=false,playerName='';function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}function startQuiz(){const inp=document.getElementById('pname');playerName=inp.value.trim();if(!playerName){inp.style.borderColor='var(--red)';inp.focus();return;}questions=shuffle(QUESTIONS);current=0;score=0;answered=false;show('s-quiz');renderQ();}function renderQ(){answered=false;const q=questions[current],tot=questions.length;document.getElementById('prog-label').textContent='Pregunta '+(current+1)+' de '+tot;document.getElementById('prog-fill').style.width=Math.round((current/tot)*100)+'%';document.getElementById('score-badge').textContent='✓ '+score;document.getElementById('q-num').textContent='Pregunta '+(current+1);document.getElementById('q-text').textContent=q.q;const letters=['A','B','C','D'];const opts=document.getElementById('q-options');opts.innerHTML='';q.opts.forEach((o,i)=>{const d=document.createElement('div');d.className='option';d.innerHTML='<span class="opt-letter">'+letters[i]+'</span><span>'+o+'</span>';d.addEventListener('click',()=>selectOpt(i));opts.appendChild(d);});const fb=document.getElementById('q-feedback');fb.className='feedback';fb.innerHTML='';document.getElementById('btn-next').className='btn btn-next';}function selectOpt(idx){if(answered)return;answered=true;const q=questions[current];document.querySelectorAll('.option').forEach(o=>o.classList.add('locked'));const opts=document.querySelectorAll('.option');if(idx===q.ans){opts[idx].classList.add('correct');score++;document.getElementById('score-badge').textContent='✓ '+score;}else{opts[idx].classList.add('wrong');opts[q.ans].classList.add('correct');}const fb=document.getElementById('q-feedback');fb.className='feedback '+(idx===q.ans?'correct':'wrong');fb.innerHTML='<div class="fb-title">'+(idx===q.ans?'✅ ¡Correcto!':'❌ Respuesta incorrecta')+'</div><div>'+q.exp+'</div>';const btn=document.getElementById('btn-next');btn.textContent=current===questions.length-1?'🏁 Ver mi resultado':'Siguiente pregunta →';btn.className='btn btn-next show';}function nextQ(){current++;if(current>=questions.length){showResult();}else{renderQ();document.querySelector('.card').scrollIntoView({behavior:'smooth',block:'start'});}}function showResult(){show('s-result');const tot=questions.length,pct=Math.round((score/tot)*100);document.getElementById('r-name').textContent=playerName;document.getElementById('r-hits').textContent=score;document.getElementById('r-total').textContent=tot;document.getElementById('r-pct').textContent=pct+'% de aciertos';const bar=document.getElementById('r-bar');bar.style.background=pct>=75?'var(--green)':pct>=50?'var(--amber)':'var(--red)';setTimeout(()=>{bar.style.width=pct+'%';},100);let emoji,msg;if(pct===100){emoji='🏆';msg='<strong>¡Perfecto, '+playerName+'!</strong> Has acertado las '+tot+' preguntas.';}else if(pct>=80){emoji='🎉';msg='<strong>¡Excelente, '+playerName+'!</strong> Dominas muy bien el tema.';}else if(pct>=60){emoji='👍';msg='<strong>Buen trabajo, '+playerName+'.</strong> Base sólida. Repasa los apartados donde has fallado.';}else if(pct>=40){emoji='📚';msg='<strong>Sigue practicando, '+playerName+'.</strong> Vuelve a repasar el tema e inténtalo de nuevo.';}else{emoji='💪';msg='<strong>Ánimo, '+playerName+'.</strong> El tema necesita más estudio. ¡Tú puedes!';}document.getElementById('r-emoji').textContent=emoji;document.getElementById('r-msg').innerHTML=msg;}function retryQuiz(){questions=shuffle(QUESTIONS);current=0;score=0;answered=false;show('s-quiz');renderQ();document.querySelector('.card').scrollIntoView({behavior:'smooth',block:'start'});}document.getElementById('pname').addEventListener('keydown',e=>{if(e.key==='Enter')startQuiz();});<\/script></body></html>

Rellena TITULO_DEL_TEMA con el nombre del tema, SUBTITULO_DEL_TEMA con el subtítulo, y ARRAY_DE_PREGUNTAS_AQUI con exactamente este formato (30 objetos):
[{"q":"Pregunta","opts":["A","B","C","D"],"ans":0,"exp":"Explicación detallada."}]
donde ans es el índice 0-3 de la respuesta correcta. SOLO HTML. Sin markdown.`;
}

// ── ENDPOINT ─────────────────────────────────────────────────
app.post('/generate', async (req, res) => {
  const { type, fileBase64 } = req.body;
  if (!type || !fileBase64) return res.status(400).json({ error: 'Faltan parámetros.' });
  if (!['infografia','discurso','test'].includes(type)) return res.status(400).json({ error: 'Tipo no válido.' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'API key de Gemini no configurada.' });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { inline_data: { mime_type: 'application/pdf', data: fileBase64 } },
          { text: getPrompt(type) }
        ]}],
        generationConfig: { maxOutputTokens: 16000, temperature: 0.5 }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Error HTTP ${response.status}`);
    }

    const data = await response.json();
    let html = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    html = html.replace(/^```html?\s*/i,'').replace(/```\s*$/,'').trim();

    if (!html.toLowerCase().includes('<!doctype') && !html.toLowerCase().includes('<html')) {
      throw new Error('La respuesta no contiene HTML válido. Inténtalo de nuevo.');
    }

    res.json({ html });

  } catch(err) {
    console.error('Error Gemini:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor activo en puerto ${PORT}`));
