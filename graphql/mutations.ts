import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation(
        $image: String!
        $body: String!
        $subreddit_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPost(
            body: $body
            image: $image
            subreddit_id: $subreddit_id
            title: $title
            username: $username
        ) {
            id
            created_at
            subreddit_id
            title
            image
            body
            username
        
        }
    }

`

export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!) {
        insertSubreddit(topic: $topic) {
            id
            topic
            created_at
        }
    }
    
`