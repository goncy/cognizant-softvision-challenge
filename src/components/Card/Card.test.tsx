import * as React from "react";
import {render, fireEvent} from "@testing-library/react";

import "@testing-library/jest-dom";
import Card from "./Card";

test("Render Card with its props and actions are called after click buttons", () => {
  const cardProps = {
    name: "Mateo",
    comment: "Normal",
  };

  const clickPrevAction = jest.fn();
  const clickNextAction = jest.fn();

  const {getByText} = render(
    <Card
      comment={cardProps.comment}
      nameCandidate={cardProps.name}
      onClickNext={clickNextAction}
      onClickPrev={clickPrevAction}
    />,
  );

  const name = getByText(cardProps.name);
  const comment = getByText(cardProps.comment);

  expect(name).toBeInTheDocument();
  expect(comment).toBeInTheDocument();

  fireEvent.click(getByText("<"));
  fireEvent.click(getByText(">"));
  expect(clickPrevAction).toHaveBeenCalled();
  expect(clickNextAction).toHaveBeenCalled();
});
