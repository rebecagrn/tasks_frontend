import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TasksForm from "./pages/Tasks/Form";
import TasksDetail from "./pages/Tasks/Detail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tarefas" element={<Tasks />} />
      <Route path="/nova-tarefa" element={<TasksForm />} />
      <Route path="/nova-tarefa/:id" element={<TasksForm />} />
      <Route path="/tarefas/:id" element={<TasksDetail />} />
    </Routes>
  );
};

export default AppRoutes;
