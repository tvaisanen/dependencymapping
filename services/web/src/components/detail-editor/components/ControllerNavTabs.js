import React from 'react';
import {ASSET, CONNECTION, MAPPING, TAG} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import * as actions from '../../../actions';

// todo: needs to be refactored
import * as detailEditorActions from '../detail-editor.actions';
import EditorButtons from "./EditorButtons";
import {ResourceSelection} from "../detail-editor.styled";

const NavTab = styled.span`
    display: flex;
    justify-content: center;
    font-weight: bold;
    background-color: ${
        p => p.selected ? 
            'rgba(255,255,255,0.8)' 
            : 'rgba(255,255,255,0.1)'
    }; 
    color: ${
        p => p.selected ? 
            'rgba(36,36,36,0.9)' 
            : 'rgba(255,255,255,0.2)'
    };
    padding: 4px 12px;
    margin: 2px 6px; 
    border-radius: 3px;
    :hover {
      background-color: rgba(244,244,244,0.3);
    }
    cursor: pointer;
    min-height: 1.2em;
`;

export const ListItemBox = styled.div`

    font-size: small; 
    letter-spacing: 0.07em;
    text-align: center;
    cursor: pointer;
    margin: 1px 6px;
    border-radius: 3px;
    padding: 2px; 

    background: ${p => p.selected ? 
        p.theme.listItemSelectedDarkBackground
        : p.theme.listItemDarkBackground
    };

    :hover {
        background: rgba(255,255,255, 0.1);
    }
    
    transition: all .15s ease-in-out;
`;

const Container = styled.div`
    width: 16em;
    min-width: 16em;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: ${p=>p.theme.cardBackgroundColor}; 
    border: ${p=>p.theme.cardBorder}; 
    border-radius: 3px;
    margin-right: 6px;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    font-size: small;
    min-height: 1.2em;
    background-color: white;
    background: ${p=>p.theme.cardHeaderBackgroundColor};
    color: ${p=>p.theme.cardHeaderTextColor};
    margin-bottom: 8px;
    letter-spacing: 0.05em;
    padding: 2px 2px 4px 2px;
`;

const Inflater = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
`;

type Props = {
    setFormType: (value:string) => void,
    formType: ASSET | MAPPING | TAG,
    visible: boolean,
    buttons: Array<{label: string, type: ASSET | MAPPING | TAG}>
}

const FormOptions = (props: Props) => {
    if (props.visible) {
        return (
            <ResourceSelection>
                <Header>RESOURCE TYPE</Header>

                <Inflater>
                    <div>
                {props.buttons.map(b => (
                    <ListItemBox
                        selected={props.formType === b.type}
                        onClick={() => props.setFormType(b.type)}>
                        {b.label}
                    </ListItemBox>
                ))}
                    </div>
                </Inflater>
            </ResourceSelection>
        )
    } else {
        return null;
    }
};

FormOptions.defaultProps = {visible: true};

const mapStateToProps = (state, props) => ({
    visible: !state.detailForm.edit,
    formType: state.detailForm.formType,
    buttons: [
        {label: "Asset", type: ASSET},
        {label: "Connection", type: CONNECTION},
        {label: "Mapping", type: MAPPING},
        {label: "Tag", type: TAG},
    ]
});

const mapDispatchToProps = (dispatch) => ({
    setFormType: (formType) => {
        dispatch(detailEditorActions.clickDetailType(formType));
        dispatch(actions.setFormType(formType))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormOptions)
