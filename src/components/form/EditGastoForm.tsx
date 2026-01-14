import React, { use, useEffect } from "react";
import type { Gasto } from "../../interfaces/Gasto";
import type { Persona } from "../../interfaces/Persona";
import "./EditGastoForm.css";

interface EditGastoFormProps {
  idGrupoGasto: number;
  gasto?: Gasto;
  personas: Persona[];
}

const EditGastoForm = ({ idGrupoGasto, gasto, personas }: EditGastoFormProps) => {

  const [formData, setFormData] = React.useState<Gasto>({
    concepto: gasto?.concepto || '',
    importe: gasto?.importe || 0,
    porcentaje: gasto?.porcentaje || 50,
    idGrupoGasto: idGrupoGasto,
    idPersona: gasto?.idPersona || personas[0].idPersona!,
  });

  useEffect(() => {
    setFormData({
      concepto: gasto?.concepto || '',
      importe: gasto?.importe || 0,
      porcentaje: gasto?.porcentaje || 50,
      idGrupoGasto: idGrupoGasto,
      idPersona: gasto?.idPersona || personas[0].idPersona!,
    });
  }, [gasto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, idPersona: parseInt(value) }));
  }

  const isFormDataValid = (): boolean => {
    return formData.concepto.trim() !== ''
      && formData.importe > 0
      && formData.porcentaje >= 0
      && formData.porcentaje <= 100
      && formData.idPersona > 0;
  }

  return (
    <div>
      <form className="edit-gasto-form">
        <div className="form-group">
          <label>Concepto:</label>
          <input
            type="text"
            name="concepto"
            value={formData.concepto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Importe:</label>
          <input
            type="number"
            name="importe"
            value={formData.importe}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Persona:</label>
          <select
            name="idPersona"
            value={formData.idPersona}
            onChange={handlePersonaChange}
          >
            {personas.map(persona => (
              <option key={persona.idPersona} value={persona.idPersona}>
                {persona.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Porcentaje: {formData.porcentaje} %</label>
          <input
            type="range"
            min={1}
            max={100}
            name="porcentaje"
            value={formData.porcentaje}
            onChange={handleChange}
            step={0.01}
            list="markers"
          />
          <datalist id="markers">
            <option value="1"></option>
            <option value="25"></option>
            <option value="33.33"></option>
            <option value="50"></option>
            <option value="66.66"></option>
            <option value="75"></option>
            <option value="100"></option>
          </datalist>
        </div>

      </form>
    </div>
  );
}

export default EditGastoForm;