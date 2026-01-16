import { useEffect } from "react";
import { useGrupoGastoStats } from "../hooks/useGrupoGasto";
import type { Persona } from "../interfaces/Persona";
import "./GrupoGastoStats.css";

const GrupoGastoStats: React.FC<{ grupoId: number, isModalOpen: boolean, personas: Persona[] }> = ({ grupoId, isModalOpen, personas }) => {

  const statsHook = useGrupoGastoStats(grupoId);

  useEffect(() => {
    if (isModalOpen) {
      statsHook.refetch();
    }
  }, [isModalOpen]);

  const determineDebtorPosition = (persona: Persona, amountOwed: number) => {
    if (amountOwed === 0) {
      return <label className="debtor-position-text">{persona.nombre} no debe nada</label>
    } else if (amountOwed > 0) {
      return <label className="debtor-position-text">{persona.nombre} debe <strong className="debtor-position owes">{amountOwed.toFixed(2)}</strong> €</label>
    } else {
      return <label className="debtor-position-text">A {persona.nombre} le deben <strong className="debtor-position is-owed">{-amountOwed.toFixed(2)}</strong> €</label>
    }
  }

  return (
    <div>

      {statsHook.loading && <p>Cargando estadísticas...</p>}

      {statsHook.error && <p>Error al cargar las estadísticas: {statsHook.error.message}</p>}

      {statsHook.data && (
        <div>
          <div className="global-stats-section">
            <label className="section-title">Estadísticas globales:</label>
            <div className="global-stats-container">
              <div className="stat-item">
                <label className="stat-title">Total pagado</label>
                <label className="stat-value">{statsHook.data.totalPaid.toFixed(2)} €</label>
              </div>
              <div className="stat-item">
                <label className="stat-title">Total divisible</label>
                <label className="stat-value">{statsHook.data.totalSplittable.toFixed(2)} €</label>
              </div>
            </div>
          </div>

          <div className="persona-stats-section">
            <label className="section-title">Desglose por persona:</label>
            <div className="persona-stats-container">
              {statsHook.data.statsByPersona.map((personaStats) => {
                const persona = personas.find(p => p.idPersona === personaStats.idPersona);
                return (
                  <div>
                    <label className="person">{persona?.nombre}</label>
                    <div className="persona-stats">
                      <div className="stat-item">
                        <label className="stat-title">Total pagado</label>
                        <label className="stat-value">{personaStats.totalPaid.toFixed(2)} €</label>
                      </div>
                      <div className="stat-item">
                        <label className="stat-title">Total divisible</label>
                        <label className="stat-value">{personaStats.totalSplittable.toFixed(2)} €</label>
                      </div>
                    </div>
                    {determineDebtorPosition(persona!, personaStats.amountOwed)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );

};

export default GrupoGastoStats;