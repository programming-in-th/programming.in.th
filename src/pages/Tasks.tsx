/* React */
import React from 'react'

/* React Util */
import { FormLabel, FormGroup, TextField } from '@material-ui/core'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ITask } from '../redux/types/task'

/* Static */
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import H from 'history'

import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'
import { Spin, Row, Col } from 'antd'
import { SpinWrapper } from '../components/SpinWrapper'

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
        label: 'Difficulty',
        options: {
          customBodyRender: (value: any) => {
            if (value === -1) return 'N/A'
            return value
          },
          filter: true,
          filterType: 'custom',
          customFilterListRender: (v: any) => {
            if (v[0] && v[1]) {
              return 'Difficulty: ' + v[0] + ' <= ' + v[1]
            } else if (v[0]) {
              return 'Difficulty: >= ' + v[0]
            } else if (v[1]) {
              return 'Difficulty: <= ' + v[1]
            } else {
              return false
            }
          },
          filterOptions: {
            names: [],
            logic(difficulty: any, filters: any) {
              if (filters[0] && filters[1]) {
                return difficulty < filters[0] || difficulty > filters[1]
              } else if (filters[0]) {
                return difficulty < filters[0]
              } else if (filters[1]) {
                return difficulty > filters[1]
              }
              return false
            },
            display: (
              filterList: any,
              onChange: any,
              index: any,
              column: any
            ) => (
              <div>
                <FormLabel>Difficulty</FormLabel>
                <FormGroup row>
                  <TextField
                    label="Min"
                    value={filterList[index][0] || ''}
                    onChange={event => {
                      filterList[index][0] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ marginRight: '5%' }}
                  />
                  <TextField
                    label="Max"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{}}
                  />
                </FormGroup>
              </div>
            )
          }
        }
      },
      {
        name: 'solve_count',
        label: 'Users solved',
        options: {
          customBodyRender: (value: any) => {
            if (value === -1) return 'N/A'
            return value
          },
          filter: true,
          filterType: 'custom',
          customFilterListRender: (v: any) => {
            if (v[0] && v[1]) {
              return 'Users solved: ' + v[0] + ' <= ' + v[1]
            } else if (v[0]) {
              return 'Users solved: >= ' + v[0]
            } else if (v[1]) {
              return 'Users solved: <= ' + v[1]
            } else {
              return false
            }
          },
          filterOptions: {
            names: [],
            logic(solve_count: any, filters: any) {
              if (filters[0] && filters[1]) {
                return solve_count < filters[0] || solve_count > filters[1]
              } else if (filters[0]) {
                return solve_count < filters[0]
              } else if (filters[1]) {
                return solve_count > filters[1]
              }
              return false
            },
            display: (
              filterList: any,
              onChange: any,
              index: any,
              column: any
            ) => (
              <div>
                <FormLabel>Users Solved</FormLabel>
                <FormGroup row>
                  <TextField
                    label="Min"
                    value={filterList[index][0] || ''}
                    onChange={event => {
                      filterList[index][0] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ marginRight: '5%' }}
                  />
                  <TextField
                    label="Max"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{}}
                  />
                </FormGroup>
              </div>
            )
          }
        }
      }
    ]

    return this.props.status === 'LOADING' ? (
      <SpinWrapper>
        <Spin tip="Loading..." size="large" />
      </SpinWrapper>
    ) : (
      <Row>
        <Col span={18} offset={3}>
          <div style={{ paddingTop: '50px' }}>
            <MUIDataTable
              title="Tasks"
              columns={columns as MUIDataTableColumnDef[]}
              data={this.props.taskList}
              options={{
                responsive: 'scrollMaxHeight',
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
        </Col>
      </Row>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  console.log(state)
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
)(TasksListComponent)
