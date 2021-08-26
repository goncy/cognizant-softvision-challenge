import {Candidate} from "../types/candidate";

export default {
  candidates: {
    list: (): Promise<Candidate[]> => Promise.resolve([]),
  },
};
