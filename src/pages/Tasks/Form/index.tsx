import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

interface ITaskForm {
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      findTask(id!);
    }
  }, [id]);

  const [model, setModel] = useState<ITaskForm>({
    title: "",
    description: "",
  });

  function backToHome() {
    navigate("/");
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/tasks/${id}`, model);
    } else {
      const response = await api.post("/tasks", model);
    }
    backToHome();
  }

  async function findTask(id: string) {
    const response = await api.get(`/tasks/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
    });
  }

  return (
    <div className="container">
      <div className="task-header">
        <h3 className="my-5">Tasks page</h3>
        <Button size="sm" variant="dark" onClick={backToHome}>
          Voltar
        </Button>
      </div>
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Tasks;
