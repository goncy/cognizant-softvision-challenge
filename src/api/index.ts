import {Candidate} from "../types/candidate";

import candidates from "./candidates.json";

export default {
  candidates: {
    list: (): Promise<Candidate[]> => Promise.resolve(JSON.parse(JSON.stringify(candidates))),
  },
};
