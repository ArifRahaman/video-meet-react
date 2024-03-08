import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login"
import Signup from "./components/Signup"
import RoomPage from "./components/Room"
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Hello world!!</h1> */}
      {/* <Signup/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
