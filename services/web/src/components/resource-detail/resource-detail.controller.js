
const mapStateToProps = (state, props) => ({
    detailType: state.activeDetail.type,
    activeDetail: state.activeDetail
});

const mapDispatchToProps = dispatch => ({});

export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    mapDispatchToProps: (dispatch) => mapDispatchToProps(dispatch)
};


