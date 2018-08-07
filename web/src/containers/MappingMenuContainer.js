/**
 * Mapping list and active mapping resource list
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import mappingMenuCtrl from '../controllers/mapping-menu.controller';
import { mediumDark } from "../constants/colors";
import * as types from '../constants'
import { Menu } from '../components/mapping-menu';

const MappingMenuContainer = props => (
    <React.Fragment>
        {console.info(props)}
        <MenuColumn id="sidepanel">
            <Menu
                title="Mappings "
                listItems={props.mappings}
                onItemClick={(item) => props.loadDependencyMap(item.name)}
                selected={
                    props.activeDetail.type === types.MAPPING ?
                        props.activeDetail.data.name : false
                }
            />


        </MenuColumn>

        <MenuColumn id="active-resources-list" wide>
            <Menu
                darkButtons
                title={
                    props.activeMapping.name ?
                        props.activeMapping.name
                        : 'Select Mapping'
                }
                listItems={props.activeMapping.resources}
                onItemClick={(item) => props.setActiveDetail({data: item, type: types.ASSET})}
                onMouseOver={props.hoverResourceOn}
                onMouseOut={props.hoverResourceOff}
                selected={
                    props.activeDetail.type === types.ASSET ?
                        props.activeDetail.data.name : false
                }
            />
        </MenuColumn>
    </React.Fragment>
);

export default connect(
    mappingMenuCtrl.stateToProps,
    mappingMenuCtrl.dispatchToProps
    )(MappingMenuContainer);

MappingMenuContainer.propTypes = {
    mappingNameList: PropTypes.array.isRequired,
    activeDetail: PropTypes.object.isRequired,
    activeMapping: PropTypes.object.isRequired,
    activeResourceNameList: PropTypes.array,
    loadDependencyMap: PropTypes.func.isRequired,
    setResourceDetail: PropTypes.func.isRequired,
    hoverResourceOn: PropTypes.func.isRequired,
    hoverResourceOff: PropTypes.func.isRequired,
    setActiveDetail: PropTypes.func.isRequired,
};

export const MenuColumn = styled.div`
    background: rgba(200,200,200,0.8);
    background: ${mediumDark};
    display: flex;
    flex-direction: column;
    width: 320px;
    min-height: inherit;
    min-width: 20vw;
    max-width: ${props=>props.max};
    height: auto;
    overflow: ${props => props.buttons ? 
        'hidden' : 'scroll'
    };
    overflow-x: hidden;
`;