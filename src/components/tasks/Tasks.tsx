/* React */
import React from 'react'

/* React Util */
import { CircularProgress } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/actions/index'
import { ITask } from '../../redux/types/task'

/* Static */
import '../../assets/css/taskList.css'
import '../../assets/css/avatar.css'
import styles from '../../assets/css/submission.module.css'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import H from 'history'

import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'

interface ITasksPageProps {
  taskList: ITask[]
  status: string
  history: H.History
  onInitialLoad: () => void
}

interface ITasksPageState {}

class TasksListComponent extends React.Component<
  ITasksPageProps,
  ITasksPageState
> {
  handleClick = (task: string): void => {
    this.props.history.push('/tasks/' + task)
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

    return this.props.status === 'LOADING' ? (
      <div id="loading">
        <CircularProgress />
      </div>
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
              this.props.history.push('/tasks/' + problem_id)
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

export const TasksList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent)
