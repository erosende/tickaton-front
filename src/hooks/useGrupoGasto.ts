import { useState, useEffect } from 'react';
import { grupoGastoService } from '../services/grupoGastoService';
import type { GrupoGasto, PageGrupoGasto, GrupoGastoFilters, GrupoGastoStats } from '../interfaces/GrupoGasto';

/**
 * Hook para obtener todos los grupos de gasto con filtros
 */
export const useGruposGasto = (filters?: GrupoGastoFilters) => {
  const [data, setData] = useState<PageGrupoGasto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await grupoGastoService.getAll(filters);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await grupoGastoService.getAll(filters);
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
 * Hook para obtener un grupo de gasto por ID
 */
export const useGrupoGasto = (id: number | null) => {
  const [data, setData] = useState<GrupoGasto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await grupoGastoService.getById(id);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const refetch = async () => {
    if (id === null) return;

    try {
      setLoading(true);
      const result = await grupoGastoService.getById(id);
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
 * Hook para obtener estadísticas de un grupo de gasto por ID
 */
export const useGrupoGastoStats = (id: number | null) => {
  const [data, setData] = useState<GrupoGastoStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id === null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await grupoGastoService.getStats(id);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const refetch = async () => {
    if (id === null) return;
    
    try {
      setLoading(true);
      const result = await grupoGastoService.getStats(id);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

/**
 * Hook para crear, actualizar y eliminar grupos de gasto
 */
export const useGrupoGastoMutations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createGrupoGasto = async (grupoGasto: GrupoGasto): Promise<GrupoGasto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await grupoGastoService.create(grupoGasto);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateGrupoGasto = async (id: number, grupoGasto: GrupoGasto): Promise<GrupoGasto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await grupoGastoService.update(id, grupoGasto);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteGrupoGasto = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await grupoGastoService.delete(id);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createGrupoGasto,
    updateGrupoGasto,
    deleteGrupoGasto,
    loading,
    error,
  };
};
