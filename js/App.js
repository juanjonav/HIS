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

// localstorage
function cargarDesdeLocalStorage() {
  const datos = JSON.parse(localStorage.getItem("pacientes") || "[]");
  const tabla = document.getElementById("tablaPacientesBody");
  tabla.innerHTML = "";  // Limpiar la tabla antes de cargar

  datos.forEach(paciente => {
      const fila = tabla.insertRow();
      fila.innerHTML = `
          <td>${paciente.nombresApellidos}</td>
          <td>${paciente.dia}</td>
          <td>${paciente.dni}</td>
          <td>${paciente.numeroCita}</td>
          <td>${paciente.financiadorSalud}</td>
          <td>${paciente.etnia}</td>
          <td>${paciente.tamizaje}</td>
          <td>${paciente.distrito}</td>
          <td>${paciente.CentroPoblado}</td>
          <td>${paciente.edad}</td>
          <td>${paciente.sexo}</td>
          <td>${paciente.diagnosticos}</td>
          <td>${paciente.codigosCIE}</td>
          <td>${paciente.fecha}</td>
          <td>${paciente.sis}</td>
          <td><button class="btn btn-sm btn-danger btnEliminar">Eliminar</button></td>
      `;

      // Agregar evento para eliminar fila
      fila.querySelector(".btnEliminar").addEventListener("click", () => {
          fila.remove();
          guardarEnLocalStorage();  // Actualizar localStorage después de eliminar
      });
  });
}

function guardarEnLocalStorage() {
  const tabla = document.getElementById("tablaPacientesBody");
  const datos = [];

  for (let fila of tabla.rows) {
      const paciente = {
          nombresApellidos: fila.cells[0].textContent,
          dia: fila.cells[1].textContent,
          dni: fila.cells[2].textContent,
          numeroCita: fila.cells[3].textContent,
          financiadorSalud: fila.cells[4].textContent,
          etnia: fila.cells[5].textContent,
          tamizaje: fila.cells[6].textContent,
          distrito: fila.cells[7].textContent,
          CentroPoblado: fila.cells[8].textContent,
          edad: fila.cells[9].textContent,
          sexo: fila.cells[10].textContent,
          diagnosticos: fila.cells[11].textContent,
          codigosCIE: fila.cells[12].textContent,
          fecha: fila.cells[13].textContent,
          sis: fila.cells[14].textContent
      };
      datos.push(paciente);
  }

  localStorage.setItem("pacientes", JSON.stringify(datos));
}


document.getElementById("limpiarTabla").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres limpiar la tabla?")) {
      localStorage.removeItem("pacientes");
      document.getElementById("tablaPacientesBody").innerHTML = "";
  }
});
window.onload = cargarDesdeLocalStorage;