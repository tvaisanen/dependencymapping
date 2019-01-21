//@flow

import React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import * as activeMappingActions from '../../../store/active-mapping/active-mapping.actions';

import {ASSET} from '../../../constants/types';
import {ActionLink} from '../resource-detail.styled'

type InActiveMappingToggleProps = {
    detailType: string,
    inMap: boolean,
    removeFromMap: () => void,
    addToMap: () => void,
    detailData: any
}

const InActiveMappingToggle = (props: InActiveMappingToggleProps) => {

    const onClick: (any) => void = props.inMap ?
        props.removeFromMap
        : props.addToMap
    ;

    return props.detailType === ASSET ?
        <ActionLink
            onClick={() => onClick(props.detailData)}
            inMap={props.inMap}
            addToMap={props.addToMap}
            removeFromMap={props.removeFromMap}
            detail={props.detailData}> {props.inMap ?
            "remove from map" : "add to map"
        }</ActionLink> : null;
};

const mapStateToProps = (state, props) => ({
    detailType: state.activeDetail.type,
    detailData: state.activeDetail.data,
    activeDetail: state.activeDetail,
    inMap: _.includes(
        state.activeMapping.assets,
        state.activeDetail.data.name
    )
});

const mapDispatchToProps = dispatch => {
    return {
        addToMap: (resource) => (
            dispatch(
                activeMappingActions
                    .addResourceToActiveMapping(resource)
            )
        ),
        removeFromMap: (resource) => (
            dispatch(
                activeMappingActions
                    .removeResourceFromActiveMapping(resource)
            )
        )
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InActiveMappingToggle);

