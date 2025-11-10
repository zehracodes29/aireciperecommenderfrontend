"use client";
import { useState } from "react";
import React from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("myFile", file); // 'myFile' must match multer field name

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>React File Upload using Multer</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    margin: "50px",
    textAlign: "center",
  },
};

export default FileUpload;