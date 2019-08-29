/* React */
import React from 'react'

/* React Util */
import { CircularProgress } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ITask } from '../redux/types/task'

/* React Component */
import { Task } from '../components/tasks/Task'

/* Static */
import '../assets/css/taskList.css'
import '../assets/css/avatar.css'
import styles from '../assets/css/submission.module.css'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import H from 'history'

import Layout from 'antd/lib/layout'
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'
const { Content, Footer } = Layout

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  onInitialLoad: () => void
}

interface ITasksPageState {
  currentTask: string
}

class Tasks extends React.Component<ITasksPageProps, ITasksPageState> {
  state: ITasksPageState = {
    currentTask: ''
  }

  handleClick = (task: string): void => {
    this.setState({ currentTask: task })
  }

  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const columns = [
      {
        name: 'title',
        label: 'Problem',
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: 'tags',
        label: 'Tags',
        options: {
          filter: true,
          filterType: 'checkbox',
          customBodyRender: (
            data: Array<string>,
            dataIndex: number,
            rowIndex: number
          ) => {
            let displayString = ''
            data.forEach((str: string, index: number) => {
              if (index === 0) {
                displayString += str
              } else {
                displayString += ', ' + str
              }
            })
            return <div>{displayString}</div>
          }
        }
      },
      {
        name: 'difficulty',
        label: 'Difficulty'
      },
      {
        name: 'solve_count',
        label: 'Users solved'
      }
    ]

    return (
      <Layout className="layout">
        <Content>
          {this.props.status === 'LOADING' ? (
            <div id="loading">
              <CircularProgress />
            </div>
          ) : this.state.currentTask !== '' ? (
            <Task id={this.state.currentTask} />
          ) : (
            <div className={styles.wrapper}>
              <MUIDataTable
                title="Tasks"
                columns={columns as MUIDataTableColumnDef[]}
                data={this.props.taskList}
                options={{
                  responsive: 'scroll',
                  search: true,
                  print: false,
                  download: false,
                  selectableRows: 'none',
                  onRowClick: (rowData, rowMeta) => {
                    const problem_id = this.props.taskList[rowMeta.dataIndex]
                      .problem_id
                    this.props.history.push('/task_detail/' + problem_id)
                  },
                  customSearch: (
                    searchQuery: string,
                    currentRow: Array<any>,
                    columns: Array<any>
                  ): boolean => {
                    return currentRow[0].toString().indexOf(searchQuery) >= 0
                  }
                }}
              />
            </div>
          )}
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    tags: state.tasks.tags,
    taskList: state.tasks.taskList,
    status: state.tasks.status
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: () => {
      // TODO: load tags
      dispatch(actionCreators.loadTasksList(10, -1, -1, []))
    }
  }
}

export const TasksPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)
