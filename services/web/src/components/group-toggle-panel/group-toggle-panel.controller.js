import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';
import * as _ from 'lodash';

export function toggleTagGroup(tagName){
    console.info(`toggleTagGroup({tagName: ${tagName}})`);
    return function (dispatch, getState){
        const {activeMapping} = getState();
        console.log(activeMapping)
        if (activeMapping.grouped) {

            const isToggled = _.includes(activeMapping.grouped, tagName);

            if (isToggled) {
                dispatch(activeMappingActions.ungroupByTag(tagName));
            } else {
                dispatch(activeMappingActions.groupByTag(tagName));
            }
        }
    }
}


const mapStateToProps = (state, props) => {

    const { tags, grouped } = state.activeMapping;

    console.info(tags)

    const tagsWithSelection = tags  ? tags.map(tag => ({name: tag, selected: _.includes(grouped, tag)})) : [];

    return {
        tags: tagsWithSelection
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleTagGroup: (tagName) => dispatch(toggleTagGroup(tagName))

});

export default {
    mapStateToProps,
    mapDispatchToProps
}