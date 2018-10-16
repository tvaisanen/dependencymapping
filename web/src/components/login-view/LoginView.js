import React from 'react';
import {connect} from 'react-redux';
import {Inflater, Input} from "./login-view.styled";


// actions
import apiClient from '../../api/gwClientApi';
import * as authActions from '../../store/auth/auth.actions';
import * as actions from '../../actions';
import * as storeActions from '../../store';


const listenInput = (e, data, login) => {
    if (e.key === "Enter") {
        login(data);
    }
};



const login = (data) => {
    console.info("login(data);");
    return function (dispatch) {

        console.info("login(data) -> function(dispatch){");
        console.info("\tgetLoginCredentials(data);\n}");
        const {username, password} = getLoginCredentials(data);
        const promise = apiClient.login({username, password});

        promise.then(response => {
            // set user logged in
            dispatch(authActions.loginSuccess(response.data));
            // load the resources after logging in
            dispatch(actions.loadAllMappings());
            dispatch(storeActions.loadAllResources());
            dispatch(storeActions.loadAllTags());
        }).catch(error => {
            console.info(error);
            console.info(error.response.data);
            console.info(JSON.stringify(error));
        });

        console.info(`apiClient.login(username:${username}, password:${password})`)
        console.info("Todo: dispatch(authActions.login(credentials))");
    }
};

const getLoginCredentials = data => ({
    username: data.username.value,
    password: data.password.value
});


const LoginView = props => {
    return (
        <Inflater>
            <label>username:</label>
            <Input
                type="text"
                name="username"
                innerRef={ref => this.username = ref}
                onKeyUp={e => listenInput(e, this)}
            />
            <label>password:</label>
            <Input
                type="password"
                name="password"
                innerRef={ref => this.password = ref}
                onKeyUp={e => listenInput(e, this, props.login)}
            />
            <button onClick={() => props.login(this)}>Login</button>
            <small>forgot password?</small>
        </Inflater>
    )
};

const loginViewController = {
    mapStateToProps: (state) => {},
    mapDispatchToProps: (dispatch) => ({
       login: (data) => dispatch(login(data))
    })
};

export default connect(
    loginViewController.mapStateToProps,
    loginViewController.mapDispatchToProps
)(LoginView);

