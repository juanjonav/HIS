document.getElementById("btnGenerarExcelHis").addEventListener("click", async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const response = await fetch("https://juanjonav.github.io/HIS/Plantillas/HIS2025.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const hoja = workbook.getWorksheet('Hoja1');
    // Obtener todas los datos de la tabla
    const tabla = document.getElementById("tablaPacientesBody");
    const filas = tabla.querySelectorAll("tr");
    const totalFilas = filas.length;

    const textoplano = "NOMBRES Y APELLIDOS PACIENTE: ";
  // ======================== 
    for (let i = 0; i < Math.min(totalFilas, 25); i++) {
      const fila = filas[i];
      const celdas = fila.querySelectorAll("td");
      const datos = Array.from(celdas).map(td => td.textContent.trim());
      const diagnosticos = datos[12].split(",").map(d => d.trim());
      const codigos = datos[13].split(",").map(c => c.trim());
      const fecha = datos[14] ? datos[14].split("-").map(d => d.trim()) : ["", "", ""]; 
      
      //const baseRow = 12 + (i * 6);
      const baseRow = i < 12 ? 12 + (i * 6) : 97 + ((i - 12) * 6);
      
      hoja.getCell(`B${baseRow}`).value = textoplano + datos[0] ;  // Nombre
      hoja.getCell(`B${baseRow + 2}`).value = datos[1];  // Día
      //fecha
      hoja.getCell(`D${baseRow + 1}`).value = fecha[2] || ""; // Día
      hoja.getCell(`E${baseRow + 1}`).value = fecha[1] || ""; // Mes
      hoja.getCell(`F${baseRow + 1}`).value = fecha[0] || ""; // Año


      hoja.getCell(`C${baseRow + 2 }`).value = datos[2];  // DNI
     // hoja.getCell(`C${baseRow + 3}`).value = datos[3];  // Historia clínica
     
      hoja.getCell(`D${baseRow + 2}`).value = datos[4];  // Financiamiento
      hoja.getCell(`D${baseRow + 4}`).value = datos[5];  // Etnia

      hoja.getCell(`E${baseRow + 2}`).value = datos[8];  // Distrito
      hoja.getCell(`E${baseRow + 4}`).value = datos[9];  // Centro poblado
      hoja.getCell(`I${baseRow + 2}`).value = datos[10];  // Edad
      
      
      hoja.getCell(`S${baseRow + 2}`).value = diagnosticos[0] || "";
      hoja.getCell(`Z${baseRow + 2}`).value = codigos[0] || "";
      hoja.getCell(`S${baseRow + 3}`).value = diagnosticos[1] || "";
      hoja.getCell(`Z${baseRow + 3}`).value = codigos[1] || "";
      hoja.getCell(`S${baseRow + 5}`).value = diagnosticos[2] || "";
      hoja.getCell(`Z${baseRow + 5}`).value = codigos[2] || "";
  }
  // ========================

      //llenar datos de responsable
      hoja.getCell(`X7`).value = document.getElementById("nombresApellidosResponsable").value || "";
      hoja.getCell(`U7`).value = document.getElementById("dniResponsable").value || "";

      hoja.getCell(`C7`).value = document.getElementById("mes").value || "";

  
    // GENERAR Y DESCARGAR EL EXCEL
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nuevo_HIS.xlsx";
    link.click();
    URL.revokeObjectURL(link.href);

    console.log("Archivo generado exitosamente");
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    alert("Error al generar el archivo.");
  }
});
