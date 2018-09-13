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
import GraphContainer from './GraphContainer';
import { clearGraph } from '../common/graph-helpers';
import {getResourceById} from "../common/resource-helpers";
import * as actionCreators from '../actions/index';
import * as constants from '../constants/';
import BottomPaneContainer from '../components/bottom-panel/BottomPanelContainer';
import * as texts from '../data/text';
import * as events from '../common/graph.events';
import {layoutOptions} from "../configs/configs.cytoscape";
import MappingMenuContainer from '../components/mapping-menu/MappingMenuContainer';
import CollapseMenuContainer from '../components/collapse-menu/CollapseMenuContainer';
import * as activeMappingHelpers from '../common/dependency-map.helpers';

const LAYOUT = 'cola';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cy: null,
            resourceCategories: [],
            showGraphButtons: false,
            detail: texts.landingDetail,
            detailType: "",
            layout: LAYOUT,
            info: "I'm an info panel"
        };

        this.setResourceDetail = this.setResourceDetail.bind(this);
        this.toggleFloatingButtons = this.toggleFloatingButtons.bind(this);
        this.setCategoryDetail = this.setCategoryDetail.bind(this);
        this.setDetail = this.setDetail.bind(this);
    }

    componentDidMount() {
        this.props.initGraph({
            eventHandlers: {
                tap: ['node', this.onNodeClick],
                mouseover: ['node', events.onNodeMouseOver],
                mouseout: ['node', events.onNodeMouseOut],
                cxttap: ['node', events.onCtxClick]
            }
        });

    }

    updateLayout() {
        const options = layoutOptions.cola;
        //const layout = this.state.cy.layout({name: this.state.layout, ...options});

        const layout = this.props.cy.layout({name: this.state.layout, ...options});
        layout.run();
    }


    onNodeClick = (evt) => {
        // node click requires actions within the cy context
        // and also in the context of the resources

        // first we need to have the resource where our target node is
        // pointing and a list of resources that the
        // target resource is connected to.

        const resourceName = evt.target.id();

        this.setResourceDetail(resourceName);
        const clickedResource = getResourceById({
            id: resourceName,
            resources: this.props.resources
        });

        // the active mapping state needs to be updated by
        // adding the resources of the expanded node.
        this.props.addActiveMappingResources(clickedResource.connected_to);

        // required parameters for handling the graph update are
        // to have the reference of cy, target and the resource name
        // list to the target is connected to

        const targetNames = clickedResource.connected_to.map(r => r.name);
        events.onNodeClick({...evt, targetNames});
    }


    loadDependencyMap = (mapId) => {
        activeMappingHelpers.loadDependencyMap(
            mapId,
            this.props.cy,
            this.props.mappings,
            this.props.resources
        );
    };



    setDetail({detail, type, detailObject}) {
        // todo: refactor to store? CLEAN!
        this.props.setActiveDetail({data: detail, type});
        if (detail === constants.EMPTY) {
            clearGraph(this.state.cy);
            this.setState({detail: {name: "no selection", description: "no selection"}});
            this.props.clearActiveMappingSelection();
            return;
        }
        switch (type) {
            case constants.MAPPING:
                this.loadDependencyMap(detail);
                break;
            case constants.ASSET:
                this.setResourceDetail(detail);
                break;
            case constants.TAG:
                this.setCategoryDetail(detail);
                break;
            default:
                break;
        }
    }


    setResourceDetail(resourceId) {
        const clickedResource = getResourceById({id: resourceId, resources: this.props.resources});
        // add attribute type to the object
        // this is needed when edit is used from detailview
        this.props.setActiveDetail({data: clickedResource, type: constants.ASSET});
        this.setState({detail: clickedResource, detailType: constants.ASSET});
    }

    setCategoryDetail(categoryId) {
        const clickedTag = this.props.tags.filter(r => r.name === categoryId)[0];
        this.props.setActiveDetail({data: clickedTag, type: constants.TAG});
        this.setState({detail: clickedTag, detailType: constants.TAG})
    }

    toggleFloatingButtons() {
        this.setState({showGraphButtons: !this.state.showGraphButtons});
    }

    render() {
        return (
            <Layout>
                <LayoutCol id="container-top" height={"60vh"} minHeight={"360px"}>
                    <TopBarContainer info={this.state.info} menuToggleHandler={this.toggleFloatingButtons}/>
                    <MappingContent>
                        <MappingMenuContainer loadDependencyMap={this.loadDependencyMap}/>
                        <GraphContainer elements={this.state.elements}/>
                        <CollapseMenuContainer visible={this.state.showGraphButtons}/>
                    </MappingContent>
                </LayoutCol>
                <LayoutCol
                    id="container-bottom"
                    height={'40vh'}
                    minHeight={'240px'}
                    align={'center'}
                    grow={1}>
                    <BottomPaneContainer
                        id="bottom-panel"
                        detail={this.state.detail}
                        detailType={this.state.detailType}
                        setResourceDetail={this.setResourceDetail}
                        setDetail={this.setDetail}
                        cy={this.props.cy}
                    />
                    {/*<PreviewAndFormsContainer detail={this.state.detail}/>*/}
                </LayoutCol>
            </Layout>
        );
    }
}




App.propTypes = {
    addActiveMappingResources: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



export const MappingContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props=>props.justify};
    align-items: ${props=>props.align};
    height: ${props=>props.height? props.height: 'inherit'};
    overflow: hidden;
`;
