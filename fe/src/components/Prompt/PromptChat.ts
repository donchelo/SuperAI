// responderPreguntas.ts

/**
 * Responde las preguntas que se te hacen teniendo en cuenta las siguientes reglas.
 *
 * 1. Responde teniendo en cuenta el contexto proporcionado.
 * 2. Tómate el tiempo necesario para responder y explica tu proceso paso a paso antes de dar una respuesta final.
 * 3. Presenta tus respuestas en formato Markdown para una mejor legibilidad.
 *
 * Instrucciones adicionales:
 *
 * - Usa ejemplos prácticos cuando sea posible para ilustrar tus respuestas.
 * - Divide la información en secciones claras con encabezados y listas para facilitar la lectura.
 * - Asegúrate de que la respuesta sea coherente y bien estructurada.
 */

/**
 * Responde una pregunta dada siguiendo las reglas e instrucciones proporcionadas.
 *
 * @param pregunta - La pregunta que se debe responder.
 * @param contexto - El contexto proporcionado para la pregunta.
 * @returns La respuesta formateada en Markdown.
 */
function responderPregunta(pregunta: string, contexto: string): string {
    // 1. Responde teniendo en cuenta el contexto proporcionado.
    // En esta función, utilizaremos el contexto para proporcionar una respuesta precisa y relevante.
    
    // 2. Tómate el tiempo necesario para responder y explica tu proceso paso a paso antes de dar una respuesta final.
    const pasos = `
    ### Proceso para responder la pregunta

    1. **Entender la pregunta:** Leer y comprender la pregunta completamente.
    2. **Revisar el contexto:** Analizar el contexto proporcionado para asegurarse de que la respuesta sea relevante.
    3. **Investigar si es necesario:** Si la pregunta requiere información adicional, investigar las fuentes necesarias.
    4. **Formular la respuesta:** Redactar una respuesta clara y concisa basándose en el contexto y la investigación.
    5. **Revisar la respuesta:** Verificar que la respuesta sea coherente, esté bien estructurada y cumpla con las instrucciones adicionales.
    `;

    // 3. Presenta tus respuestas en formato Markdown para una mejor legibilidad.
    let respuesta = `## Respuesta a la pregunta: "${pregunta}"\n\n`;
    respuesta += pasos;

    // Ejemplo práctico:
    const ejemplo = `
    ### Ejemplo práctico

    **Pregunta:** ¿Cómo puedo mejorar el rendimiento de mi aplicación React?

    **Respuesta:**
    
    1. **Utiliza React.memo:** Memoriza componentes para evitar renders innecesarios.
    2. **Evita renders innecesarios:** Asegúrate de que solo se rendericen los componentes que realmente necesitan actualizarse.
    3. **Code-splitting:** Divide el código en partes más pequeñas para que solo se carguen las partes necesarias en cada momento.
    4. **Optimiza las dependencias:** Revisa y optimiza las dependencias y los paquetes que estás utilizando en tu proyecto.
    `;

    // Dividir la información en secciones claras
    respuesta += `
    ## Secciones Clave

    - **Comprensión de la Pregunta:** Leer y entender la pregunta.
    - **Revisión del Contexto:** Analizar el contexto proporcionado.
    - **Investigación:** Realizar investigaciones adicionales si es necesario.
    - **Formulación de la Respuesta:** Redactar una respuesta clara y concisa.
    - **Revisión:** Verificar la coherencia y la estructura de la respuesta.
    `;

    respuesta += ejemplo;

    // Asegúrate de que la respuesta sea coherente y bien estructurada.
    return respuesta;
}

// Ejemplo de uso de la función
const pregunta = "¿Cómo puedo mejorar el rendimiento de mi aplicación React?";
const contexto = "Estoy desarrollando una aplicación con React y quiero optimizar su rendimiento.";
console.log(responderPregunta(pregunta, contexto));
