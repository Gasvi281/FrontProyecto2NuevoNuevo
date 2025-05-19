import { Cuenta } from "./cuenta.model";

export interface Comentario {
    id?: string;
    comentario: string;
    cuentaId: string;
    fecha: Date;
    cuenta?: Cuenta;
    estado?: string;
}