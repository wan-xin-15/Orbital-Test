import React, {useState, useEffect} from "react";
import Axios from "axios";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Community from "./pages/Community.tsx";
import Cafes from "./pages/Cafes.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Apps = () => {
  const [data, setData] = useState("");

  const getData = async() => {
    const response = await Axios.get("http://localhost:5000/getData");
    setData(response.data);
  }

useEffect(()=>{
  getData()
},[]);

return (
  <div>{data}</div>
)
}

function App() {
  return (
    <div className="Routes">
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/cafes" element={<Cafes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
