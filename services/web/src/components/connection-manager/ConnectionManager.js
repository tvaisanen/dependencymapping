//@flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

type  Props = {

}

const Container = styled.div`
    display: flex;
    align-self: stretch; 
    flex-flow: column nowrap;
    flex: 1 1 100%;
    background-color: rgba(255,255,255,0.2);
`;


const ConnectionManager = (props: Props) =>{
    return <Container>
        Connection manager
        <ConnectionList {...props}/>
    </Container>
}

function mapStateToProps(state, props){
    return {
        connections: state.connections
    }
}

function mapDispatchToProps(dispatch){
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionManager);

const ConnectionRowItem = styled.div`
    display: flex;
    margin: 0 12px;
`;
const Key = styled.div`
    border: 1px solid;
`;

const Value = styled.div``;

const ConnectionList = (props) => {

    const ListItems = () => <div>
        {props.connections.map(connection => (
            <ConnectionRowItem>
                {Object.keys(connection).map(key => (<React.Fragment>
                        <Key>{key}</Key><Value>{connection[key]}</Value>,
                    </React.Fragment>)
                )}
            </ConnectionRowItem>)
        )}
        </div>
    ;

    return (
       <div>
           <ListItems/>
       </div>
    )
}