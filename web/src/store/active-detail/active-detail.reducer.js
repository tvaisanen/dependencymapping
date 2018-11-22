import PropTypes from 'prop-types';
import * as types from './active-detail.action-types';
import initialState from '../../reducers/initialState';
import * as resourceTypes from '../../constants/types';

const emptyDetail = {
    type: resourceTypes.EMPTY,
    data: "no selection",
    description: ""
};

function activeDetailReducer(state = initialState.activeDetail, action) {

    switch (action.type) {
        case types.SET_ACTIVE_DETAIL:
            return action.activeDetail;

        case types.CLEAR_ACTIVE_DETAIL:
            return emptyDetail;
        default:
            return state;
    }
}

activeDetailReducer.propTypes = {
    state: PropTypes.shape({
        type: PropTypes.string.isRequired,
        data: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            connected_to: PropTypes.arrayOf(PropTypes.string),
            resources: PropTypes.arrayOf(PropTypes.string),
            tags: PropTypes.arrayOf(PropTypes.string)
        }).isRequired
    })
};

export default activeDetailReducer;