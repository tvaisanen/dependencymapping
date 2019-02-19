import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {setAsActiveDetail} from "../../../store/active-detail/active-detail.actions";

import {ASSET, CONNECTION, MAPPING, TAG, EMPTY} from '../../../constants/types';
import {HeaderBar} from "../resource-detail.styled";


const HeaderTitle = (props) => (props.type === EMPTY ? null
        : <HeaderBar>
            <small>{props.type}: {props.data.name} </small>
            <div>
                <small>group: {props.data.group || "none"}</small>
            </div>
        </HeaderBar>
);


export const AssetLinkButton = styled.small`
    letter-spacing: 0.07rem;
    text-align: center;
    cursor: pointer;
    margin: 6px;
    padding: 2px 4px;
    background: rgba(255,255,255, 0.1);
    border-radius: 3px;
    font-size: smaller;
    
    :hover {
        background: rgba(255,255,255, 0.35);
    }
`;

const AssetLink = (props) => {

        const onClick = () => props.setActiveDetail({
            type: ASSET,
            data: props.asset
        });

        if (props.asset) {
            return <AssetLinkButton onClick={onClick}>{props.asset.name}</AssetLinkButton>
        } else {
            return <DeletedAssetLabel>Asset has been deleted</DeletedAssetLabel>
        }
    }
;

const DeletedAssetLabel = styled.div`
  color: red;
  margin: 6px;
  
`;


const ConnectionTitle = styled.div`
   display: flex;
   font-size: small;
   justify-content: center;
   align-items: center;
`;

const ConnectionHeader = (props) => (
    <HeaderBar>
        <ConnectionTitle>{props.type}:
            <AssetLink
                asset={props.data.source}
                setActiveDetail={props.setActiveDetail}
            /> to
            <AssetLink
                asset={props.data.target}
                setActiveDetail={props.setActiveDetail}
            />
        </ConnectionTitle>
    </HeaderBar>
);

// customize detail header here
// HeaderTitle is the default
const headersByResourceType = {
    [ASSET]: HeaderTitle,
    [CONNECTION]: ConnectionHeader,
    [MAPPING]: HeaderTitle,
    [TAG]: HeaderTitle,
    [EMPTY]: HeaderTitle
};


const ResourceDetailHeader = (props) => {
    const {type} = props.activeDetail;
    const Header = headersByResourceType[type];
    return <Header {...props.activeDetail} setActiveDetail={props.setActiveDetail}/>
};


const mapStateToProps = (state, props) => {
    return ({
        activeDetail: state.activeDetail
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        setActiveDetail: (detail) => dispatch(setAsActiveDetail(detail))
    })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceDetailHeader);



