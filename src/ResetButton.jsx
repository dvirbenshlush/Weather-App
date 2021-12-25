import React from 'react';
import { Button } from '@material-ui/core';
import { resetList } from './redux/actions';
import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch) => ({
  resetList: () => dispatch(resetList()),
});
function ResetButton(props) {
  function clickHandler(e) {
    props.resetList(); // calling Redux
  }
  return (
    <div>
      <Button onClick={clickHandler}>Clear List</Button>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(ResetButton);
