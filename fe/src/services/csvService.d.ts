export interface VentaData {
    fecha: string;
    Departamento: string;
    Ciudad: string;
    producto: string;
    precio: number | string;
}
export declare const leerCSV: (file: string) => Promise<VentaData[]>;
