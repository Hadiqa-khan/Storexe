import { EthProvider } from "./contexts/EthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFileS from "./components/MyFileS";
import Home from "./components/home";
import FileShared from "./components/FileShared";

function App() {
  
  return (
    <EthProvider>
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          
          <Route index element={<Home />} />
          <Route path="/FileShared" element={<FileShared />} />
          <Route path="/MyFiles" element={<MyFileS />} />
        </Route>
      </Routes>
    </Router>
    
    
    </div>
    </EthProvider>
  );
}

export default App;
