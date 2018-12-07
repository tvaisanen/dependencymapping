import React from 'react';
import {connect} from 'react-redux';

import {EMPTY} from '../../../constants/types';
import {HeaderBar} from "../resource-detail.styled";


const HeaderTitle = (props) => (props.type === EMPTY ? null
        : <React.Fragment>
            <span>{props.name}</span>
            <div>
            <small>{props.type}</small>
            <small>group: {props.group || "none"}</small>
            </div>/
        </React.Fragment>
);


const ResourceDetailHeader = ({activeDetail}) => {
    return <HeaderBar>
        {activeDetail.type ?
                <HeaderTitle
                    type={activeDetail.type}
                    name={activeDetail.data.name}
                    group={activeDetail.data.group}/>
            : null
        }
    </HeaderBar>
};


const mapStateToProps = (state, props) => {
    return ({activeDetail: state.activeDetail})
}

export default connect(
    mapStateToProps,
    {}
)(ResourceDetailHeader);



