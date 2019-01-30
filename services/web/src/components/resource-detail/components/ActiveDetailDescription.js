import React            from 'react';
import {connect}        from 'react-redux';
import styled           from 'styled-components';
import MarkDownRenderer from 'react-markdown-renderer';
import {DetailContent} from "../resource-detail.styled";


const ActiveDetailDescription = (props) => (
    <DetailContent>
        <MarkDownRenderer
            markdown={props.description ? props.description : "Edit to add description."}/>
    </DetailContent>
);

export default connect(
    (state) => ({
        description: state.activeDetail.data.description,
    }), {}
)(ActiveDetailDescription)

