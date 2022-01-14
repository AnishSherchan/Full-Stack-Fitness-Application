import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        Upcomming Project "Guardian Fitness" <Badge bg="secondary">New</Badge>{" "}
      </h1>
      <h2>
        Example heading <Badge bg="secondary">New</Badge>
      </h2>
      <Button variant="primary">Primary</Button>{" "}
    </div>
  );
}
