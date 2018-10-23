import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as sc from './app.styled';
import {connect} from 'react-redux'
import TopBarContainer from '../top-bar/TopBarContainer';
import { Layout } from '../layout';
import GraphContainer from '../graph-container/GraphContainer';
import BottomPanelContainer from '../bottom-panel/BottomPanelContainer';
import MappingMenuContainer from '../mapping-menu/MappingMenuContainer';
import CollapseMenuContainer from '../collapse-menu/CollapseMenuContainer';
import LoginView from '../login-view/LoginView';
import appCtrl from './app.controller';



class App extends Component {
    constructor(props) {
        super(props);
    }

    /**************** Todo: refactor this block **************/

    componentDidMount() {
        // todo: refactor to appropriate location
        if (this.props.auth.loggedIn) {
            this.props.initGraph({
                eventHandlers: {
                    tap: ['node', this.props.onNodeClick],
                    mouseover: ['node', this.props.onNodeMouseOver],
                    mouseout: ['node', this.props.onNodeMouseOut],
                    cxttap: ['node', this.props.onCtxClick]
                }
            });
        }

    }

    /**************************************************************/


    render() {
        if (!this.props.auth.loggedIn) {
            // if there's no logged in user
            // render the login view
            return <LoginView/>
        } else {
            // render main view
            return (
                <Layout>
                    <sc.TopContent id="container-top">
                        <TopBarContainer id="top-bar-container"/>
                        <sc.MappingContent id="mapping-content-container">
                            <MappingMenuContainer loadDependencyMap={this.loadDependencyMap}/>
                            <GraphContainer/>
                            <CollapseMenuContainer/>
                        </sc.MappingContent>
                    </sc.TopContent>
                    <BottomPanelContainer id="bottom-panel"/>
                </Layout>
            );
        }
    }
}


App.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onNodeClick: PropTypes.func.isRequired,
    onNodeMouseOver: PropTypes.func.isRequired,
    onNodeMouseOut: PropTypes.func.isRequired,
    onCtxClick: PropTypes.func.isRequired,
};


export default connect(
    appCtrl.mapStateToProps,
    appCtrl.mapDispatchToProps
)(App);



