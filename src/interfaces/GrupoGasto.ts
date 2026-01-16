export interface GrupoGasto {
  idGrupoGasto?: number;
  nombre: string;
  fechaInicio: string; // formato: YYYY-MM-DD
  fechaFin?: string; // formato: YYYY-MM-DD
  creadoEn?: string; // formato: ISO 8601 date-time
}

export interface PageGrupoGasto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: GrupoGasto[];
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}

export interface SortObject {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface Pageable {
  page: number; // mínimo: 0
  size: number; // mínimo: 1
  sort?: string[];
}

export interface GrupoGastoFilters {
  nombre?: string;
  fechaInicioDesde?: string; // formato: YYYY-MM-DD
  fechaInicioHasta?: string; // formato: YYYY-MM-DD
  fechaFinDesde?: string; // formato: YYYY-MM-DD
  fechaFinHasta?: string; // formato: YYYY-MM-DD
  pageable: Pageable;
}

export interface GrupoGastoStats {
  totalPaid: number;
  totalSplittable: number;
  statsByPersona: PersonaStats[];
}

export interface PersonaStats {
  idPersona: number;
  totalPaid: number;
  totalSplittable: number;
  amountOwed: number;
}
