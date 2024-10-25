import "./App.css";
import ToDoCard from "./toDoCard/ToDoCard";
import Routes from "./router-pages/Router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
