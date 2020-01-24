

//==============================================================================\

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from './client_api';

//------------------------------------------------\
function ViewUser() {
    const [user, setUser] = useState(undefined);
    // Retrieve user id from url
    const match = routing.useRouteMatch();
    const userId = match.params.id;
    // Request user from server
    useEffect(function () {
        clientAPI.userGet(userId).then(function (result) {
            return setUser(result);
        });
    }, [userId]);
    // Display user
    if(user === undefined) {
        return 'Requesting';
    }
    if(user === null) {
        return 'User not found';
    }
    return (
        <React.Fragment>
            Found the user
            <br />
            {user.id}
        </React.Fragment>
    );
}
function ViewPost() {
    const [post, setPost] = useState(undefined);
    // Retrieve post id from url
    const match = routing.useRouteMatch();
    const postId = match.params.id;
    // Request post from server
    // useEffect(function () {
    //     API.getPost(postId).then(
    //         function (result) { return setPost(result);}
    //     );
    // }, [postId]);
    // Display post
    if(post === undefined) {
        return 'Requesting';
    }
    if(post === null) {
        return 'Post not found';
    }
    return (
        <React.Fragment>
            <h1>{post.author}</h1>
            <p>{post.body}</p>
        </React.Fragment>
    );
}
function ViewFeed() {
    return (<React.Fragment>
        'Feed'
        <button
            children="Logout"
            onClick={function () {
                clientAPI.logout();
            }}
        />
    </React.Fragment>);
}
function ViewNoRoute() {
    return '404';
}


//------------------------------------------------
export default function Client(props) {
    const [auth, setAuth] = useState(undefined);
    const [user, setUser] = useState(undefined);
    // Request post from server
    useEffect(function () {
        clientAPI.authenticate().then(function (result) {
            return setUser(result);
        });
    }, [auth]);
    console.log(user);
    if(user === undefined) {
        return <h1>Loading</h1>
    }
    if(user === null) {
        return (<React.Fragment>
            <h2>Not Authenticated</h2>
            <button
                children="Register (derp, 12345)"
                onClick={function () {
                    clientAPI.register('derp', '12345').then(
                        function (result) {
                            if(!result) { return}
                            clientAPI.authenticate().then(function (result2) {
                                return setUser(result2);
                            });
                        }
                    );
                }}
            />
            <button
                children="Login (herp, 12345)"
                onClick={function () {
                    clientAPI.login('herp', '12345').then(
                        function (result) {
                            if(!result) { return}
                            clientAPI.authenticate().then(function (result2) {
                                return setUser(result2);
                            });
                        }
                    );
                }}
            />
        </React.Fragment>);
    }
    return (
        <routing.BrowserRouter>
            <routing.Switch>
                <routing.Route path="/user/:id">
                    <ViewUser />
                </routing.Route>
                <routing.Route path="/post/:id">
                    <ViewPost />
                </routing.Route>
                <routing.Route exact path="/">
                    <ViewFeed />
                </routing.Route>
                <routing.Route>
                    <ViewNoRoute />
                </routing.Route>
            </routing.Switch>
        </routing.BrowserRouter>
    );
}
