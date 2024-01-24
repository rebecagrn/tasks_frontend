import React, { useState, useEffect } from "react";
import { Badge, Button, Table, Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

export interface ITask {
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

  const loadTasks = async () => {
    try {
      const response = await api.get("tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const newTask = () => {
    navigate("/nova-tarefa");
  };

  const editTask = (taskId: number) => {
    navigate(`/nova-tarefa/${taskId}`);
  };

  const viewTask = (taskId: number) => {
    navigate(`/tarefas/${taskId}`);
  };

  return (
    <Container>
      <div className="task-header my-5">
        <h3>Tasks page</h3>
        <Button size="sm" variant="dark" onClick={newTask}>
          Nova tarefa
        </Button>
      </div>
      <Row>
        <Col>
          <Table striped bordered hover responsive className="text-center">
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
                      {task.finished ? "Concluída" : "Pendente"}
                    </Badge>
                  </td>
                  <td>
                    <Button size="sm" onClick={() => editTask(task.id)}>
                      Editar
                    </Button>{" "}
                    <Button size="sm" variant="success">
                      Finalizar
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => viewTask(task.id)}
                    >
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
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
