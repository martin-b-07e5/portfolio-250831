/**
 * Implementa scroll suave para navegación por anclas internas
 *
 * Funcionalidad:
 * - Intercepta clicks en enlaces que comienzan con '#'
 * - Previene el comportamiento por defecto del navegador
 * - Realiza scroll animado hasta el elemento destino
 * - Usa scrollIntoView() con behavior: 'smooth' para la animación
 *
 * @example
 * // Funciona con: <a href="#seccion">Ir a sección</a>
 * // Y elemento: <section id="seccion">...</section>
 *
 * @returns {void}
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Manejador de evento que configura el scroll suave después de la carga completa
 * de todos los componentes HTML. Esto asegura que todos los elementos destino
 * existan en el DOM antes de configurar la funcionalidad de scroll.
 *
 * @listens allComponentsLoaded
 */
window.addEventListener("allComponentsLoaded", setupSmoothScroll);
