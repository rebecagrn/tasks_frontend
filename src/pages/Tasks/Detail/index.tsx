import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ITask } from "..";
import api from "../../../services/api";
import { format } from "date-fns";

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    console.log(response);
    setTask(response.data);
  }

  return (
    <Container>
      <div className="task-header my-5">
        <h3>Tasks detail</h3>
        <Button size="lg" variant="primary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Header className="mb-2">
                <Badge
                  bg={task?.finished ? "success" : "warning"}
                  className="mb-2"
                >
                  {task?.finished ? "Finalizado" : "Pendente"}
                </Badge>
                <Card.Title>{task?.title}</Card.Title>
              </Card.Header>
              <Card.Text className="p-3">{task?.description}</Card.Text>
              <Card.Footer className="d-flex justify-content-between">
                <small className="text-muted">
                  Criado em:{" "}
                  <Badge bg="secondary">
                    {task?.created_at
                      ? format(task.created_at, "dd/MM/yyyy")
                      : "N/A"}
                  </Badge>
                </small>
                <br />
                <small className="text-muted">
                  Atualizado em:{" "}
                  <Badge bg="info">
                    {task?.updated_at
                      ? format(task.updated_at, "dd/MM/yyyy")
                      : "N/A"}
                  </Badge>
                </small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
