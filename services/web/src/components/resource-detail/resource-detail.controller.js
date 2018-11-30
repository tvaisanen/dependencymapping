
const mapStateToProps = (state, props) => ({activeDetail: state.activeDetail});

const mapDispatchToProps = dispatch => ({});

export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    mapDispatchToProps: (dispatch) => mapDispatchToProps(dispatch)
};


