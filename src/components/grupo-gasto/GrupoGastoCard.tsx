import type { GrupoGasto } from "../../interfaces/GrupoGasto";
import "./GrupoGastoCard.css";

interface GrupoGastoProps {
  grupoGasto: GrupoGasto;
  setSelectedGrupo: (grupo: GrupoGasto) => void;
  onDelete?: () => void;
}

const GrupoGastoCard = ({ grupoGasto, setSelectedGrupo, onDelete }: GrupoGastoProps) => {
  
  const handleDeleteGrupoGasto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  
  return (
    <div className="grupo-gasto" onClick={() => setSelectedGrupo(grupoGasto)}>
      <div className="grupo-gasto-info">
        <label className="grupo-gasto-title">{grupoGasto.nombre}</label>
        <div className="grupo-gasto-dates">
          <label className="grupo-gasto-date">Fecha inicio: {grupoGasto.fechaInicio}</label><br />
          <label className="grupo-gasto-date">
            Fecha fin: {grupoGasto.fechaFin ? grupoGasto.fechaFin : "N/A"}
          </label>
        </div>
      </div>

      <div>
        <button className="gasto-delete-btn" onClick={handleDeleteGrupoGasto}>
          <img className="gasto-delete-icon" src="/borrar.svg" alt="Eliminar gasto" width={15} height={15} />
        </button>
      </div>
    </div>
  );
};


export default GrupoGastoCard;