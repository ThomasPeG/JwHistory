export interface PrimeraVisita {
  userId: string;
  date: Date;
  names: string;
  initialQuestion: string;
  address: string;
  personType: string;
  ownerConcern: string;
  personalData: string;
  pendingQuestion: string;
  duration: number;
  notes: string;
  nextVisitDate: Date;
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