import apiClient from './api';
import type { Gasto } from '../interfaces/Gasto';

/**
 * Servicio para gestionar gastos dentro de un grupo de gasto
 */
export const gastoService = {
  /**
   * Obtiene todos los gastos de un grupo de gasto específico
   */
  getByGrupoGasto: async (idGrupoGasto: number): Promise<Gasto[]> => {
    const response = await apiClient.get<Gasto[]>(
      `/api/grupos-gasto/${idGrupoGasto}/gastos`
    );
    return response.data;
  },

  /**
   * Crea un nuevo gasto dentro de un grupo de gasto
   */
  create: async (idGrupoGasto: number, gasto: Gasto): Promise<Gasto> => {
    const response = await apiClient.post<Gasto>(
      `/api/grupos-gasto/${idGrupoGasto}/gastos`,
      gasto
    );
    return response.data;
  },

  /**
   * Actualiza un gasto existente
   */
  update: async (idGrupoGasto: number, idGasto: number, gasto: Gasto): Promise<Gasto> => {
    const response = await apiClient.put<Gasto>(
      `/api/grupos-gasto/${idGrupoGasto}/gastos/${idGasto}`,
      gasto
    );
    return response.data;
  },

  /**
   * Elimina un gasto
   */
  delete: async (idGrupoGasto: number, idGasto: number): Promise<void> => {
    await apiClient.delete(`/api/grupos-gasto/${idGrupoGasto}/gastos/${idGasto}`);
  },
};
