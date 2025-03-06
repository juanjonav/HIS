document.getElementById("btnGenerarExcelTabla").addEventListener("click", async () => {
    try {
        const workbook = new ExcelJS.Workbook();
        const response = await fetch("https://juanjonav.github.io/HIS/Plantillas/lista.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        await workbook.xlsx.load(arrayBuffer); // Cargar el archivo en el Workbook
        
        // Obtener la primera hoja
        const hoja = workbook.getWorksheet('Hoja1');
        
        // Obtener todas los datos de la tabla
        const tabla = document.getElementById("tablaPacientesBody");
        const filas = tabla.querySelectorAll("tr");
        const totalFilas = filas.length;

        // Diccionario para mapear datos[6] a columnas
        const columnaMap = {
            "01": "L", "02": "M", "03": "N", "06": "O", "07": "P", "08": "Q"
        };

        for (let i = 0; i < Math.min(totalFilas, 25); i++) {
            const fila = filas[i];
            const celdas = fila.querySelectorAll("td");9
            const datos = Array.from(celdas).map(td => td.textContent.trim());
            const baseRow = 3 + i; // Ahora inicia en fila 3 y aumenta de 1 en 1

            let fechanacimiento = datos[13] ? datos[13].split("-").reverse().join("-") : "";
            
            hoja.getCell(`A${baseRow}`).value = datos[1];  // Día
            hoja.getCell(`B${baseRow}`).value = datos[2];  // DNI
            hoja.getCell(`D${baseRow}`).value = fechanacimiento || "";  // Fecha
            hoja.getCell(`E${baseRow}`).value = datos[0];  // Nombre

            // Marcar con "X" en la columna correspondiente al sexo
            if (datos[9].toUpperCase() === "F") {
                hoja.getCell(`F${baseRow}`).value = "X";  // Femenino en columna F
            } else if (datos[9].toUpperCase() === "M") {
                hoja.getCell(`G${baseRow}`).value = "X";  // Masculino en columna G
            }

            //hoja.getCell(`H${baseRow}`).value = datos[14] || "";  // SIS
            hoja.getCell(`Y${baseRow}`).value = datos[12] || "";  // Diagnósticos
            hoja.getCell(`Z${baseRow}`).value = datos[3];  // Numero de consulta

            // Usar el diccionario para escribir 1 en la columna correcta
            const columna = columnaMap[datos[6]];
            if (columna) {
                hoja.getCell(`${columna}${baseRow}`).value = 1;
            }
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        // Descargar el archivo generado
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "lista.xlsx";
        link.click();

        // Liberar el objeto URL
        URL.revokeObjectURL(link.href);
        console.log("Archivo generado exitosamente");
    } catch (error) {
        console.error("Error al generar el archivo Excel:", error);
        alert("Error al generar el archivo. Revisa la consola para más detalles.");
    }
});
