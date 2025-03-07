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
            "01": "L", "02": "M", "03": "N", "04": "O", "05": "P", "06": "Q", "07": "R", "08": "S"
        };
        const lugarnumerocita = {
            "1": "AE", "2": "AF", "3": "AG", "4": "AH", "5": "AI", "6": "AJ", "7": "AK", "8": "AL"
        }

        for (let i = 0; i < Math.min(totalFilas, 25); i++) {
            const fila = filas[i];
            const celdas = fila.querySelectorAll("td");9
            const datos = Array.from(celdas).map(td => td.textContent.trim());
            const baseRow = 3 + i; // Ahora inicia en fila 3 y aumenta de 1 en 1

            let fechanacimiento = datos[14] ? datos[14].split("-").reverse().join("-") : "";
            
            //fecha actual
            const fechahoy = new Date();
            const añoActual = fechahoy.getFullYear();
            const mesActual = fechahoy.getMonth() + 1; // Los meses empiezan en 0
            const fechaActual = `${datos[1]}-${mesActual}-${añoActual}`;
            hoja.getCell(`A${baseRow}`).value = fechaActual;  // Día


            hoja.getCell(`B${baseRow}`).value = datos[2];  // DNI
            hoja.getCell(`D${baseRow}`).value = fechanacimiento || "";  // Fecha
            hoja.getCell(`E${baseRow}`).value = datos[0];  // Nombre

            // Marcar con "X" en la columna correspondiente al sexo
            if (datos[11].toUpperCase() === "F") {
                hoja.getCell(`F${baseRow}`).value = 1;  // Femenino en columna F
            } else if (datos[9].toUpperCase() === "M") {
                hoja.getCell(`G${baseRow}`).value = 1;  // Masculino en columna G
            }
            const tipodeseguro = datos[4] === "2" ? "H" : "I";
            hoja.getCell(`${tipodeseguro + baseRow}`).value = datos[4] || "";  // SIS
            hoja.getCell(`AA${baseRow}`).value = datos[13] || "";  // Diagnósticos
            hoja.getCell(`AB${baseRow}`).value = datos[3];  // Numero de consulta

            hoja.getCell(`K${baseRow}`).value = datos[15] || "";  // direccion
            hoja.getCell(`J${baseRow}`).value = datos[16] || "";  // telefono
            // Usar el diccionario para escribir 1 en la columna correcta
            const columna = columnaMap[datos[6]];
            if (columna) {
                hoja.getCell(`${columna}${baseRow}`).value = 1;
            }
            const letracita = lugarnumerocita[datos[3]];
            if (letracita) {
                hoja.getCell(`${letracita}${baseRow}`).value = "x";
            }

            hoja.getCell(`AM${baseRow}`).value = document.getElementById("nombresApellidosResponsable").value || ""  // responsable
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
