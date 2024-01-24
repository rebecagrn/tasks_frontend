import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/nova-tarefa");
  }, [navigate]);

  return <h1>Redirecting to homepage...</h1>;
};

export default Home;
