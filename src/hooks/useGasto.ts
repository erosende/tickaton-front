import { useState, useEffect } from 'react';
import { gastoService } from '../services/gastoService';
import { type Gasto } from '../interfaces/Gasto';

/**
 * Hook para obtener los gastos de un grupo específico
 */
export const useGastos = (idGrupoGasto: number | null) => {
  const [data, setData] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (idGrupoGasto === null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await gastoService.getByGrupoGasto(idGrupoGasto);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idGrupoGasto]);

  const refetch = async () => {
    if (idGrupoGasto === null) return;

    try {
      setLoading(true);
      const result = await gastoService.getByGrupoGasto(idGrupoGasto);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

/**
 * Hook para crear, actualizar y eliminar gastos
 */
export const useGastoMutations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createGasto = async (idGrupoGasto: number, gasto: Gasto): Promise<Gasto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await gastoService.create(idGrupoGasto, gasto);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateGasto = async (
    idGrupoGasto: number,
    idGasto: number,
    gasto: Gasto
  ): Promise<Gasto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await gastoService.update(idGrupoGasto, idGasto, gasto);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteGasto = async (idGrupoGasto: number, idGasto: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await gastoService.delete(idGrupoGasto, idGasto);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createGasto,
    updateGasto,
    deleteGasto,
    loading,
    error,
  };
};
