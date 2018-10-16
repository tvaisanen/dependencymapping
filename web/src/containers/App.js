import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import TopBarContainer from '../components/top-bar/TopBarContainer';
import {
    Layout,
    LayoutCol,
} from '../components/';
import GraphContainer from '../components/graph-container/GraphContainer';
import {getResourceById} from "../common/resource-helpers";
import * as actionCreators from '../actions/index';
import BottomPaneContainer from '../components/bottom-panel/BottomPanelContainer';
import * as texts from '../data/text';
import * as events from '../common/graph.events';
import MappingMenuContainer from '../components/mapping-menu/MappingMenuContainer';
import CollapseMenuContainer from '../components/collapse-menu/CollapseMenuContainer';
import LoginView from '../components/login-view/LoginView';
import * as graphActions from '../store/graph/graph.actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cy: null,
            resourceCategories: [],
            showGraphButtons: false,
            detail: texts.landingDetail,
            detailType: "",
            info: ""
        };

        this.onNodeClick = this.onNodeClick.bind(this);
    }

    /**************** Todo: refactor this block **************/

    componentDidMount() {
        // todo: refactor to appropriate location
        if (this.props.auth.loggedIn) {
            this.props.initGraph({
                eventHandlers: {
                    tap: ['node', this.onNodeClick],
                    mouseover: ['node', events.onNodeMouseOver],
                    mouseout: ['node', events.onNodeMouseOut],
                    cxttap: ['node', events.onCtxClick]
                }
            });
        }

    }


    onNodeClick(evt) {
        // todo: refactor to appropriate location
        // node click requires actions within the cy context
        // and also in the context of the resources

        // first we need to have the resource where our target node is
        // pointing and a list of resources that the
        // target resource is connected to.

        // get the clicked node id
        const resourceName = evt.target.id();

        // set store active detail
        const clickedResource = getResourceById({
            id: resourceName,
            resources: this.props.resources
        });

        this.props.setActiveDetail({
            type: 'ASSET',
            data: clickedResource
        });
        // the active mapping state needs to be updated by
        // adding the resources of the expanded node.
        this.props.addActiveMappingResources(clickedResource.connected_to);

        // required parameters for handling the graph update are
        // to have the reference of cy, target and the resource name
        // list to the target is connected to

        const targetNames = clickedResource.connected_to.map(r => r.name);

        const layout = this.props.app.graph.selectedLayout;
        events.onNodeClick({...evt, targetNames, layout});
    }


    /**************************************************************/



    render() {


        if (!this.props.auth.loggedIn) {
            // if there's no logged in user
            // render the login view
            return <Layout><LoginView/></Layout>
        } else {
            // render main view
            return (
                <Layout>
                    <LayoutCol id="container-top" height={"60vh"} minHeight={"360px"}>
                        <TopBarContainer/>
                        <MappingContent>
                            <MappingMenuContainer loadDependencyMap={this.loadDependencyMap}/>
                            <GraphContainer/>
                            <CollapseMenuContainer/>
                        </MappingContent>
                    </LayoutCol>
                    <LayoutCol
                        id="container-bottom"
                        height={'40vh'}
                        minHeight={'240px'}
                        align={'center'}
                        grow={1}>
                        <BottomPaneContainer id="bottom-panel"/>
                    </LayoutCol>
                </Layout>
            );
        }
    }
}


App.propTypes = {
    addActiveMappingResources: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
        app: state.app,
        auth: state.auth,
        mappings: state.mappings,
        resources: state.resources,
        dependencies: state.dependencies,
        tags: state.tags,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail,
        debug: state.debug,
        cy: state.graph
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({...actionCreators}, dispatch),
    initGraph: ({eventHandlers}) => dispatch(graphActions.initGraph({eventHandlers}))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


export const MappingContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    height: ${props => props.height ? props.height : 'inherit'};
    overflow: hidden;
`;
