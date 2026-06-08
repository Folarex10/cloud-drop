import { useState } from "react";
import API from "../services/api";

function FileUpload({ refreshFiles }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    await API.post("/upload", formData);

    setFile(null);

    refreshFiles();
  };

  return (
    <div className="upload-box">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;