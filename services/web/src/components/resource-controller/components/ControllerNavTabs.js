import React from 'react';
import {ASSET, MAPPING, TAG} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import * as actions from '../../../actions';

// todo: needs to be refactored
import * as detailEditorActions from '../../detail-editor/detail-editor.actions';

const NavTab = styled.span`
        text-decoration: ${p => p.selected ? 'underline' : null};
        font-weight: bold;
        background-color: ${p => p.selected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)'};; 
        color: ${p => p.selected ? 'rgba(36,36,36,0.9)' : 'rgba(255,255,255,0.2)'};
        padding: 4px 12px;
        margin: 2px 6px; 
        border-radius: 3px;
        :hover {
          background-color: rgba(244,244,244,0.3);
        }
        transition: all .15s ease-in-out;
        cursor: pointer;
        min-height: 1.2em;
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 12px;
`;

type Props = {
    setFormType: (value:string) => void,
    formType: ASSET | MAPPING | TAG,
    visible: boolean,
    buttons: Array<{label: string, type: ASSET | MAPPING | TAG}>
}

const ControllerNavTabs = (props: Props) => {
    if (props.visible) {
        return (
            <NavTabs>
                {props.buttons.map(b => (
                    <NavTab
                        selected={props.formType === b.type}
                        onClick={() => props.setFormType(b.type)}>
                        {b.label}
                    </NavTab>
                ))}

            </NavTabs>
        )
    } else {
        return null;
    }
};

ControllerNavTabs.defaultProps = {visible: true};

const mapStateToProps = (state, props) => ({
    visible: true,
    formType: state.app.form.type,
    buttons: [
        {label: "Asset", type: ASSET},
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
)(ControllerNavTabs)
    /*
<NavTab
                    selected={formType === ASSET}
                    onClick={() => setFormType(ASSET)}>
                    Asset
                </NavTab>
                <NavTab
                    selected={formType === MAPPING}
                    onClick={() => setFormType(MAPPING)}>
                    Mapping
                </NavTab>
                <NavTab
                    selected={formType === TAG}
                    onClick={() => setFormType(TAG)}>
                    Tag
                </NavTab>
                */