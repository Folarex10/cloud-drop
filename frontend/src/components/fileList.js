import API from "../services/api";

function FileList({ files, refreshFiles }) {

  const handleDelete = async (id) => {
    await API.delete(`/files/${id}`);
    refreshFiles();
  };

  return (
    <div className="file-list">

      {files.map((file) => (
        <div className="file-card" key={file.id}>

          <h4>{file.originalname}</h4>

          <p>{Math.round(file.size / 1024)} KB</p>

          <a
            href={file.url}
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>

          <button onClick={() => handleDelete(file.id)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default FileList;