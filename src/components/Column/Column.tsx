import React from "react";

import {Candidate} from "../../types/candidate";
import Card from "../Card";

import styles from "./Column.module.scss";

interface Props {
  name: string;
  candidates: Candidate[];
  onClickPrev: any;
  onClickNext: any;
  firstColumn?: boolean;
  newCandidate?: any;
}

export default function Column({
  name,
  candidates,
  onClickPrev,
  onClickNext,
  firstColumn = false,
  newCandidate,
}: Props) {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.content}>
        {candidates.length ? (
          candidates.map((candidate: Candidate) => (
            <Card
              key={candidate.id}
              comment={candidate.comments}
              nameCandidate={candidate.name}
              onClickNext={() => onClickNext(candidate.id)}
              onClickPrev={() => onClickPrev(candidate.id)}
            />
          ))
        ) : (
          <div className={styles.noContent}> No hay candidatos </div>
        )}
      </div>
      {firstColumn && (
        <button className={styles.add} onClick={newCandidate}>
          Agregar Candidato
        </button>
      )}
    </div>
  );
}
