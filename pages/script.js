window.addEventListener('pageshow', function (event) {
    if (event.persisted) window.location.reload();
});

localStorage.removeItem('celestial'); 

const fechaExacta = new Date("2025-05-05T04:00:00"); 
const latitudBarranqueras = -27.48; 
const longitudBarranqueras = -58.93; 

const esMovil = window.innerWidth <= 768;

// EL TRUCO MAESTRO:
// 1. renderSize: Obligamos a la librería a dibujar en calidad Desktop (líneas finas, estrellas sutiles)
const renderSize = esMovil ? 1600 : Math.max(window.innerWidth, window.innerHeight) * 1.5;

// 2. cssSize: Es el tamaño real que ocupará en la pantalla para que puedas navegar cómodamente sin "mucho zoom"
const cssSize = Math.max(window.innerWidth, window.innerHeight) * (esMovil ? 1.3 : 1.5);

const mapWrapper = document.getElementById("map-wrapper");
const mapContainer = document.getElementById("celestial-map");

const poolRecuerdos = [
    { type: "text", title: "Nota #1", content: "Te amo." },
    { type: "text", title: "Nota #2", content: "Estoy muy orgulloso de la mujer que sos." },
    { type: "video", title: "El Tesoro", content: "El Mató a un Policía Motorizado.", url: "../videos/1.mp4" },
    { type: "audio", title: "La Noche Eterna - El Mató a un Policía Motorizado", content: "La Noche Eterna es una poesía viva que me recuerda a la noche mas importante de mi vida, y una melodía final que me transporta al momento exacto en el que seguí mi corazón y empecé a amarte sin cadenas. Nunca se menciona en la letra, pero se describe a tal punto de que sabes que se habla de ella, de esa noche eterna, esa noche que un día empezó y nunca va a terminar, el día que no tiene vuelta atrás, una noche mágica, especial, donde se empieza de nuevo, donde nos volvimos complices del caos, el oro a la medianoche, donde no quedó nada ni nadie más, porque todos se escondieron ante nuestros ojos, el mundo se hizo nuestro porque lo teníamos frente a nosotros, envuelto en nuestros brazos.", url: "../audios/lanocheeterna.mp3" },
    { type: "text", title: "Nota #3", content: "Donde estemos juntos será nuestro hogar." },
    { type: "text", title: "Nota #4", content: "Tu risa es el único sonido que me gustaría escuchar por la eternidad." },
    { type: "text", title: "Nota #5", content: "Viajar por las estrellas debería sentirse igual que hundirme en tus abrazos." },
    { type: "text", title: "Nota #6", content: "Te amo hasta el fin de los tiempos." },
    { type: "text", title: "Nota #7", content: "Si no sos el amor de mi vida, entonces esta no es mi vida." },
    { type: "text", title: "Nota #8", content: "Te extraño cada vez que sea hoy." },
    { type: "text", title: "Nota #9", content: "Voy a estar con vos cuando caigas y cuando vueles." },
    { type: "text", title: "Nota #10", content: "Todo lo que hago es para vos." },
    { type: "text", title: "Nota #11", content: "Caminar con vos es el único camino posible." },
    { type: "audio", title: "Violencia - El Mató a un Policía Motorizado", content: "A veces nos golpean tan fuerte que nos deja la mirada perdida, llenos de corazas y de una violencia que en realidad es puro dolor acumulado. Pero el amor de verdad no entiende el temor por los fantasmas; se queda a abrazarlos. Para mí, esta canción es mirarte a los ojos y decirte que acá podés bajar la guardia, que no hace falta que seas fuerte todo el tiempo. Ser tu tregua en medio de la tormenta y ver cómo tu luz vuelve a brillar es lo más valioso que tengo. Cuidarte es mi forma de agradecerte por confiar en mí, y por cada día que me regalás.", url: "../audios/violencia.mp3" },
    { type: "text", title: "Nota #12", content: "Te elegiría hoy, mañana, y en todas las vidas que me quedan por vivir." },
    { type: "text", title: "Nota #13", content: "Si todo en este mundo cambia, que lo único que permanezca sea nosotros." },
    { type: "text", title: "Nota #14", content: "Tu paz es mi mayor tesoro." },
    { type: "text", title: "Nota #15", content: "Cada día es una oportunidad más para amarte un poquito mejor." },
    { type: "text", title: "Nota #16", content: "Quiero que me regales cada segundo que te quede por vivir." },
    { type: "audio", title: "Limón y Sal - Julieta Venegas", content: "Yo te quiero, con Limón y Sal.", url: "../audios/limonysal.mp3" },
    { type: "text", title: "Nota #17", content: "Mi lugar seguro siempre vas a ser vos." },
    { type: "text", title: "Nota #18", content: "Hay una conexión imborrable que construimos día a día." },
    { type: "text", title: "Nota #19", content: "Un paso muy pequeño sigue siendo un avance." },
    { type: "text", title: "Nota #20", content: "Tu valor no lo define el resultado de un mal día, si lo es tu inquebrantable convicción de seguir adelante." },
    { type: "audio", title: "Eres - Café Tacvba", content: "Sos el pensamiento más profundo que me habita, el centro de gravedad de todo mi universo. No sé cómo explicarlo sin que suene enorme: sos mi salvación, mi esperanza y la única certeza que tengo. Estar sin vos es estar apagado, porque de verdad sos todo lo que le da sentido a mi vida. No hace falta dar vueltas ni buscar palabras raras cuando la realidad es tan gigante: sos lo que más quiero en este mundo, lo que habita en mi mente cada minuto del día y lo único que necesito para estar completo. Acá me tenés hoy, y acá me voy a quedar sentado a tu lado hasta el final.", url: "../audios/eres.mp3" },
    { type: "text", title: "Nota #21", content: "Creo que sos la pieza que le faltaba a mi realidad para que todo encajara." },
    { type: "text", title: "Nota #22", content: "When everything is uncertain, your love is my only certainty." },
    { type: "text", title: "Nota #23", content: "Te amo en los días buenos, pero te elijo mucho mas cuando todo cuesta." },
    { type: "text", title: "Nota #24", content: "Tu forma de ver el mundo me inspira a ser mejor." },
    { type: "text", title: "Nota #25", content: "Que afortunado soy de tenerte para mi todos los días." },
    { type: "text", title: "Nota #26", content: "Que el ruido de las expectativas nunca apague la voz de tus sueños." },
    { type: "text", title: "Nota #27", content: "'Creo en tu sonrisa, creo en mí si te veo hoy, y me pedís que no me rinda.'" },
    { type: "text", title: "Nota #28", content: "Superaste mil días difíciles antes, este no va a ser la excepción, mi amor." },
    { type: "text", title: "Nota #29", content: "Sos la prueba de que el Destino es perfecto y todo pasa cuando tiene que." },
    { type: "text", title: "Nota #30", content: "Tu Valor no disminuye por un mal resultado; aprendé, ajustá, y volvé a intentar." },
    { type: "text", title: "Nota #31", content: "No dejes que el cansancio de hoy te haga olvidar tu propósito de mañana." },
    { type: "text", title: "Nota #32", content: "Amo como me obligas a mirar dentro de mí cuando estoy con vos." },
    { type: "text", title: "Nota #33", content: "Mi acto mas valiente es elegirte cada día, incluso cuando me cuesta quererme a mi." },
    { type: "text", title: "Nota #34", content: "A veces me pregunto si sabés cuanto impacto tenés en mi forma de entender la felicidad." },
    { type: "audio", title: "Vuelta por el Universo - Gustavo Cerati", content: "Habitamos una frecuencia infinita, un viaje suspendido en el espacio donde el tiempo deja de correr. Nos desprendemos de la tierra y nos transformamos en pura luz, navegando entre planetas, invisibles para el resto del mundo. No hay distancia ni límites que contengan lo que somos cuando nos sintonizamos: dos almas que flotan en la inmensidad, fundidas en un sonido sutil que no va a callarse nunca.", url: "../audios/vueltaporeluniverso.mp3" },
    { type: "text", title: "Nota #35", content: "Lo que hoy te quiebra, mañana va a ser el cimiento de lo que vas a construir para protegerte." },
    { type: "text", title: "Nota #36", content: "La maravillosa persona que sos, es el resultado de tus batallas, no de tus derrotas, separá ambas cosas." },
    { type: "text", title: "Nota #37", content: "Si no sos mi todo, estoy seguro de que sos el lugar donde quiero guardar mi todo." },
    { type: "text", title: "Nota #38", content: "Te elegiría hoy, mañana, y en todas las vidas que me quedan por vivir." },
    { type: "text", title: "Nota #39", content: "Si estás dudando, significa que estás intentando romper un techo que ya te queda chico." },
    { type: "text", title: "Nota #40", content: "Si el mundo te hace sentir insuficiente, refugiate en la certeza de que para mi sos todo lo que está bien." },
    { type: "text", title: "Nota #41", content: "Sos mucho más que los problemas que te rodean, sos la fuerza que intenta, aunque el alma esté débil." },
    { type: "text", title: "Nota #42", content: "No prometo que siempre sea fácil, pero sí que siempre voy a elegirte de nuevo." },
    { type: "text", title: "Nota #43", content: "Bailás como la princesa del reino neurótico de mi niñez." },
    { type: "text", title: "Nota #44", content: "Quizás en el plan de dios, encontrarte fue su manera de pedirme perdón." },
    { type: "text", title: "Nota #45", content: "No es tu culpa, la autenticidad es un lenguaje que no todos están listos para traducir." },
    { type: "audio", title: "Crema de Estrellas - Soda Stereo", content: "Recordar tus gustos, tu olor, tus palabras y la química exacta de tu cuerpo es volver a habitar ese refugio donde el tiempo no corre. Es perderse en una inmensa quietud donde no existe el espacio ni las distancias, solo la certeza de que tu cuerpo está grabado en lo más profundo de mis sentidos.", url: "../audios/cremadeestrellas.mp3" },
    { type: "text", title: "Nota #46", content: "Tratate con la misma piedad con la que tratarías a alguien a quien amás profundamente." },    
    { type: "text", title: "Nota #47", content: "Mi amor trasciende cualquier palabra, y cualquier acción, haces que mi corazón se sintiera como si hablara un idioma olvidado." },     
    { type: "text", title: "Nota #48", content: "La realidad es que yo solo existo cuando estoy con vos." },
    { type: "text", title: "Nota #49", content: "A veces el amor es solo la decisión de sostenernos el uno al otro mientras el mundo gira sin preguntarnos." },
    { type: "text", title: "Nota #50", content: "La energía de mi amor es lo único constante va a seguir brillando cuando nos alcance la nada." },    
    { type: "audio", title: "Paraíso Lunar - Siddhartha", content: "Pensamos que lo nuestro era una coincidencia de la que podíamos escapar, pero tocamos fibras demasiado profundas como para buscar en otro lado. No vamos a vivir lo suficiente para saber o mínimamente entender lo que hay mas allá, pero ver todo lo que generás en mí, es ver estallar el universo para que nazca algo completamente nuevo. ", url: "../audios/paraisolunar.mp3" },
    { type: "text", title: "Nota #51", content: "Sos el reflejo del universo intentando conocerse a sí mismo; no te frenes, que el camino es eterno." },     
    { type: "text", title: "Nota #52", content: "Nunca vuelvas a cargar con los pecados ni el peso de quienes no supieron cuidar su corazón, eso no te pertenece." },
    { type: "text", title: "Nota #53", content: "Hay una inneludible gravedad en tu entereza, yo solo orbito al rededor de ella." },
    { type: "text", title: "Nota #54", content: "Sos la respuesta a todas las preguntas que nunca me animé a formular." },    
    { type: "text", title: "Nota #55", content: "Hay una memoria en mi piel que te reconoce antes de que llegues." },     
    { type: "text", title: "Nota #56", content: "Las estrellas mas grandes del universo un día fueron solo polvo." },
    { type: "text", title: "Nota #57", content: "Encontrarte me obligó a creer que hay algo mucho mas grande que nosotros dos." },
    { type: "audio", title: "Luz de Día - Los Enanitos Verdes", content: "Nuestras vidas pueden haber tomado caminos distintos, pero esta noche el tiempo se dobla para darnos la razón. Besarte y decir tu nombre es mi forma de mirar el cielo; sos quién me salva de la pena y le da color a mis acuarelas. Y si tengo que frenar el mundo entero para que esto pase una y otra vez, lo haría sin dudarlo; creo yo, que no necesito nada mas que vos para agradecer mi vida.", url: "../audios/luzdedia.mp3" },
    { type: "text", title: "Nota #58", content: "Mi corazón te pertenece y hace mucho dejó de pelear por su libertad." },    
    { type: "text", title: "Nota #59", content: "Ninguna de las cosas mas hermosas de esta vida tendrían sentido sin vos." },     
    { type: "text", title: "Nota #60", content: "Nada me aterra mas que la idea de que la vida no me alcance para amarte lo suficiente." },
    { type: "text", title: "Nota #61", content: "Decirte te amo es la confesión que esconde toda la esperanza que me queda de vida." },
    { type: "text", title: "Nota #62", content: "Te elijo con el mayor egoísmo de saber que solo yo quiero saber lo hermosa que sos." },    
    { type: "audio", title: "Donde Vamos - Mancha de Rolando", content: "Mientras el resto del mundo corre sin dirección, nuestro mayor secreto es saber frenar. Para mí se volvió algo muy simple: un cielo enorme, la tranquilidad de la noche y estar abrazado a vos, que sos mi cable a tierra y el fuego que me enciende. Si todo lo demás se vuelve un caos, si dios quiere que corramos mas rápido, si alguien te pide mas de lo que podes dar, no me importa; dejamos todo y empezamos otra vez. Al final del día, no me interesa a dónde ni como vamos, siempre y cuando sea con vos.", url: "../audios/dondevamos.mp3" },
    { type: "text", title: "Nota #63", content: "Tu angustia nunca va a ser algo que amargue mis días, es el combustible de mi espíritu para pelear por un mundo mejor, para vos." },     
    { type: "text", title: "Nota #64", content: "Tenes en vos la energía para transformar lo imposible en lo posible." },
    { type: "text", title: "Nota #65", content: "Lo único real del tiempo es lo que dejas grabado en mi corazón." },
    { type: "text", title: "Nota #66", content: "Te anhelo con una devoción que no busca mas que verte en paz al final del día." },    
    { type: "text", title: "Nota #67", content: "Tus días difíciles son también mi excusa para mostrarte que mi amor no conoce límites." },     
    { type: "text", title: "Nota #68", content: "Te voy a estar buscando y esperando toda la eternidad, en todo inicio y final." },
    { type: "text", title: "Nota #69", content: "Tu naturaleza es llenar de vida todo lo que amás." },
    { type: "text", title: "Nota #70", content: "Sos mi primer pensamiento, y mi ultima rendición, un ciclo del que no quiero, ni sabría como salir." },    
    { type: "text", title: "Nota #71", content: "Mi fuerza no es mas que un reflejo de tu amor." },     
    { type: "text", title: "Nota #72", content: "Si un día me olvido de lo que soy, espero que mis palabras me recuerden que mi única identidad es amarte." },
    { type: "audio", title: "11 y 6 - Fito Paez", content: "Somos una fuerza invencible, superior a los dioses, capaz de hacer desaparecer el resto del mundo. Somos el amor como salvación, y nada lo describe mejor que esta canción, dar la luna con tal de verte reír, y demostrar que la felicidad real se construye con lo mínimo cuando estás con la persona indicada, pero siempre apuntando a más. ", url: "../audios/11y6.mp3" }
];

const configCielo = {
  width: renderSize, height: renderSize, // DIBUJO EN CALIDAD GIGANTE
  projection: "stereographic", transform: "equatorial", center: [269.47, -27.48, 0], 
  date: fechaExacta, location: [latitudBarranqueras, longitudBarranqueras],
  stars: { show: true, limit: 5.5, size: 4, colors: false, style: { fill: "#ffffff", opacity: 1 }, names: false },
  dsos: { show: false }, 
  constellations: { show: true, names: false, style: { stroke: "rgba(255, 255, 255, 0.2)", width: 1 } },
  mw: { show: true, style: { fill: "rgba(255, 255, 255, 0.05)" } },
  lines: { graticule: { show: false }, equatorial: { show: false }, ecliptic: { show: false }, galactic: { show: false }, supergalactic: { show: false } },
  background: { fill: "transparent", stroke: "transparent", opacity: 0 }, datapath: "https://ofrohn.github.io/data/", interactive: false, remember: false
};

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const cardContent = document.getElementById("card-content");
    const closeBtn = document.getElementById("close-card");
    const btnToggle = document.getElementById("btn-toggle-view");
    const btnOpenList = document.getElementById("btn-open-list");
    const btnDownloadMap = document.getElementById("btn-download-map");
    const btnBackCielo = document.getElementById("btn-back-cielo");
    const pantallaLista = document.getElementById("pantalla-lista");
    const tabTextos = document.getElementById("tab-textos");
    const tabMultimedia = document.getElementById("tab-multimedia");
    const secTextos = document.getElementById("section-textos");
    const secMultimedia = document.getElementById("section-multimedia");
    const bgMusic = document.getElementById("bg-music");
    const sfxStar = document.getElementById("sfx-star");
    const sfxClose = document.getElementById("sfx-close");
    let musicaIniciada = false;

    if (bgMusic) {
        const tiempoGuardado = sessionStorage.getItem('universo_audio_time');
        if (tiempoGuardado) {
            bgMusic.currentTime = parseFloat(tiempoGuardado);
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => { musicaIniciada = true; }).catch(e => console.log("Sincronizando audio..."));
        }
        document.body.addEventListener('click', () => {
            if (!musicaIniciada) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(e => {});
                musicaIniciada = true;
            }
        }, { once: true });
    }

    // CORRECCIÓN DE DESCARGA: Pinta el fondo azul nocturno exacto en altísima calidad
    if (btnDownloadMap) {
        btnDownloadMap.addEventListener("click", () => {
            const originalCanvas = document.querySelector("#celestial-map canvas");
            if (originalCanvas) {
                const compositeCanvas = document.createElement("canvas");
                compositeCanvas.width = originalCanvas.width;
                compositeCanvas.height = originalCanvas.height;
                const ctx = compositeCanvas.getContext("2d");

                const cx = compositeCanvas.width / 2;
                const cy = compositeCanvas.height / 2;
                const r = Math.max(cx, cy);
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, "#050510"); 
                gradient.addColorStop(1, "#010103"); 
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, compositeCanvas.width, compositeCanvas.height);
                ctx.drawImage(originalCanvas, 0, 0);

                const link = document.createElement("a");
                link.download = "nuestro-cielo-infinito.png";
                link.href = compositeCanvas.toDataURL("image/png", 1.0);
                link.click();
            }
        });
    }

    if (mapContainer && typeof Celestial !== 'undefined') {
        mapContainer.innerHTML = "";
        Celestial.display(configCielo);
        Celestial.skyview({ date: fechaExacta, location: [latitudBarranqueras, longitudBarranqueras] });
        
        // APLICAMOS EL "ACHICAMIENTO" FISICO LUEGO DE DIBUJAR EN MODO PC
        mapContainer.style.width = cssSize + "px";
        mapContainer.style.height = cssSize + "px";
        
        crearEstrellasDiarias();

        setTimeout(() => {
            mapWrapper.scrollLeft = (cssSize - window.innerWidth) / 2;
            mapWrapper.scrollTop = (cssSize - window.innerHeight) / 2 + 100;
        }, 150);
    }

    if (btnOpenList && pantallaLista) {
        btnOpenList.addEventListener("click", () => {
            renderizarLista();
            pantallaLista.classList.add("active");
            if(musicaIniciada && bgMusic) desvanecerVolumen(bgMusic, 0.1, 1000);
        });
        if (btnBackCielo) {
            btnBackCielo.addEventListener("click", () => {
                pantallaLista.classList.remove("active");
                if(musicaIniciada && bgMusic) desvanecerVolumen(bgMusic, 0.5, 1000);
            });
        }
    }

    if (tabTextos && tabMultimedia) {
        tabTextos.addEventListener("click", () => {
            tabTextos.classList.add("active"); tabMultimedia.classList.remove("active");
            secTextos.classList.add("active"); secMultimedia.classList.remove("active");
        });
        tabMultimedia.addEventListener("click", () => {
            tabMultimedia.classList.add("active"); tabTextos.classList.remove("active");
            secMultimedia.classList.add("active"); secTextos.classList.remove("active");
        });
    }

    if (btnToggle && mapContainer) {
        let vistaCompleta = false;
        btnToggle.addEventListener("click", () => {
            vistaCompleta = !vistaCompleta;
            if (vistaCompleta) {
                const ladoMenorPantalla = Math.min(window.innerWidth, window.innerHeight);
                const escala = (ladoMenorPantalla * 0.95) / cssSize; 
                mapContainer.style.transform = `scale(${escala})`;
                btnToggle.innerHTML = "🔍"; 
                mapWrapper.style.overflow = "hidden"; 
            } else {
                mapContainer.style.transform = "scale(1)";
                btnToggle.innerHTML = "🌌"; 
                mapWrapper.style.overflow = "auto"; 
            }
            mapWrapper.scrollLeft = (cssSize - window.innerWidth) / 2;
            mapWrapper.scrollTop = (cssSize - window.innerHeight) / 2 + 100;
        });
    }

    if (mapWrapper) {
        let isDown = false; let startX, startY, scrollLeft, scrollTop;
        mapWrapper.addEventListener('mousedown', (e) => {
            if (mapContainer && (mapContainer.style.transform !== "scale(1)" && mapContainer.style.transform !== "")) return; 
            isDown = true; startX = e.pageX - mapWrapper.offsetLeft; startY = e.pageY - mapWrapper.offsetTop;
            scrollLeft = mapWrapper.scrollLeft; scrollTop = mapWrapper.scrollTop;
        });
        mapWrapper.addEventListener('mouseleave', () => { isDown = false; });
        mapWrapper.addEventListener('mouseup', () => { isDown = false; });
        mapWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - mapWrapper.offsetLeft; const y = e.pageY - mapWrapper.offsetTop;
            const walkX = (x - startX) * 1.5; const walkY = (y - startY) * 1.5;
            mapWrapper.scrollLeft = scrollLeft - walkX; mapWrapper.scrollTop = scrollTop - walkY;
        });
    }

    function desvanecerVolumen(audio, volumenDestino, duracionMs) {
        if (!audio) return;
        clearInterval(audio.intervaloFade);
        const pasos = 25; const tiempoPaso = duracionMs / pasos;
        const cambioVolumen = (volumenDestino - audio.volume) / pasos;
        let pasoActual = 0;
        audio.intervaloFade = setInterval(() => {
            pasoActual++;
            audio.volume = Math.max(0, Math.min(1, audio.volume + cambioVolumen));
            if (pasoActual >= pasos) {
                clearInterval(audio.intervaloFade);
                audio.volume = Math.max(0, volumenDestino);
                if (volumenDestino === 0) audio.pause();
            }
        }, tiempoPaso);
    }

    if (closeBtn) {
        const cerrarPopup = (e) => {
            e.preventDefault();
            const medias = cardContent.querySelectorAll('video, audio');
            medias.forEach(media => media.pause());
            overlay.classList.add("hidden"); 
            
            if(sfxClose) {
                sfxClose.currentTime = 0;
                sfxClose.volume = 0.5;
                sfxClose.play().catch(e => {});
            }
            
            if(musicaIniciada && bgMusic) {
                if (pantallaLista && pantallaLista.classList.contains("active")) {
                    bgMusic.play().catch(e=>{});
                    desvanecerVolumen(bgMusic, 0.1, 1000); 
                } else {
                    bgMusic.play().catch(e=>{});
                    desvanecerVolumen(bgMusic, 0.5, 1000); 
                }
            }
        };
        closeBtn.addEventListener("click", cerrarPopup);
        closeBtn.addEventListener("touchend", cerrarPopup);
    }

    function obtenerDatosDiarios() {
        const DIA_EN_MS = 24 * 60 * 60 * 1000;
        const ahora = Date.now();
        let estado = JSON.parse(localStorage.getItem('zaira_estado_universo'));

        if (!estado || (ahora - estado.timestamp > DIA_EN_MS)) {
            let unlockedLista = estado ? estado.unlockedLista : [];
            let estrellasHoy = [];

            if (!estado && unlockedLista.length === 0) {
                let indicesTextos = poolRecuerdos.map((r, i) => i).filter(i => poolRecuerdos[i].type === 'text');
                let random1 = indicesTextos.splice(Math.floor(Math.random() * indicesTextos.length), 1)[0];
                let random2 = indicesTextos.splice(Math.floor(Math.random() * indicesTextos.length), 1)[0];
                
                estrellasHoy = [2, 3, random1, random2]; 
            } else {
                let disponibles = poolRecuerdos.map((_, i) => i).filter(i => !unlockedLista.includes(i));
                for(let i = 0; i < 4 && disponibles.length > 0; i++) {
                    let rnd = Math.floor(Math.random() * disponibles.length);
                    estrellasHoy.push(disponibles.splice(rnd, 1)[0]);
                }
            }

            let posiciones = estrellasHoy.map(() => ({
                top: Math.floor(Math.random() * 60 + 20) + "%",
                left: Math.floor(Math.random() * 60 + 20) + "%"
            }));

            estado = { timestamp: ahora, unlockedLista: unlockedLista, estrellasHoy: estrellasHoy, posiciones: posiciones };
            localStorage.setItem('zaira_estado_universo', JSON.stringify(estado));
        }
        return estado;
    }

    function desbloquearEnLista(index) {
        let estado = JSON.parse(localStorage.getItem('zaira_estado_universo'));
        if (estado && !estado.unlockedLista.includes(index)) {
            estado.unlockedLista.push(index);
            localStorage.setItem('zaira_estado_universo', JSON.stringify(estado));
            renderizarLista();
        }
    }

    function configurarControlesCustom(playerContainer, isVideo) {
        const media = playerContainer.querySelector('.custom-media-element');
        const btnPlay = playerContainer.querySelector('.custom-play-btn');
        const progressBar = playerContainer.querySelector('.custom-progress');
        const timeDisplay = playerContainer.querySelector('.custom-time');
        
        btnPlay.innerHTML = "▶";

        btnPlay.addEventListener('click', () => {
            if (media.paused) { 
                media.play(); 
                btnPlay.innerHTML = "❚❚"; 
                if (musicaIniciada && bgMusic) {
                    desvanecerVolumen(bgMusic, 0, 1500);
                }
            } 
            else { 
                media.pause(); 
                btnPlay.innerHTML = "▶"; 
            }
        });

        media.addEventListener('timeupdate', () => {
            if (!media.duration) return;
            progressBar.value = (media.currentTime / media.duration) * 100;
            const curM = Math.floor(media.currentTime / 60);
            const curS = Math.floor(media.currentTime % 60).toString().padStart(2, '0');
            const durM = Math.floor(media.duration / 60);
            const durS = Math.floor(media.duration % 60).toString().padStart(2, '0');
            timeDisplay.textContent = `${curM}:${curS} / ${durM}:${durS}`;
        });

        progressBar.addEventListener('input', () => {
            media.currentTime = (progressBar.value / 100) * media.duration;
        });

        if (isVideo) {
            const btnFullscreen = playerContainer.querySelector('.custom-fs-btn');
            const wrapper = playerContainer.querySelector('.custom-player-wrapper');
            btnFullscreen.addEventListener('click', () => {
                if (wrapper.requestFullscreen) wrapper.requestFullscreen();
                else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
                else if (wrapper.mozRequestFullScreen) wrapper.mozRequestFullScreen();
                else if (wrapper.msRequestFullscreen) wrapper.msRequestFullscreen();
            });
        }
    }

    function desplegarRecuerdo(recuerdo) {
        if(sfxStar) { sfxStar.currentTime = 0; sfxStar.volume = 0.6; sfxStar.play().catch(e => {}); }

        let estructuraHtml = `<h3>${recuerdo.title}</h3>`;
        if (recuerdo.type === "text") {
            estructuraHtml += `<p class="note">${recuerdo.content}</p>`;
            cardContent.innerHTML = estructuraHtml;
        } else if (recuerdo.type === "video") {
            estructuraHtml += `<p class="subtitle">${recuerdo.content}</p>`;
            estructuraHtml += `
                <div class="custom-player-wrapper video-mode">
                    <video class="custom-media-element" playsinline><source src="${recuerdo.url}" type="video/mp4"></video>
                    <div class="custom-player-controls">
                        <button class="custom-play-btn">▶</button>
                        <input type="range" class="custom-progress" value="0" min="0" max="100">
                        <span class="custom-time">0:00 / 0:00</span>
                        <a href="${recuerdo.url}" download class="custom-dl-btn" title="Descargar">📥</a>
                        <button class="custom-fs-btn">⛶</button>
                    </div>
                </div>`;
            cardContent.innerHTML = estructuraHtml;
            configurarControlesCustom(cardContent, true);
        } else if (recuerdo.type === "audio") {
            estructuraHtml += `<p class="subtitle">${recuerdo.content}</p>`;
            estructuraHtml += `
                <div class="custom-player-wrapper audio-mode">
                    <audio class="custom-media-element"><source src="${recuerdo.url}" type="audio/mpeg"></audio>
                    <div class="custom-player-controls">
                        <button class="custom-play-btn">▶</button>
                        <input type="range" class="custom-progress" value="0" min="0" max="100">
                        <span class="custom-time">0:00 / 0:00</span>
                        <a href="${recuerdo.url}" download class="custom-dl-btn" title="Descargar">📥</a>
                    </div>
                </div>`;
            cardContent.innerHTML = estructuraHtml;
            configurarControlesCustom(cardContent, false);
        }

        overlay.classList.remove("hidden");
    }

    function crearEstrellasDiarias() {
        const estadoCielo = obtenerDatosDiarios();
        estadoCielo.estrellasHoy.forEach((indiceRecuerdo, i) => {
            const recuerdo = poolRecuerdos[indiceRecuerdo];
            const pos = estadoCielo.posiciones[i];
            const estrellaNodo = document.createElement("div");
            estrellaNodo.className = "interactive-star";
            // Posicionamiento basado en el cssSize real para que coincida visualmente
            estrellaNodo.style.top = pos.top;
            estrellaNodo.style.left = pos.left;
            
            const abrirNota = (e) => {
                e.preventDefault();
                desbloquearEnLista(indiceRecuerdo);
                desplegarRecuerdo(recuerdo);
            };

            estrellaNodo.addEventListener("touchend", abrirNota);
            estrellaNodo.addEventListener("click", abrirNota);
            mapContainer.appendChild(estrellaNodo);
        });
    }

    if (document.getElementById("container-textos")) {
        renderizarLista();
    }

    function renderizarLista() {
        const containerTextos = document.getElementById("container-textos");
        const containerMultimedia = document.getElementById("container-multimedia");
        if(!containerTextos) return;

        containerTextos.innerHTML = "";
        containerMultimedia.innerHTML = "";

        let estado = JSON.parse(localStorage.getItem('zaira_estado_universo'));
        let unlockedLista = estado ? estado.unlockedLista : []; 
        let favoritos = JSON.parse(localStorage.getItem('zaira_favoritos')) || [];

        unlockedLista.sort((a, b) => a - b);

        unlockedLista.forEach(index => {
            const recuerdo = poolRecuerdos[index];
            if (!recuerdo) return;

            const cardNodo = document.createElement("div");
            cardNodo.className = "item-card";
            if (favoritos.includes(index)) cardNodo.classList.add("is-favorite");

            cardNodo.innerHTML = `
                <h4>${recuerdo.title}</h4>
                <span>Haz clic para abrir</span>
                <button class="fav-btn">${favoritos.includes(index) ? "♥" : "♡"}</button>
            `;
            
            cardNodo.addEventListener("click", () => desplegarRecuerdo(recuerdo));

            const btnFav = cardNodo.querySelector('.fav-btn');
            btnFav.addEventListener("click", (e) => {
                e.stopPropagation();
                let favs = JSON.parse(localStorage.getItem('zaira_favoritos')) || [];
                if (favs.includes(index)) {
                    favs = favs.filter(i => i !== index);
                    cardNodo.classList.remove("is-favorite");
                    btnFav.innerHTML = "♡";
                } else {
                    favs.push(index);
                    cardNodo.classList.add("is-favorite");
                    btnFav.innerHTML = "♥";
                }
                localStorage.setItem('zaira_favoritos', JSON.stringify(favs));
            });

            if (recuerdo.type === "text") { containerTextos.appendChild(cardNodo); } 
            else { containerMultimedia.appendChild(cardNodo); }
        });

        if(containerTextos.children.length === 0) containerTextos.innerHTML = "<p style='color: #a0aec0; font-weight:300; font-style:italic; grid-column: 1/-1; text-align:center;'>Aún no has descubierto notas.</p>";
        if(containerMultimedia.children.length === 0) containerMultimedia.innerHTML = "<p style='color: #a0aec0; font-weight:300; font-style:italic; grid-column: 1/-1; text-align:center;'>Aún no has descubierto multimedia.</p>";
    }

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 350);
});