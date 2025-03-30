import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";

export const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outline-primary" onClick={() => navigate(routes.country)}>
      Go back
    </Button>
  );
};
