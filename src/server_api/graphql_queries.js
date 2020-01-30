

//==============================================================================

//------------------------------------------------
export const QUERY_userGet = `query getUser($userId: String!) {
    userGet(userId: $userId) {
        userId
        name
        description
    }
}`
export const MUTATION_userUpdate = `mutation updateUser($name: String, $description: String) {
    userUpdate(name: $name, description: $description) {
        userId
        name
        description
    }
}`

//------------------------------------------------
export const MUTATION_postCreate = `mutation newPost($text: String!) {
    postCreate(text: $text) {
        postId
        userId
        text
        created
    }
}`;

//------------------------------------------------
export const QUERY_feedGet = `query Feed($userId: String!) {
    feedGet(userId: $userId) {
        posts {
            postId
            userId
            text
            created
        }
    }
}`;

//------------------------------------------------
export const QUERY_followersGet = `query Followers($userId: String!) {
    followersGet(userId: $userId)
}`;
export const MUTATION_followLinkAdd = `mutation AddFollow($targetId: String!) {
    followLinkAdd(targetId: $targetId)
}`;
export const MUTATION_followLinkRemove = `mutation RemoveFollow($targetId: String!) {
    followLinkRemove(targetId: $targetId)
}`;
