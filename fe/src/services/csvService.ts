import Papa from 'papaparse';

export interface VentaData {
  fecha: string;
  Departamento: string;
  Ciudad: string;
  producto: string;
  precio: number | string;
}

export const leerCSV = async (file: string): Promise<VentaData[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${file}`);
    if (!response.ok) {
      throw new Error(`Error al buscar el archivo: ${response.statusText}`);
    }
    const text = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<VentaData>(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const processedData = results.data
            .filter(item => item.fecha && item.producto && item.precio !== undefined)
            .map(item => {
              let precio: number;
              if (typeof item.precio === 'number') {
                precio = item.precio;
              } else if (typeof item.precio === 'string') {
                precio = parseFloat(item.precio.replace('$', '').replace(',', ''));
              } else {
                precio = 0;
              }
              return {
                ...item,
                precio
              };
            });
          resolve(processedData);
        },
        error: (error: Error) => {
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
