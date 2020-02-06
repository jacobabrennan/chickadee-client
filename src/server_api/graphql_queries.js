

//== GraphQL Queries, Mutations, and Subscriptions =============================

//-- Dependencies --------------------------------
import { gql } from 'apollo-boost';

//-- User ----------------------------------------
export const QUERY_userGet = gql`query getUser($userId: String!) {
    userGet(userId: $userId) {
        userId
        name
        description
        portraitUrl
    }
}`;
export const MUTATION_userUpdate = gql`mutation updateUser($name: String, $description: String, $portrait: String) {
    userUpdate(name: $name, description: $description, portrait: $portrait) {
        userId
        name
        description
        portraitUrl
    }
}`;
export const QUERY_userDataPackage = gql`query userDataPackage($userId: String!) {
    userGet(userId: $userId) {
        userId
        name
        description
        portraitUrl
        followers {
            countFollowers
            countFollowing
            following
            follows
        }
    }
    userActivityGet(userId: $userId) {
        posts {
            postId
            authorId
            text
            created
        }
        userContexts {
            userId
            name
            portraitUrl
        }
    }
}`;

//-- Post ----------------------------------------
export const QUERY_postGet = gql`query getPost($postId: String!) {
    postGet(postId: $postId) {
        posts {
            postId
            authorId
            text
            created
        }
        userContexts {
            userId
            name
            portraitUrl
        }
    }
}`;
export const MUTATION_postCreate = gql`mutation newPost($text: String!) {
    postCreate(text: $text) {
        posts {
            postId
            authorId
            text
            created
        }
        userContexts {
            userId
            name
            portraitUrl
        }
    }
}`;

//-- Feed ----------------------------------------
// NOTE: How to remove useless "getFeed" token?
export const QUERY_feedGet = gql`query Feed($userId: String!) {
    feedGet(userId: $userId) {
        posts {
            postId
            authorId
            text
            created
        }
        userContexts {
            userId
            name
            portraitUrl
        }
    }
}`;

//-- Follow --------------------------------------
export const QUERY_followersGet = gql`query Followers($userId: String!) {
    followersGet(userId: $userId) {
        userId
        name
        description
        portraitUrl
        followers {
            following
            follows
        }
    }
}`;
export const QUERY_followsGet = gql`query Follows($userId: String!) {
    followsGet(userId: $userId) {
        userId
        name
        description
        portraitUrl
        followers {
            following
            follows
        }
    }
}`;
export const MUTATION_followLinkAdd = gql`mutation AddFollow($targetId: String!) {
    followLinkAdd(targetId: $targetId)
}`;
export const MUTATION_followLinkRemove = gql`mutation RemoveFollow($targetId: String!) {
    followLinkRemove(targetId: $targetId)
}`;
