import React from "react";
import styles from "../../styles/Features.module.css";
import FeaturesCard from "./FeaturesCard";

const Features = () => {
  return (
    <div className={styles.container}>
      <FeaturesCard />
      <FeaturesCard />
      <FeaturesCard />
    </div>
  );
};

export default Features;
