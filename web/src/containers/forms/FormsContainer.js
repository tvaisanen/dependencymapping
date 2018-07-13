import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as l from '../../components/layout';
import TagForm from './TagForm';
import ResourceForm from './ResourceForm';
import MappingForm from './MappingForm';

const formMapping = [
    {label: "Mapping", viewId: 1},
    {label: "Resource", viewId: 2},
    {label: "Category", viewId: 3},
]

export const SelectForm = ({openForm}) => (
    <l.LayoutCol align={'center'} id="form-selection-container">
        <Title>Create new</Title>
        <FormSelectionItems id="form-selection-items">
            {formMapping.map((f, i) => (
                <FormSelection
                    key={i}
                    id="form-selection-item"
                    onClick={() => openForm({viewId: f.viewId})}
                >{f.label}
                </FormSelection>
            ))}
        </FormSelectionItems>
    </l.LayoutCol>
);

class FormsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 0
        };

        this.openForm = this.openForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.formProps = {}
        this.formViews = [
            {component: SelectForm, props: {id: 0, openForm: this.openForm, cancel: this.cancelForm}},
            {
                component: MappingForm,
                props: {
                    id: 1,
                    onClick: this.openForm,
                    cancel: this.cancelForm,
                    setView: this.props.setView,
                    setDetail: this.props.setDetail
                }
            },
            {
                component: ResourceForm,
                props: {
                    id: 2,
                    onClick: this.openForm,
                    cancel: this.cancelForm,
                    setView: this.props.setView,
                    setDetail: this.props.setDetail
                }
            },
            {
                component: TagForm, props: {
                    id: 3,
                    onClick: this.openForm,
                    cancel: this.cancelForm,
                    setView: this.props.setView,
                    setDetail: this.props.setDetail
                }
            }
        ];

    }

    openForm({viewId}) {
        this.setState({view: viewId})
    }

    cancelForm() {
        // set view to form selection
        this.setState({view: 0});
    }

    render() {
        const view = this.formViews[this.state.view];
        return (
            <FormBlock>
                <view.component {...view.props} />
            </FormBlock>
        );
    }
}

FormsContainer.propTypes = {
    setView: PropTypes.func.isRequired,
    setDetail: PropTypes.func.isRequired
};

export default FormsContainer;

const Title = styled.h3`
 border-bottom: 1px solid grey; 
`;

const FormBlock = styled.div`
  height: inherit;
  width: inherit;
`;

export const FormSelectionItems = styled.div`
  display: flex;
  justify-content: center;
`;

const FormSelection = styled.div`
    background-color: rgba(255,255,255,0.2);
    padding: 4px 8px;
    font-weight: bold;
    margin: 2px 4px;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(255,255,255,0.1);
    :hover {
    background-color: rgba(255,255,255,0.35);
    }
    transition: all .15s ease-in-out;
    cursor: pointer;
`;