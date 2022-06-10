// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://estherville.stepzen.net/api/bumptious-echidna/__graphql",
    headers: {
        Authorization:  `Apikey ${process.env.STEPZEN_APIKEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;