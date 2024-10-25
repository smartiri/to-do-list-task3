import { Routes as AppRoutes, Route } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import App from "../App";
import ToDoCard from "../toDoCard/ToDoCard";
import UpdateTodo from "./UpdateTodo";
const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<ToDoCard />} />
      <Route path="/todo/">
        <Route path="" element={<CreateTodo />} />
        <Route path=":id" element={<UpdateTodo />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
