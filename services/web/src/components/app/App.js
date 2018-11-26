import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as sc from './app.styled';
import {connect} from 'react-redux'
import TopBarContainer from '../top-bar/TopBarContainer';
import {Layout} from '../layout';
import BottomPanelContainer from '../bottom-panel/BottomPanelContainer';
import MappingMenuContainer from '../mapping-menu/MappingMenuContainer';
import CollapseMenuContainer from '../collapse-menu/CollapseMenuContainer';
import GroupTogglePanel from '../group-toggle-panel/';
import appCtrl from './app.controller';


class App extends Component {

    /**************** Todo: refactor this block **************/
    /* after doing this the component can be refactored to
       const App => ..
    */

    componentDidMount() {
        // todo: refactor to appropriate location
        this.props.initGraph({
            eventHandlers: {
                tap: ['node', this.props.onNodeClick],
                mouseover: ['node', this.props.onNodeMouseOver],
                mouseout: ['node', this.props.onNodeMouseOut],
                cxttap: ['node', this.props.onCtxClick]
            }
        });

    }
    /*********************************************************/

    render() {
        return (
            <Layout>
                <sc.TopContent id="container-top">
                    <TopBarContainer id="top-bar-container"/>
                    <sc.MappingContent id="mapping-content-container">
                        <MappingMenuContainer loadDependencyMap={this.loadDependencyMap}/>
                             <sc.GraphCanvasInflater>
            <sc.GraphCanvasContainer id="cy"/>
                            <GroupTogglePanel/>

                             </sc.GraphCanvasInflater>
                        <CollapseMenuContainer/>
                    </sc.MappingContent>
                </sc.TopContent>
                <BottomPanelContainer id="bottom-panel"/>
            </Layout>
        );
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



