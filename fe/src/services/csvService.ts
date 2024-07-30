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
    const text = await response.text();
    console.log("Contenido del CSV leído:", text.substring(0, 500) + "...");
    
    return new Promise((resolve, reject) => {
      Papa.parse<VentaData>(text, {
        header: true,
        complete: (results: ParseResult<VentaData>) => {
          console.log("Resultados del parsing:", results.data.length, "filas");
          console.log("Muestra de datos parseados:", results.data.slice(0, 2));
          console.log("Encabezados:", results.meta.fields);
          const data = results.data as any[];
          const processedData = data
            .filter(item => item['Fecha De Entrega'] && item['Nombre Producto'] && item['SUM de Precio'])
            .map(item => {
              const ventaData: VentaData = {
                fecha: item['Fecha De Entrega'],
                producto: item['Nombre Producto'],
                precio: parseFloat(item['SUM de Precio'].replace('$', '').replace(',', '')) || 0
              };
              console.log("Fila procesada:", ventaData);
              return ventaData;
            });
          console.log("Datos procesados:", processedData.length, "filas válidas");
          console.log("Muestra de datos procesados:", processedData.slice(0, 2));
          resolve(processedData);
        },
        error: (error: ParseError, file: string) => {
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
