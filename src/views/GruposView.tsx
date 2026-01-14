import { useEffect, useState } from "react";
import GrupoGastoCard from "../components/GrupoGastoCard";
import { useGruposGasto } from "../hooks/useGrupoGasto";
import type { GrupoGasto } from "../interfaces/GrupoGasto";
import { useNavigate } from "react-router-dom";
import "./GruposView.css";
import Modal from "../components/Modal";
import NewGrupoGastoForm from "../components/form/NewGrupoGastoForm";
import { grupoGastoService } from "../services/grupoGastoService";

const GruposView = () => {

	const navigate = useNavigate();
	const createGrupoGasto = grupoGastoService.create;

	const [filters, setFilters] = useState({
		nombre: undefined,
		fechaInicioDesde: undefined,
		fechaInicioHasta: undefined,
		fechaFinDesde: undefined,
		fechaFinHasta: undefined,
		pageable: {
			page: 0,
			size: 20,
			sort: []
		},
	});

	const grupos = useGruposGasto(filters);

	const [selectedGrupo, setSelectedGrupo] = useState<GrupoGasto | null>(null);
	const [isNewGrupoModalOpen, setIsNewGrupoModalOpen] = useState(false);

	const handleNextPage = () => {
		setFilters((prev) => ({
			...prev,
			pageable: {
				...prev.pageable,
				page: prev.pageable.page + 1,
			},
		}));
	};

	const handlePreviousPage = () => {
		setFilters((prev) => ({
			...prev,
			pageable: {
				...prev.pageable,
				page: Math.max(0, prev.pageable.page - 1),
			},
		}));
	};

	const handleSaveNewGrupo = async (data: GrupoGasto) => {
		if (!data.nombre || !data.fechaInicio) {
			alert("Por favor, complete los campos obligatorios.");
			return;
		}
		await createGrupoGasto(data);

		grupos.refetch();
		setIsNewGrupoModalOpen(false);
	}

	const handleCancelNewGrupo = () => {
		setIsNewGrupoModalOpen(false);
	}

	useEffect(() => {
		if (selectedGrupo?.idGrupoGasto) {
			navigate(`/grupo/${encodeURIComponent(selectedGrupo.idGrupoGasto)}`, { state: { grupoGasto: selectedGrupo } });
			setSelectedGrupo(null);
		}
	}, [selectedGrupo, navigate]);

	return (
		<div className="grupos-container">
			<div className="grupos-header">
				<h2>Grupos de gasto</h2>
				<button onClick={() => setIsNewGrupoModalOpen(true)}>Crear nuevo grupo</button>
			</div>

			<div className="grupos-list">
				{grupos.data?.content.map((grupo) => (
					<GrupoGastoCard key={grupo.idGrupoGasto} grupoGasto={grupo} setSelectedGrupo={setSelectedGrupo} />
				))}
			</div>

			<div className="grupos-pagination">
				<button onClick={handlePreviousPage} disabled={filters.pageable.page === 0 || grupos.loading}>
					Anterior
				</button>
				<label>Página {filters.pageable.page + 1}</label>
				<button onClick={handleNextPage} disabled={grupos.data?.last || grupos.loading}>
					Siguiente
				</button>
			</div>

			<Modal
				isOpen={isNewGrupoModalOpen}
				onClose={handleCancelNewGrupo}
				title="Crear nuevo grupo de gasto"
			>
				<NewGrupoGastoForm onSubmit={handleSaveNewGrupo} onCancel={handleCancelNewGrupo} />
			</Modal>
		</div>

	);
};

export default GruposView;