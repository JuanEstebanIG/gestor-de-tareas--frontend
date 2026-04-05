import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";

function NotFoundPage() {
  return (
    <EmptyState
      title="Página no encontrada"
      description="La ruta que intentaste abrir no existe dentro de este proyecto."
      action={
        <Link to="/" className="button-primary">
          Volver al dashboard
        </Link>
      }
    />
  );
}

export default NotFoundPage;
