import React, { useState } from "react";
import axios from "axios";
import styles from "./Main.module.css";
import background from "./assets/images/background.jpeg";

function Main() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const handleEncrypt = async () => {
    try {
      console.log("Attempting to send message: " + message);
      const response = await axios.post("http://localhost:8080/encrypt", {
        message,
      });
      setEncrypted(response.data.encrypted);
      decryptMessage(response.data.encrypted); // Chain decryption
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  const decryptMessage = async (encryptedMessage) => {
    try {
      const response = await axios.post("http://localhost:8080/decrypt", {
        encryptedMessage,
      });
      setDecrypted(response.data.decrypted);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  return (
    <div>
      <img src={background} className={styles.background} />
      <div className={styles.vl1} />
      <div className={styles.vl2} />
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>Sender:</h1>
          <div className={styles.input}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleEncrypt}>Send</button>
          </div>
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>Middle Man:</h1>
          <p>{encrypted}</p>
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>Receiver:</h1>
          <p className={styles.response} >{decrypted}</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
