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

  const backToHome = () => {
    navigate("/");
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
    backToHome();
  };

  const findTask = async (taskId: string) => {
    const response = await api.get(`/tasks/${taskId}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
    });
  };

  return (
    <Container>
      <div className="task-header mt-4">
        <h3>Tasks page</h3>
        <Button size="sm" variant="dark" onClick={backToHome}>
          Voltar
        </Button>
      </div>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={model.title}
                onChange={updateModel}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={model.description}
                onChange={updateModel}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
