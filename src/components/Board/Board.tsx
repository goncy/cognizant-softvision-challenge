import React, {useEffect, useState} from "react";

import api from "../../api";
import {columnTypes} from "../../consts/columnTypes";
import {Candidate} from "../../types/candidate";
import localStorage from "../../utils/localStorage";
import Column from "../Column";
import NewCandidate from "../NewCandidate";

import styles from "./Board.module.scss";

export default function Board() {
  const [candidates, setCandidates] = useState<Candidate[]>(
    localStorage.get("candidates") ? JSON.parse(localStorage.get("candidates") || "") : [],
  );
  const [modalNewCandidate, setModalNewCandidate] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.get("candidates")) return;
    loadCandidatesApi();

    return () => {};
  }, []);

  useEffect(() => {
    localStorage.set("candidates", JSON.stringify(candidates));
  }, [candidates]);

  function loadCandidatesApi() {
    api.candidates.list().then((data: Candidate[]) => {
      setCandidates(data);
      localStorage.set("candidates", JSON.stringify(data));
    });
  }

  function filterCandidatesByColumn(column: string) {
    return candidates.filter((c) => c.step === column);
  }

  function moveCardPrev(candidateId: string, i: number) {
    if (i === 0) return;
    const newColumn = columnTypes[i - 1].name;

    setCandidates((candidates) => {
      return candidates.map((c: Candidate) => (c.id === candidateId ? {...c, step: newColumn} : c));
    });
  }

  function moveCardNext(candidateId: string, i: number) {
    if (i === columnTypes.length - 1) return;
    const newColumn = columnTypes[i + 1].name;

    setCandidates((candidates) => {
      return candidates.map((c: Candidate) => (c.id === candidateId ? {...c, step: newColumn} : c));
    });
  }

  function addCandidate(data: {name: string; comments: string}) {
    toggleModal();
    const newCandidate: Candidate = {
      id: candidates.length.toString(),
      name: data.name,
      comments: data.comments,
      step: columnTypes[0].name,
    };

    setCandidates((candidates) => [...candidates, newCandidate]);
  }

  function toggleModal() {
    setModalNewCandidate((modal) => !modal);
  }

  function reloadCandidates() {
    localStorage.remove("candidates");
    loadCandidatesApi();
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.reload} onClick={reloadCandidates}>
        Reload Candidates again
      </button>
      <div className={styles.content}>
        {columnTypes.map((column, i) => (
          <Column
            key={i}
            candidates={filterCandidatesByColumn(column.name)}
            firstColumn={i === 0}
            name={column.name}
            newCandidate={toggleModal}
            onClickNext={(candidateId: string) => moveCardNext(candidateId, i)}
            onClickPrev={(candidateId: string) => moveCardPrev(candidateId, i)}
          />
        ))}
      </div>
      {modalNewCandidate && <NewCandidate submitForm={addCandidate} onClose={toggleModal} />}
    </div>
  );
}
