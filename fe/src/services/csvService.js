import Papa from 'papaparse';
export const leerCSV = async (file) => {
    try {
        console.log("Intentando leer el archivo:", file);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${file}`);
        if (!response.ok) {
            throw new Error(`Error al buscar el archivo: ${response.statusText}`);
        }
        const text = await response.text();
        console.log("Contenido del CSV leído:", text.substring(0, 500) + "...");
        return new Promise((resolve, reject) => {
            Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    console.log("Resultados del parsing:", results.data.length, "filas");
                    console.log("Muestra de datos parseados:", results.data.slice(0, 2));
                    console.log("Encabezados:", results.meta.fields);
                    const processedData = results.data
                        .filter(item => item.fecha && item.producto && item.precio !== undefined)
                        .map(item => {
                        let precio;
                        if (typeof item.precio === 'number') {
                            precio = item.precio;
                        }
                        else if (typeof item.precio === 'string') {
                            precio = parseFloat(item.precio.replace('$', '').replace(',', ''));
                        }
                        else {
                            precio = 0;
                        }
                        return {
                            ...item,
                            precio
                        };
                    });
                    console.log("Datos procesados:", processedData.length, "filas válidas");
                    console.log("Muestra de datos procesados:", processedData.slice(0, 2));
                    resolve(processedData);
                },
                error: (error) => {
                    console.error("Error en Papa Parse:", error);
                    reject(error);
                }
            });
        });
    }
    catch (error) {
        console.error('Error al leer el archivo CSV:', error);
        throw error;
    }
};
