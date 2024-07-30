import Papa, { ParseError, ParseResult } from 'papaparse';

export interface VentaData {
  fecha: string;
  producto: string;
  precio: number;
}

export const leerCSV = async (file: string): Promise<VentaData[]> => {
  try {
    console.log("Intentando leer el archivo:", file);
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Error al buscar el archivo: ${response.statusText}`);
    }
    const text = await response.text();
    console.log("Contenido del CSV leído:", text.substring(0, 500) + "...");

    return new Promise((resolve, reject) => {
      Papa.parse<VentaData>(text, {
        header: true,
        complete: (results: ParseResult<VentaData>) => {
          console.log("Resultados del parsing:", results.data.length, "filas");
          console.log("Muestra de datos parseados:", results.data.slice(0, 2));
          console.log("Encabezados:", results.meta.fields);

          const processedData = results.data
            .filter(item => item.fecha && item.producto && item.precio)
            .map(item => ({
              fecha: item.fecha,
              producto: item.producto,
              precio: parseFloat(item.precio.toString().replace('$', '').replace(',', '')) || 0
            }));

          console.log("Datos procesados:", processedData.length, "filas válidas");
          console.log("Muestra de datos procesados:", processedData.slice(0, 2));
          resolve(processedData);
        },
        error: (error: ParseError) => {
          console.error("Error en Papa Parse:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error al leer el archivo CSV:', error);
    throw error;
  }
};
