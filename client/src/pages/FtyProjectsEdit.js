
import React from "react";
import FtyProjectsEditPage from "../components/sign-up/FtyProjectsEditPage";
import homeStyles from "./Home.module.css";

const FtyProjectsEdit = () => {
  return (
    <body className={homeStyles.rooted}>
    <section className={homeStyles["home-container"]} height="50%">
      <div className={homeStyles["content-container"]} style={{ width: "auto" }}>
        <header className={homeStyles["content-header"]}>
         
        </header>
        <div className={homeStyles["outlet-container"]}>
          <FtyProjectsEditPage />
        </div>
      </div>

      </section>
      </body>
  );
};

export default FtyProjectsEdit;