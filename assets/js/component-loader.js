// assets/js/component-loader.js

// Función para cargar todos los componentes
/**
 * Carga todos los componentes HTML del portfolio en secuencia
 * - Primero carga los componentes principales (header, main, footer)
 * - Luego las secciones internas del main (presentación, sobre mí, proyectos)
 * - Finalmente los sub-componentes de la sección "about"
 * @returns {Promise<void>}
 * @throws {Error} Si falla la carga de cualquier componente
 *
 * @event allComponentsLoaded - Se dispara cuando todos los componentes
 * han sido cargados exitosamente. Útil para inicializar funcionalidades
 * que dependen del DOM completo.
 */
async function loadAllComponents() {
  try {
    // Cargar componentes principales
    await loadHTMLComponent("header", "./components/header.html");
    await loadHTMLComponent("main", "./components/main.html");
    await loadHTMLComponent("footer", "./components/footer.html");

    // Actualizar año aquí
    updateFooterYear();

    // Cargar secciones internas del main
    await loadHTMLComponent("presentacion-content", "./components/presentation.html");
    await loadHTMLComponent("sobre-mi-content", "./components/about.html"); // Este ahora carga sus propios sub-componentes
    await loadHTMLComponent("proyectos-content", "./components/projects.html");

    // Pequeña pausa para asegurar que el DOM se haya actualizado
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Cargar sub-componentes de about
    await loadHTMLComponent(
      "about-description-content",
      "./components/about/about-description.html"
    );
    await loadHTMLComponent(
      "about-hobbies-content",
      "./components/about/about-hobbies.html"
    );

    console.log("✅ Todos los componentes cargados correctamente");

    // Disparar evento personalizado para indicar que todo está cargado
    window.dispatchEvent(new Event("allComponentsLoaded"));
  } catch (error) {
    console.error("❌ Error cargando componentes:", error);
  }
}

// Función para actualizar el año
function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
    console.log("✅ Año actualizado:", yearElement.textContent);
  } else {
    console.log("❌ No se encontró #current-year");
  }
}

/**
 * Carga un componente HTML desde un archivo externo y lo inserta en el elemento especificado
 * @param {string} elementId - ID del elemento contenedor donde se insertará el HTML
 * @param {string} filePath - Ruta relativa al archivo HTML a cargar
 * @returns {Promise<void>}
 * @throws {Error} Si falla la carga del archivo o el elemento no existe
 */
async function loadHTMLComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    throw error;
  }
}

// Iniciar carga cuando el DOM esté listo
/**
 * Inicializa la carga de componentes cuando el DOM está listo
 * - Si el DOM todavía se está cargando, espera al evento 'DOMContentLoaded'
 * - Si el DOM ya está listo, ejecuta inmediatamente loadAllComponents()
 * @returns {void}
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAllComponents);
} else {
  loadAllComponents();
}
