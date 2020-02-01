

//== GraphQL Queries, Mutations, and Subscriptions =============================

//-- Dependencies --------------------------------
import { gql } from "apollo-boost";

//-- User ----------------------------------------
export const QUERY_userGet = gql`query getUser($userId: String!) {
    userGet(userId: $userId) {
        userId
        name
        description
    }
}`;
export const MUTATION_userUpdate = gql`mutation updateUser($name: String, $description: String) {
    userUpdate(name: $name, description: $description) {
        userId
        name
        description
    }
}`;
export const QUERY_userDataPackage = gql`query userDataPackage($userId: String!) {
    userGet(userId: $userId) {
        userId
        name
        description
        followers {
            count
            following
            follows
        }
    }
    userActivityGet(userId: $userId) {
        postContexts {
            post {
                postId
                authorId
                text
                created
            }
        }
    }
}`;

//-- Post ----------------------------------------
export const MUTATION_postCreate = gql`mutation newPost($text: String!) {
    postCreate(text: $text) {
        post {
            postId
            authorId
            text
            created
        }
    }
}`;

//-- Feed ----------------------------------------
// NOTE: How to remove useless "getFeed" token?
export const QUERY_feedGet = gql`query Feed($userId: String!) {
    feedGet(userId: $userId) {
        postContexts {
            post {
                postId
                authorId
                text
                created
            }
        }
    }
}`;

//-- Follow --------------------------------------
export const QUERY_followersGet = gql`query Followers($userId: String!) {
    followersGet(userId: $userId)
}`;
export const MUTATION_followLinkAdd = gql`mutation AddFollow($targetId: String!) {
    followLinkAdd(targetId: $targetId)
}`;
export const MUTATION_followLinkRemove = gql`mutation RemoveFollow($targetId: String!) {
    followLinkRemove(targetId: $targetId)
}`;
