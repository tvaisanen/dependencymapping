import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { 
  Input,
  Layout, 
  Button,
  ButtonPanel,
  LayoutRow,
  LayoutCol,
  SidePanel,
  ContentWindow, 
  MenuHeader,
  ResourceDetail,
  TopBar,
  FloatingButton,
  ResourceDescription
} from '../components/';
import GraphContainer from './GraphContainer';
import SideTabMenuContainer from './SideTabMenuContainer';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addElement, addElements, updateLayout, clearGraph } from '../common/graph-helpers';
import * as actionCreators from '../actions/graphActions';
import * as parser from '../common/parser';
import _ from 'lodash';
import * as constants from '../constants/';
import BottomPaneContainer from './BottomPanelContainer';
import dagre from 'cytoscape-dagre';
import menuIcon from '../icons/menu-toggle.png';
//import configsCytoscape from '../configs/configs.cytoscape';

cytoscape.use( dagre );
cytoscape.use( cola );

const LAYOUT = 'cola';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      enableResize: false,
      resizing: false,
      cy: null,
      resourceDetail: {name:'Welcome', description:"Welcome back! To start working select a mapping to work with or start a new one by clicking this [NEW]."},
      resourceCategories: [],
      showGraphButtons: true,
      detail: {name:'Welcome', description:"Welcome back! To start working select a mapping to work with or start a new one by clicking this [NEW].", type:"Init"},
      detailType: null,
      layout: LAYOUT
    }
    this.clearGraphSelection = this.clearGraphSelection.bind(this);
    this.setResourceDetail = this.setResourceDetail.bind(this);
    this.toggleFloatingButtons = this.toggleFloatingButtons.bind(this);
    this.setCategoryDetail = this.setCategoryDetail.bind(this);
  }

  componentDidMount(){
    const cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: this.state.elements,    
      style: graphStyle,
          layout: {
            name: LAYOUT,
          }
      });

      cy.on('tap', 'node', this.onNodeClick);
      cy.on('mouseover', 'node', this.onNodeHover);
      cy.on('mouseout', 'node', this.onNodeMouseOut);

      const layout = cy.layout({ name: LAYOUT });
      layout.run();
      this.setState({cy: cy});

      this.addResourceToMapping = this.addResourceToMapping.bind(this);
      
  }

  updateLayout(){
    const layout = this.state.cy.layout({ name: this.state.layout });
    layout.run();
  }

  setLayout(layout){
    this.setState({layout: layout})
    this.updateLayout();
  }

  onNodeMouseOut = (evt) => {
    const node = evt.target;
    const resourceId = node.id();
    const focusedElement = this.state.cy.getElementById(resourceId);
    focusedElement.neighborhood().forEach(e => e.toggleClass('highlight', false))
  }

  onNodeHover = (evt) => {
    const node = evt.target;
    const resourceId = node.id();
    const focusedElement = this.state.cy.getElementById(resourceId);
    focusedElement.neighborhood().forEach(e => e.toggleClass('highlight', true))
  }

  onNodeClick = (evt) => {
    const node = evt.target;
    const resourceUrl = node.id();
    const clickedResource = this.props.resources.filter(r=>r.name===resourceUrl)[0];
    const clickedIsConnectedTo = parser.parseEdgeElementsFromResource(clickedResource);
 
    this.props.addActiveMappingResources(clickedResource.connected_to);
    // get tapped resource from the store
    // the purpose is to create new nodes from connections of clickedResource
    // so the nodes need to be created before adding the edges
    
    const nodesToCreate = clickedIsConnectedTo.map(r => {
    
      return ({group: 'nodes', data: {id: r.data.target}})
    } );

    // edd nodes
    addElements(this.state.cy, nodesToCreate);
    // add edges
    addElements(this.state.cy, clickedIsConnectedTo);
    updateLayout(this.state.cy);
  }

  toggleElementVisibility = (element) => {
    const e = this.state.elements.filter(el =>  el.data.id === element);
  }
  
  getElementDetail = (element) => {
  }

  loadDependencyMap = (mapId) => {
    // load graph resources to the active mapping
    console.info('GwClientApi.getDependencyMap("' + mapId + '");');

    // current state of cy graph needs to be cleared
    clearGraph(this.state.cy)

    const mapping = this.props.graphs.filter(g=>g.name===mapId)[0];
    
    // By default this is an array of objects.
    let resources = mapping.resources;
  
    // Set mapping as active. 
    this.props.loadActiveMappingResources(mapping);

    // This is because at the moment there's no back end solution.
    // Current dev. environment returns mapping resources as objects,
    // which is not too efficient. Preferred method would be using 
    // just an array of id's which would be used in a following manner.
    if (_.isString(resources[0])){
      // if resource is a string
      // map resource id's to resource objects
      resources = parser.filterResourcesByIds({
        ids: resources, 
        resources: this.props.resources
      });

      

    }

    // objects for redux state
    const connections = parser.getConnectionsFromResources(resources);
    
    this.props.setActiveMappingConnections(connections);
  

    // json for graphing
    const edges = parser.parseEdgeElementsFromResources(resources);

    
    const nodes = resources.map(i=> ({ group: "nodes", data: {id: i.name}}) );
    addElements(this.state.cy, nodes);
    addElements(this.state.cy, edges);
  
    this.setState({detail: mapping, detailType: constants.MAPPING})

    this.updateLayout();
  }



  highlightElement = (id) => {
    console.info('highlight');
    console.info(id);
  }

  getDependencies() {
    return this.state.elements.filter(e => e.group === 'edges');
  }

  getResources() {
    return this.state.elements.filter(e => e.group === 'nodes');
  }

  setResourceDetail(resourceId){
    const clickedResource = this.props.resources.filter(r=>r.name===resourceId)[0];
    // add attribute type to the object
    // this is needed when edit is used from detailview

    this.setState({detail: clickedResource, detailType: constants.RESOURCE});
  }

  setCategoryDetail(categoryId){
    const clickedCategory = this.props.categories.filter(r=>r.name===categoryId)[0];
    this.setState({detail: clickedCategory, detailType: constants.CATEGORY})
  }

  toggleFloatingButtons(){
    this.setState({showGraphButtons: !this.state.showGraphButtons});
  }

  clearGraphSelection(){
    clearGraph(this.state.cy)
    this.props.clearActiveMappingSelection();
  }

  addResourceToMapping(nameResource){
    // create post the mapping
    // this adds the resource to db
    const resource = this.props.postResource(nameResource); 
    const nameMapping = this.props.activeMapping.name;
    //const resource = this.props.addResourceToMapping({nameMapping,nameResource});
    console.log(resource);

    if (resource.error){
      // if there's an error while doing so handle ui 
    } else {
      // add the element to the visualization
      addElement({group: 'nodes', data: {id: resource.name}})
    }
  }

  render() {
  
    const mappings = this.props.graphs.map(m => m.name ).sort();
    const categories = this.props.categories.map(c=>c.name).sort();
    const activeResources = getResourceNameList(this.props.activeMapping.resources);
    const activeConnections = getConnectionsNameList(this.props.activeMapping.connections);
   
    const { cy } = this.state;

    return (
      <Layout>
        <LayoutCol id="container-top" height={"60vh"}>
          <TopBar>
          <span></span>
          <span>
            {/*<small>
              layout: 
                <span onClick={()=>this.setLayout('random')}>random</span>
                <span onClick={()=>this.setLayout('cola')}>physics</span>
                <span onClick={()=>this.setLayout('circle')}>circle</span>
                <span onClick={()=>this.setLayout('breadthfirst')}>r>breadthfirst</span>
          </small>*/}
            <small onClick={this.toggleFloatingButtons}>...</small>
          </span>  
        </TopBar>
        <LayoutRow>
          
          <SidePanel id="sidepanel">
            <SideTabMenuContainer 
                title="Mappings " 
                listItems={mappings} 
                onItemClick={this.loadDependencyMap}
                onCreateNewItem={this.props.postMapping}
            />

            <SideTabMenuContainer 
                title="Categories" 
                listItems={categories} 
                onItemClick={this.setCategoryDetail}
                onCreateNewItem={({id})=> this.props.postMapping({mappingName: id})}
            />
          </SidePanel>  

          <SidePanel id="mapping" wide>

            <MenuHeader>{this.props.activeMapping.name ? this.props.activeMapping.name : 'Select Mapping'}</MenuHeader>
            
            <SideTabMenuContainer 
              noHeaderBlock
              title="Resources" 
              listItems={activeResources} 
              onItemClick={this.setResourceDetail}
              onCreateNewItem={this.addResourceToMapping}  
            />

          </SidePanel>
          <ContentWindow>
            <GraphContainer elements={this.state.elements}/>
          </ContentWindow>

          <ButtonPanel buttons visible={this.state.showGraphButtons}>
            <FloatingButton onClick={()=>updateLayout(cy)}>refresh</FloatingButton>
            <FloatingButton onClick={this.clearGraphSelection}>clear</FloatingButton>
            <FloatingButton onClick={()=>this.props.saveMapping(this.props.activeMapping)}>save</FloatingButton>
            <FloatingButton onClick={()=>updateLayout(cy)}>download</FloatingButton>
            <FloatingButton onClick={()=>updateLayout(cy)}>foobar</FloatingButton>
          </ButtonPanel>

        </LayoutRow>
        </LayoutCol>
        <LayoutCol 
          id="container-bottom" 
          height={'40vh'}
          align={'center'}
          grow={1}>
          <BottomPaneContainer 
            id="bottom-panel" 
            detail={this.state.detail} 
            detailType={this.state.detailType}
            setDetail={this.setResourceDetail}
            cy={this.state.cy}
          />
          {/*<PreviewAndFormsContainer detail={this.state.detail}/>*/}
        </LayoutCol>
      </Layout>
    );
  }
}
const getConnectionsNameList = (connections) => {
  /**
   * return array of json objects 
   */
  if (_.isArray(connections) && !_.isEmpty(connections)){
    return connections.map(c => `${c.source.name}-${c.target.name}`)
  }
}

const getResourceNameList = (resources) => {
  //return resources.map(r=>r.url.split('/')[4]);
  return resources.map(r=>r.name);
}


const graphStyle = [ // the stylesheet for the graph
  {
    selector: 'node',
    style: {
      'content': 'data(id)',
      'text-valign': 'center',
      'color': 'white',
      'text-outline-width': 1,
      'line-color': '#4d4c4c',
      'background-color': 'rgb(54, 48, 54)', 
    }
  },

  {
    selector: 'edge',
    style: {
      'curve-style':'unbundled-bezier(multiple)',
      'width': 3,
      'line-color': '#eee',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },

  {
      selector: 'node.highlight',
      style: {
          'background-color': 'rgb(96, 80, 96)',
          'label': 'data(id)'
        }
  },
  {
    selector: 'edge.highlight',
    style: {
      'width': 4,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle'
    }
  },
];

const mapStateToProps = (state, ownProps = {}) => {
  return {
    graphs: state.graphs,
    resources: state.resources,
    dependencies: state.dependencies,
    categories: state.categories,
    activeMapping: state.activeMapping
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);