const HORAS_REQUERIDAS = 80; // Scope global
let nombreEstudiante = "";
let horasAcumuladas = 0;
let continuar = true;

console.log("🎓 Bienvenido al Sistema de Registro de Horas de Servicio Social\n");

// --- Función para registrar horas ---
function registrarHoras() {
  // Scope de función: Las variables declaradas aquí solo existen dentro de esta función.

  // Si ya completó las horas, no puede registrar más
  if (horasAcumuladas >= HORAS_REQUERIDAS) {
    console.log("🚫 Ya has completado las " + HORAS_REQUERIDAS + " horas de servicio social. No puedes registrar más.\n");
    return; // sale de la función
  }

  if (nombreEstudiante === "") {
    nombreEstudiante = prompt("Ingrese el nombre del estudiante:");
  }

  let lugar = prompt("Ingrese el lugar donde realizó la actividad:");
  let horas = parseInt(prompt("Ingrese las horas realizadas:"));

  if (isNaN(horas) || horas <= 0) {
    console.log("⚠️ Ingrese un número válido de horas.\n");
    return;
  }

  // Si la suma supera las horas requeridas, se ajusta al máximo permitido
  if (horasAcumuladas + horas > HORAS_REQUERIDAS) {
    let exceso = (horasAcumuladas + horas) - HORAS_REQUERIDAS;
    horas = HORAS_REQUERIDAS - horasAcumuladas;
    console.log("⚠️ Solo se registrarán " + horas + " horas. Exceso de " + exceso + " horas descartado.\n");
  }

  horasAcumuladas += horas;

  if (horasAcumuladas < HORAS_REQUERIDAS) {
    let faltan = HORAS_REQUERIDAS - horasAcumuladas;
    console.log("✅ Registro exitoso:");
    console.log("Lugar: " + lugar);
    console.log("Llevas " + horasAcumuladas + " horas acumuladas.");
    console.log("Te faltan " + faltan + " horas para completar las " + HORAS_REQUERIDAS + ".\n");
  } else {
    console.log("🎉 ¡Felicitaciones " + nombreEstudiante + "!");
    console.log("Has completado tus " + HORAS_REQUERIDAS + " horas de servicio social.\n");
    horasAcumuladas = HORAS_REQUERIDAS; // asegurar que no pase del límite
  }
}

// --- Función para consultar horas ---
function consultarHoras() {
  if (nombreEstudiante === "") {
    console.log("⚠️ No hay registros. Primero debes registrar horas.\n");
  } else {
    let faltan = HORAS_REQUERIDAS - horasAcumuladas;
    console.log("📘 Consulta de horas:");
    console.log("Estudiante: " + nombreEstudiante);
    console.log("Horas acumuladas: " + horasAcumuladas);
    if (horasAcumuladas >= HORAS_REQUERIDAS) {
      console.log("🎉 ¡Has completado tus horas!\n");
    } else {
      console.log("Faltan: " + faltan + "\n");
    }
  }
}

// --- Función para mostrar menú ---
function mostrarMenu() {
  let opcion = parseInt(prompt(
    "Seleccione una opción:\n" +
    "1. Registrar horas de servicio social\n" +
    "2. Consultar horas acumuladas\n" +
    "3. Salir del sistema"
  ));
  return opcion;
}

// --- Ejecución principal del programa ---
while (continuar) {
  let opcion = mostrarMenu(); // Scope de bloque: 'opcion' solo existe dentro del while

  switch (opcion) {
    case 1:
      registrarHoras();
      break;
    case 2:
      consultarHoras();
      break;
    case 3:
      console.log("Gracias por usar el sistema. ¡Hasta pronto!\n");
      continuar = false;
      break;
    default:
      console.log("❌ Opción no válida. Intente nuevamente.\n");
      break;
  }
}
