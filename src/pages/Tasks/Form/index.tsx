import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
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

  const backToPage = () => {
    navigate("/tarefas");
  };

  const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id !== undefined) {
      await api.put(`/tasks/${id}`, model);
    } else {
      await api.post("/tasks", model);
    }
    backToPage();
  };

  const findTask = async (taskId: string) => {
    const response = await api.get(`/tasks/${taskId}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
    });
  };

  return (
    <Container data-bs-theme="dark">
      <div className="task-header mt-4">
        <h4>Crie uma nova tarefa</h4>
        <Button size="lg" variant="primary" onClick={backToPage}>
          Voltar
        </Button>
      </div>
      <Row className="mt-4 pt-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={model.title}
                onChange={updateModel}
                placeholder="Escreva um título para a nova tarefa"
                className="p-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={model.description}
                onChange={updateModel}
                placeholder="Escreva uma descrição"
                className="p-3"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" size="lg">
                Salvar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
