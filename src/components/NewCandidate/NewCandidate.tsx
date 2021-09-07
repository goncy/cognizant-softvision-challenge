import React from "react";
import {useForm} from "react-hook-form";

import styles from "./NewCandidate.module.scss";

interface Props {
  submitForm: any;
  onClose: any;
}

export default function NewCandidate({submitForm, onClose}: Props) {
  const {register, handleSubmit} = useForm();

  function onSubmit(data: any) {
    submitForm(data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>New Candidate</h2>
        <form
          className={styles.form}
          data-cy="new-candidate-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input {...register("name")} required placeholder="Candidate Name" type="text" />
          <textarea {...register("comments")} cols={30} placeholder="Comments" rows={10} />
          <button type="submit"> Add </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
