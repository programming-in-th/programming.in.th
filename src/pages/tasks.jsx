/* React */
import React from "react"

/* React Util */
import {
  List
} from "@material-ui/core"

/* Redux */
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

/* React Component */
import TaskListItem from "../components/tasks/taskListItem"

/* Static */
import "../assets/css/taskList.css"
import "../assets/css/avatar.css"

class TasksPage extends React.Component {

  constructor(props) {
    super(props);
    props.onInitialLoad();
  }

  render() {
     const listItems = this.props.taskList ? this.props.taskList.map((task) => {
       return <TaskListItem title={task.title} difficulty={task.difficulty} tags={task.tags}/>
     }) : [];

    return (
      <div id="task-list-wrapper">
        <List component="nav">
          {listItems}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tasks.tags,
    taskList: state.tasks.taskList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitialLoad: () => {
      // TODO: load tags
      dispatch(actionCreators.loadTasks(-1, -1, []));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);