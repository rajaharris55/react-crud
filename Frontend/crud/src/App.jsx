import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import User from "./User";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/update/:userId" element={<UpdateUser />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
