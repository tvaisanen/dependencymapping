import React from 'react';
import {connect} from 'react-redux';

import {CONNECTION, EMPTY} from '../../../constants/types';
import {HeaderBar} from "../resource-detail.styled";


const HeaderTitle = (props) => (props.type === EMPTY ? null
        : <React.Fragment>
                <small>{props.type}: {props.name} </small>
            <div>
            <small>group: {props.group || "none"}</small>
            </div>
        </React.Fragment>
);


const ResourceDetailHeader = ({activeDetail}) => {
    const { type, data } = activeDetail;
    return <HeaderBar>
        {activeDetail.type ?
                <HeaderTitle
                    type={type}
                    name={type === CONNECTION ? `${data.source} > ${data.target}` : data.name}
                    group={data.group}/>
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



