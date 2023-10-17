import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/multiply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num1: num1,
        num2: num2,
      }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setUploadStatus(data.message);
  };

  return (
    <>
      <Head>
        <title>Multiplication App</title>
        <meta
          name="description"
          content="React app to multiply two numbers and upload files"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Multiplication App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            required
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            required
          />
          <button type="submit">Multiply</button>
        </form>
        {result !== null && <p>Result: {result}</p>}

        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </main>
    </>
  );
}
