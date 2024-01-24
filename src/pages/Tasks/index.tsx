import React, { useState, useEffect } from "react";
import { Badge, Table } from "react-bootstrap";
import { format } from "date-fns";
import api from "../../services/api";

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

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("tasks");
    console.log(response);
    setTasks(response.data);
  }

  return (
    <div className="container">
      <h1 className="my-5">Tasks page</h1>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
