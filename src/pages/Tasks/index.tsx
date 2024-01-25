import React, { useState, useEffect } from "react";
import { Badge, Button, Table, Container, Row, Col } from "react-bootstrap";
import { Trash, Pencil, Eye, CalendarCheck, Plus } from "@phosphor-icons/react";
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

  async function finishTask({ taskId }: { taskId: number }) {
    await api.patch(`/tasks/${taskId}`);
    loadTasks();
  }

  const deleteTask = async (taskId: number) => {
    try {
      const existingTask = tasks.find((task) => task.id === taskId);

      if (!existingTask) {
        console.error(`Task with ID ${taskId} not found.`);
        return;
      }

      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
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
    <Container data-bs-theme="dark">
      <div className="task-header my-5">
        <h3>Todo List</h3>
        <Button size="lg" variant="primary" onClick={newTask}>
          Criar <Plus size={24} />
        </Button>
      </div>
      <Row>
        <Col>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data de atualização</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{format(task.updated_at, "dd/MM/yyyy HH:mm:ss")}</td>
                  <td>
                    <Badge bg={task.finished ? "secondary" : "danger"}>
                      {task.finished ? "DONE" : "PENDING"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      disabled={task.finished}
                      onClick={() => editTask(task.id)}
                      title="Editar"
                    >
                      <Pencil size={32} />
                    </Button>{" "}
                    <Button
                      size="sm"
                      disabled={task.finished}
                      variant="success"
                      onClick={() => finishTask({ taskId: task.id })}
                      title="Finalizar"
                    >
                      <CalendarCheck size={32} />
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => viewTask(task.id)}
                      title="Visualizar"
                    >
                      <Eye size={32} />
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteTask(task.id)}
                      title="Excluir"
                    >
                      <Trash size={32} />
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
