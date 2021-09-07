import React from "react";

import styles from "./Card.module.scss";

interface Props {
  nameCandidate: string;
  comment: string;
  onClickPrev: any;
  onClickNext: any;
}

export default function Card({nameCandidate, comment, onClickPrev, onClickNext}: Props) {
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.name}>{nameCandidate}</div>
        <div className={styles.comment}>{comment}</div>
      </div>
      <div>
        <button onClick={onClickPrev}> {"<"} </button>
        <button onClick={onClickNext}> {">"} </button>
      </div>
    </div>
  );
}
