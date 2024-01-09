import "./App.css";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [personsData, setPersonsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/candidates")
      .then((res) => setPersonsData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Home personsData={personsData} />
    </div>
  );
}

export default App;
