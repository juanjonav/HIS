// Mapeo de nombres a DNI
const responsables = {
  "JESUS ROJAS POZO": "08388048",
  "ERIKA GISELA CRUZ CAMPOS": "42597775",
  "MARAVI SAAVEDRA LIUS ALBERTO": "45515386",
  "VERDE GONZALES HEGIDIO": "22498733",
};

// Evento para actualizar DNI automáticamente
document.getElementById("nombresApellidosResponsable").addEventListener("change", function() {
  const nombreSeleccionado = this.value;
  const dniInput = document.getElementById("dniResponsable");
  dniInput.value = responsables[nombreSeleccionado] || "";  // Si no hay coincidencia, deja vacío
});

// diccionario para mapear CIE 10 a diagnóstico