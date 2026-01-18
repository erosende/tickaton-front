import type { Gasto } from "../../interfaces/Gasto";
import type { Persona } from "../../interfaces/Persona";
import "./GastoItem.css";
import { forwardRef } from "react";

interface GastoProps {
  gasto: Gasto;
  personas: Persona[];
  onClick?: () => void;
  isSelected?: boolean;
  onDelete?: () => void;
}

const GastoItem = forwardRef<HTMLDivElement, GastoProps>(({ gasto, personas, onClick, isSelected, onDelete }, ref) => {

  const getPersonaName = (idPersona: number): string => {
    const persona = personas.find(p => p.idPersona === idPersona);
    return persona ? persona.nombre : "Desconocido";
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  }

  return (
    <div
      ref={ref}
      className={`gasto-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="item-data-container">
        <div className="gasto-data">
          <label className="gasto-data-title">Concepto</label>
          <label className="gasto-data-value-concepto">{gasto.concepto}</label>
        </div>
        <div className="gasto-data">
          <label className="gasto-data-title">Importe</label>
          <label className="gasto-data-value">{gasto.importe.toFixed(2)} €</label>
        </div>
        <div className="gasto-data">
          <label className="gasto-data-title">Porcentaje</label>
          <label className="gasto-data-value">{gasto.porcentaje} %</label>
        </div>
        <div className="gasto-data">
          <label className="gasto-data-title">Persona</label>
          <label className="gasto-data-value">{getPersonaName(gasto.idPersona)}</label>
        </div>
      </div>
      <div>
        <button className="gasto-delete-btn" onClick={handleDelete}>
          <img className="gasto-delete-icon" src="/borrar.svg" alt="Eliminar gasto" width={15} height={15} />
        </button>
      </div>
    </div>
  );
});

GastoItem.displayName = 'GastoItem';

export default GastoItem;