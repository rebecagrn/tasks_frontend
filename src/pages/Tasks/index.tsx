import React, { useState, useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("tasks");
    console.log(response);
    setTasks(response.data);
  }

  function newTask() {
    navigate("/nova-tarefa");
  }

  function editTask(id: number) {
    navigate(`/nova-tarefa/${id}`);
  }

  return (
    <div className="container">
      <div className="task-header">
        <h1 className="my-5">Tasks page</h1>
        <Button size="sm" variant="dark" onClick={newTask}>
          Nova tarefa
        </Button>
      </div>
      <Table striped bordered hover variant="dark" className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Data de atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{format(task.updated_at, "dd/MM/yyyy HH:mm:ss")}</td>
              <td>
                <Badge bg="warning" text="dark">
                  {task.finished}
                </Badge>
              </td>
              <td>
                <Button size="sm" onClick={() => editTask(task.id)}>
                  Editar
                </Button>{" "}
                <Button size="sm" variant="success">
                  Finalizar
                </Button>{" "}
                <Button size="sm" variant="info">
                  Visualizar
                </Button>{" "}
                <Button size="sm" variant="danger">
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
