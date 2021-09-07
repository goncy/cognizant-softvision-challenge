import * as React from "react";
import {render} from "@testing-library/react";

import {columnTypes} from "../../consts/columnTypes";
import * as candidates from "../../api/candidates.json";
import {Candidate} from "../../types/candidate";

import Column from ".";

test("Should render all the cards passed by parameter", () => {
  const column = columnTypes[0];
  const candidatesProp = candidates as Candidate[];
  const clickPrevAction = jest.fn();
  const clickNextAction = jest.fn();

  const {getByRole, getByTestId} = render(
    <Column
      candidates={candidatesProp}
      name={column.name}
      onClickNext={clickNextAction}
      onClickPrev={clickPrevAction}
    />,
  );

  expect(getByRole("heading").textContent).toBe(column.name);
  expect(getByTestId("list").childNodes).toHaveLength(candidatesProp.length);
});
