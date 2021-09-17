import React from "react";
import styles from "../../styles/FeaturesCard.module.css";
import Image from "next/image";

const FeaturesCard = () => {
  return (
    <div className={styles.card}>
      <img src="https://picsum.photos/40/40" alt="Random Image" />
      <h2>Title</h2>
      <p>This is where the description goes</p>
    </div>
  );
};

export default FeaturesCard;
