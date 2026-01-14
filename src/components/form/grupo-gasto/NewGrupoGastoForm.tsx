import React from "react";
import type { GrupoGasto } from "../../../interfaces/GrupoGasto";
import "./NewGrupoGastoForm.css";

interface NewGrupoGastoFormProps {
	onSubmit: (data: GrupoGasto) => void;
	onCancel: () => void;
}

const NewGrupoGastoForm: React.FC<NewGrupoGastoFormProps> = ({ onSubmit, onCancel }) => {

	const [formData, setFormData] = React.useState<GrupoGasto>({
		nombre: '',
		fechaInicio: '',
		fechaFin: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className="new-grupo-gasto-form" onSubmit={handleSubmit}>
			<div>
				<div className="form-group">
					<label htmlFor="nombre">Nombre</label>
					<input
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
			</div>

			<div className="form-actions">
				<button type="button" className="btn-secondary" onClick={onCancel}>
					Cancelar
				</button>
				<button type="submit" className="btn-primary">
					Guardar
				</button>
			</div>
		</form>
	);
};

export default NewGrupoGastoForm;
