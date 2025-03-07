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


const codigosCIE10 = {
  "01": "96150.01",
  "02": "96150.02",
  "03": "96150.03",
  "04": "96150.04",
  "05": "96150.05",
  "06": "96150.06",
  "07": "96150.07",
  "08": "96150.08",
};

document.getElementById("Tamizajetipo").addEventListener("change", function() {
const tamizajeResultado = this.value;
const tamizajeSeleccionado = document.getElementById("tamizaje").value;
const codigocie1 = document.getElementById("cie1");
const codigocie2 = document.getElementById("cie2");
const codigocie3 = document.getElementById("cie3");

codigocie1.value = codigosCIE10[tamizajeSeleccionado] || "";
codigocie2.value = tamizajeResultado === "-" ? "99402.09" : "Z133" 
codigocie3.value = tamizajeResultado === "+" ? "99402.09" : "";
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
          <td>${paciente.Tamizajetipo}</td>
          <td>${paciente.distrito}</td>
          <td>${paciente.CentroPoblado}</td>
          <td>${paciente.edad}</td>
          <td>${paciente.sexo}</td>
          <td>${paciente.diagnosticos}</td>
          <td>${paciente.codigosCIE}</td>
          <td>${paciente.fecha}</td>
          <td>${paciente.Direccion}</td>
          <td>${paciente.Telefono}</td>
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
          Tamizajetipo: fila.cells[7].textContent,
          distrito: fila.cells[8].textContent,
          CentroPoblado: fila.cells[9].textContent,
          edad: fila.cells[10].textContent,
          sexo: fila.cells[11].textContent,
          diagnosticos: fila.cells[12].textContent,
          codigosCIE: fila.cells[13].textContent,
          fecha: fila.cells[14].textContent,
          Direccion: fila.cells[15].textContent,
          Telefono: fila.cells[16].textContent
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