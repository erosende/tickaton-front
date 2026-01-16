import apiClient from './api';
import type { GrupoGasto, PageGrupoGasto, GrupoGastoFilters, GrupoGastoStats } from '../interfaces/GrupoGasto';

const GRUPO_GASTO_BASE_URL = '/api/grupos-gasto';

/**
 * Servicio para gestionar grupos de gasto
 */
export const grupoGastoService = {
  /**
   * Obtiene todos los grupos de gasto con filtros opcionales
   */
  getAll: async (filters?: GrupoGastoFilters): Promise<PageGrupoGasto> => {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.nombre) params.append('nombre', filters.nombre);
      if (filters.fechaInicioDesde) params.append('fechaInicioDesde', filters.fechaInicioDesde);
      if (filters.fechaInicioHasta) params.append('fechaInicioHasta', filters.fechaInicioHasta);
      if (filters.fechaFinDesde) params.append('fechaFinDesde', filters.fechaFinDesde);
      if (filters.fechaFinHasta) params.append('fechaFinHasta', filters.fechaFinHasta);

      // Paginación
      params.append('page', filters.pageable.page.toString());
      params.append('size', filters.pageable.size.toString());

      if (filters.pageable.sort && filters.pageable.sort.length > 0) {
        filters.pageable.sort.forEach(s => params.append('sort', s));
      }
    } else {
      // Valores por defecto si no se proporcionan filtros
      params.append('page', '0');
      params.append('size', '20');
    }

    const response = await apiClient.get<PageGrupoGasto>(
      `${GRUPO_GASTO_BASE_URL}?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Obtiene un grupo de gasto por su ID
   */
  getById: async (id: number): Promise<GrupoGasto> => {
    const response = await apiClient.get<GrupoGasto>(`${GRUPO_GASTO_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Obtiene estadísticas de un grupo de gasto por su ID
   */
  getStats: async (id: number): Promise<GrupoGastoStats> => {
    const response = await apiClient.get<GrupoGastoStats>(`${GRUPO_GASTO_BASE_URL}/${id}/stats`);
    return response.data;
  },

  /**
   * Crea un nuevo grupo de gasto
   */
  create: async (grupoGasto: GrupoGasto): Promise<GrupoGasto> => {
    const response = await apiClient.post<GrupoGasto>(GRUPO_GASTO_BASE_URL, grupoGasto);
    return response.data;
  },

  /**
   * Actualiza un grupo de gasto existente
   */
  update: async (id: number, grupoGasto: GrupoGasto): Promise<GrupoGasto> => {
    const response = await apiClient.put<GrupoGasto>(
      `${GRUPO_GASTO_BASE_URL}/${id}`,
      grupoGasto
    );
    return response.data;
  },

  /**
   * Elimina un grupo de gasto
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${GRUPO_GASTO_BASE_URL}/${id}`);
  },
};
