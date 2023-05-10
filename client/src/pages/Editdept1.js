import React from "react";
import Editdeptinfo from "./Editdeptinfo";
import homeStyles from "./Home.module.css";

const Editdept1 = () => {
  return (
    <body className={homeStyles.rooted}>
    <section className={homeStyles["home-container"]} height="50%">
      <div className={homeStyles["content-container"]} style={{ width: "auto" }}>
        <header className={homeStyles["content-header"]}>
         
        </header>
        <div className={homeStyles["outlet-container"]}>
          <Editdeptinfo />
        </div>
      </div>

      </section>
      </body>
  );
};

export default Editdept1;