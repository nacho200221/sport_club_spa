import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getSports, deleteSport, updateSport } from '../../services/sportService'; // Asegura la ruta
import { formatDate } from "../../utils/dateformatters";
import SportFormModal from '../../components/sports/SportFormModal'; // Tu nuevo componente modal

function SportsPage() {
  const [sports, setSports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sportToEdit, setSportToEdit] = useState(null);

  const fetchSports = async () => {
    try {
      const res = await getSports();
      setSports(res.data);
    } catch (err) {
      Swal.fire('Error', 'No se pudieron cargar los deportes', 'error');
    }
  };

  useEffect(() => { fetchSports(); }, []);

  const handleEdit = (sport) => {
    setSportToEdit(sport);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSportToEdit(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "¿Está seguro de eliminar este deporte?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    });

    if (result.isConfirmed) {
      try {
        await deleteSport(id);
        Swal.fire('Éxito', 'Deporte eliminado', 'success');
        fetchSports();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el deporte', 'error');
      }
    }
  };

  const toggleStatus = async (sport) => {
    try {
      await updateSport(sport.id, { ...sport, state: !sport.state });
      fetchSports();
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Gestión de Deportes</h2>
        <div>
           <Button variant="secondary" onClick={fetchSports} className="me-2">Refrescar</Button>
           <Button variant="success" onClick={handleCreate}>+ Nuevo Deporte</Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Objetivo</th>
            <th>Duración</th>
            <th>Fecha Creación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sports.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.objective}</td>
              <td>{s.duration}</td>
              <td>{formatDate(s.created_at)}</td>
              <td>
                <Button 
                  variant={s.state ? "success" : "secondary"} 
                  size="sm" 
                  onClick={() => toggleStatus(s)}
                >
                  {s.state ? "Activo" : "Inactivo"}
                </Button>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(s)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SportFormModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        sport={sportToEdit} 
        onSave={fetchSports} 
      />
    </div>
  );
}

export default SportsPage;