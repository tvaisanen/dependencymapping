import React from 'react';
import {connect} from 'react-redux';

import {EMPTY} from '../../../constants/types';
import {HeaderBar} from "../resource-detail.styled";


const HeaderTitle = (props) => (props.type === EMPTY ? null
        : <small>{props.type}: {props.name}, <br/>group: {props.group || "none"}</small>
);


const ResourceDetailHeader = ({activeDetail}) => {
    return <HeaderBar>
        {activeDetail.type ?
            <div>
                <HeaderTitle
                    type={activeDetail.type}
                    name={activeDetail.data.name}
                    group={activeDetail.data.group}/>
            </div>
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



