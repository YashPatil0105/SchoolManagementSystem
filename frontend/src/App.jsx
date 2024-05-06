import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Attendance, Contact, Home, Record, Services ,Staff, Toggle} from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<About />} />
        <Route path="/parent" element={<Services />} />
        <Route path="/teacher" element={<Contact />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/record" element={<Record />} />
        <Route path="/toggle" element={<Toggle />} />
      </Routes>
    </div>
  );
}

export default App;
