/**
 * Mapping list and active mapping resource list
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import mappingMenuCtrl from './mapping-menu.controller';
import * as types from './../../constants'
import { Menu } from './mapping-menu.components';
import * as resourceHelpers from '../../common/resource-helpers';

const MappingMenuContainer = props => (
    <React.Fragment>
        <MenuColumn id="sidepanel">
            <Menu
                title="Mappings "
                listItemType={"mapping"}
                listItems={props.mappings.map(m => m.name)}
                //onItemClick={(item) => props.loadDependencyMap(item.name)}
                onItemClick={(mappingName) => props.onMappingItemClick(mappingName)}
                selected={
                    props.activeDetail.type === types.MAPPING ?
                        props.activeDetail.data.name : false
                }
            />


        </MenuColumn>

        <MenuColumn id="active-resources-list" wide>
            <Menu
                listItemType={"asset"}
                darkButtons
                title={
                    props.activeMapping.name ?
                        props.activeMapping.name
                        : 'Select Mapping'
                }
                listItems={
                    props.activeMapping.assets ?
                        resourceHelpers.sortObjectsByName(props.activeMapping.assets)
                        : []
                }
                onItemClick={(item) => props.onActiveAssetClick({data: item, type: types.ASSET})}
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
    hoverResourceOn: PropTypes.func.isRequired,
    hoverResourceOff: PropTypes.func.isRequired,
    onMappingItemClick: PropTypes.func.isRequired,
    onActiveAssetClick: PropTypes.func.isRequired,
};

export const MenuColumn = styled.div`
    background: ${p=>p.theme.colorLightBackground};
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