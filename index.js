const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
 scalar Date
 """
 An Object thet describes the characterstics of skiday
 """
  type SkiDay {
    "A ski day's unique identifier"
    id: ID!
    date: Date
    moutain: String!
    conditions: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }
  type Query {
     totalDays : Int!,
     allDays:[SkiDay!]!
  }
  input AddDayInput {
    date: Date
    moutain: String!
    conditions: Conditions
  }
  type RemoveDayPayload {
   day: SkiDay!
   removed: Boolean
   totalBefore: Int
   totalAfter: Int
  }
  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!) : RemoveDayPayload
  }
  type Subscription {
    newDay: SkiDay!
  }
`;

const resolvers = {

};

const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Data",
    Query: () => ({
        allDays: () => [...new Array(5)]
    })
}
const server = new ApolloServer({
  typeDefs,
  mocks
});

server
.listen()
.then((url) => {
    console.log(`Server running at ${url.port}`);
});