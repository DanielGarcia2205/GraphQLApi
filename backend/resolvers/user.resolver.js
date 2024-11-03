import { users } from "../dummyData/data.js";

const userResolved = {
  Query: {
    users: () => {
      return users;
    },
  },
  Mutation: {},
};

export default userResolved;
