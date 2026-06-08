import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

import API from "./services/api";

import "./App.css";

function App() {

  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await API.get("/files");
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>

      <Navbar />

      <div className="container">

        <FileUpload refreshFiles={fetchFiles} />

        <FileList
          files={files}
          refreshFiles={fetchFiles}
        />

      </div>

    </div>
  );
}

export default App;