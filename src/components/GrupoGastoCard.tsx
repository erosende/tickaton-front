import type { GrupoGasto } from "../interfaces/GrupoGasto";
import "./GrupoGastoCard.css";

interface GrupoGastoProps {
  grupoGasto: GrupoGasto;
  setSelectedGrupo: (grupo: GrupoGasto) => void;
}

const GrupoGastoCard = ({ grupoGasto, setSelectedGrupo }: GrupoGastoProps) => {
  return (
    <div className="grupo-gasto" onClick={() => setSelectedGrupo(grupoGasto)}>
        <label className="grupo-gasto-title">{grupoGasto.nombre}</label>
        <div className="grupo-gasto-dates">
            <label className="grupo-gasto-date">Fecha inicio: {grupoGasto.fechaInicio}</label><br />
            <label className="grupo-gasto-date">
            Fecha fin: {grupoGasto.fechaFin ? grupoGasto.fechaFin : "N/A"}
            </label>
        </div>
    </div>
  );
};


export default GrupoGastoCard;