// Modelo para Primera Visita
export interface PrimeraVisita {
    fecha: Date;
    nombres: string;
    preguntaInicial: string;
    direccion: string;
    tipoPersona: 'ateo' | 'cristiano' | 'catolico';
    inquietudAmo?: string;
    datosPersonales?: string;
    preguntaPendiente?: string;
    duracion: number;
}

// Modelo para Revisita
export interface Revisita {
    direccion: string;
    preguntaPendiente: string;
    respuestaAnalizada: string;
    observaciones?: string;
}

// Modelo para Estudio
export interface Estudio {
    nombre: string;
    fecha: Date;
    temaAnalizado: string;
    temaPorAnalizar: string;
    investigarResponder?: string;
}

// Modelo para Por Investigar
export interface PorInvestigar {
    porInvestigar: string;
    pregunta: string;
    fecha: Date;
}