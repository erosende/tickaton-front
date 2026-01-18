import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { GrupoGasto } from "../interfaces/GrupoGasto";
import { grupoGastoService } from "../services/grupoGastoService";
import type { Gasto } from "../interfaces/Gasto";
import { gastoService } from "../services/gastoService";
import EditGrupoGastoForm from "../components/form/grupo-gasto/EditGrupoGastoForm";
import GastoItem from "../components/gasto/GastoItem";
import { usePersonas } from "../hooks/usePersona";
import "./DetalleGrupoView.css";
import EditGastoForm from "../components/form/gasto/EditGastoForm";
import { useGastoMutations } from "../hooks/useGasto";
import Modal from "../components/Modal";
import GrupoGastoStats from "../components/grupo-gasto/GrupoGastoStats";


export default function DetalleGrupoView() {

	const navigate = useNavigate();

	const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

	const { idGrupo } = useParams<{ idGrupo: string }>();
	const [grupoGasto, setGrupoGasto] = useState<GrupoGasto | undefined>(undefined);
	const [gastos, setGastos] = useState<Gasto[]>([]);

	const [selectedGasto, setSelectedGasto] = useState<Gasto | undefined>(undefined);
	const newGastoRef = useRef<HTMLDivElement>(null);

	const { createGasto, deleteGasto, updateGasto } = useGastoMutations();
	const personas = usePersonas().data;

	useEffect(() => {
		const fetchGrupoGasto = async () => {
			if (idGrupo) {
				try {
					const grupo = await grupoGastoService.getById(parseInt(idGrupo));
					setGrupoGasto(grupo);
				} catch (error) {
					console.error("Error al obtener el grupo de gasto:", error);
					navigate("/");
				}
			}
		};

		fetchGrupoGasto();
	}, [idGrupo]);

	useEffect(() => {
		const fetchGastos = async () => {
			if (grupoGasto?.idGrupoGasto) {
				try {
					const gastosResponse = await gastoService.getByGrupoGasto(grupoGasto.idGrupoGasto);
					setGastos(gastosResponse);
				} catch (error) {
					console.error("Error al obtener los gastos del grupo de gasto:", error);
				}
			}
		};

		fetchGastos();
	}, [grupoGasto]);

	useEffect(() => {
		if (selectedGasto && newGastoRef.current) {
			newGastoRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}, [selectedGasto]);

	const handleAddGasto = async () => {
		try {
			const newGasto = await createGasto(parseInt(idGrupo!), {
				concepto: "Nuevo Gasto",
				importe: 0,
				porcentaje: 50,
				idGrupoGasto: parseInt(idGrupo!),
				idPersona: personas[0]?.idPersona || 0,
			});

			if (newGasto) {
				setGastos(prevGastos => [...prevGastos, newGasto]);
				setSelectedGasto(newGasto);
			}

		} catch (error) {
			console.error("Error al añadir el gasto:", error);
		}
	};

	const handleDeleteGasto = async (idGrupoGasto: number, idGasto: number) => {
		try {
			await deleteGasto(idGrupoGasto, idGasto);
			setGastos(prevGastos => prevGastos.filter(gasto => gasto.idGasto !== idGasto));
			setSelectedGasto(undefined);
		} catch (error) {
			console.error("Error al eliminar el gasto:", error);
		}
	};

	const handleUpdateGasto = async (updatedGasto: Gasto) => {
		try {
			console.log("Actualizando gasto:", updatedGasto);
			console.log("idGrupo:", idGrupo);
			const updatedGastoResponse = await updateGasto(parseInt(idGrupo!), updatedGasto.idGasto!, updatedGasto);
			if (updatedGastoResponse) {
				setGastos(prevGastos =>
					prevGastos.map(gasto =>
						gasto.idGasto === updatedGastoResponse.idGasto ? updatedGastoResponse : gasto
					)
				);
				setSelectedGasto(updatedGastoResponse);
			}
		} catch (error) {
			console.error("Error al actualizar el gasto:", error);
		}
	}

	const handleCloseStatsModal = () => {
		setIsStatsModalOpen(false);
	};

	return (
		<div>
			<div className="detalle-grupo-header">
				<h2>Detalle del grupo de gasto</h2>
				<button className="open-stats-button" onClick={() => setIsStatsModalOpen(true)}>Ver estadísticas</button>
			</div>

			{grupoGasto ? (<EditGrupoGastoForm grupoGasto={grupoGasto} />) : (<p>Cargando grupo de gasto...</p>)}
			<div className="gastos-header">
				<div className="gastos-header-asociados">
					<h3>Gastos asociados: {gastos.length}</h3>
					<button className="add-new-gasto-button" onClick={handleAddGasto}>Añadir gasto</button>
				</div>
				<h3>Edición del gasto seleccionado</h3>

			</div>
			{gastos.length > 0 ? (
				<div className="gastos-container">
					<div className="gastos-list" >
						{gastos.map((gasto) => (
							<GastoItem
								key={gasto.idGasto}
								ref={selectedGasto?.idGasto === gasto.idGasto ? newGastoRef : null}
								gasto={gasto}
								personas={personas}
								onClick={() => setSelectedGasto(gasto)}
								isSelected={selectedGasto?.idGasto === gasto.idGasto}
								onDelete={() => handleDeleteGasto(parseInt(idGrupo!), gasto.idGasto!)}
							/>
						))}
					</div>
					<div className="gastos-edit-container">
						<EditGastoForm idGrupoGasto={parseInt(idGrupo!)} gasto={selectedGasto} onSave={handleUpdateGasto} personas={personas} />
					</div>
				</div>
			) : (
				<p>No hay gastos asociados a este grupo de gasto.</p>
			)}

			<Modal
				isOpen={isStatsModalOpen}
				onClose={handleCloseStatsModal}
				title={`Estadísticas del grupo: ${grupoGasto?.nombre}`}
			>
				<GrupoGastoStats grupoId={parseInt(idGrupo!)} isModalOpen={isStatsModalOpen} personas={personas} />
			</Modal>
			
		</div>
	);

}