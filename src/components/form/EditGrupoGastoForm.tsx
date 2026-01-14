import React, { useEffect, useRef } from "react";
import type { GrupoGasto } from "../../interfaces/GrupoGasto";
import { grupoGastoService } from "../../services/grupoGastoService";
import "./EditGrupoGastoForm.css";

interface EditGrupoGastoFormProps {
  grupoGasto: GrupoGasto;
}

const EditGrupoGastoForm = ({ grupoGasto }: EditGrupoGastoFormProps) => {

  const [formData, setFormData] = React.useState<GrupoGasto>({
    nombre: grupoGasto.nombre,
    fechaInicio: grupoGasto.fechaInicio,
    fechaFin: grupoGasto.fechaFin || ''
  });

  const initialValues = useRef({
    nombre: grupoGasto.nombre,
    fechaInicio: grupoGasto.fechaInicio,
    fechaFin: grupoGasto.fechaFin || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const updateGrupoGasto = async () => {
      if (!grupoGasto.idGrupoGasto) return;

      const fechaInicioModificada = formData.fechaInicio !== initialValues.current.fechaInicio;
      const fechaFinModificada = formData.fechaFin !== initialValues.current.fechaFin;

      if (!isFormDataValid()) {
        return;
      }

      if (fechaInicioModificada || fechaFinModificada) {
        try {
          await grupoGastoService.update(grupoGasto.idGrupoGasto, formData);
          
          initialValues.current.fechaInicio = formData.fechaInicio;
          initialValues.current.fechaFin = formData.fechaFin || '';
        } catch (error) {
          console.error('Error al actualizar grupo de gasto:', error);
        }
      }
    };

    updateGrupoGasto();
  }, [formData.fechaInicio, formData.fechaFin]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!grupoGasto.idGrupoGasto) return;

      const nombreModificado = formData.nombre !== initialValues.current.nombre;

      if (nombreModificado && formData.nombre.trim() !== '') {
        try {
          await grupoGastoService.update(grupoGasto.idGrupoGasto, formData);
          initialValues.current.nombre = formData.nombre;
        } catch (error) {
          console.error('Error al actualizar grupo de gasto:', error);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.nombre]);

  const isFormDataValid = () => {
    return formData.nombre.trim() !== '' && formData.fechaInicio.trim() !== '';
  }

  return (
    <form className="grupo-gasto-form" >
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          className="grupo-gasto-nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del grupo de gasto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha de inicio</label>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha de fin</label>
        <input
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EditGrupoGastoForm;