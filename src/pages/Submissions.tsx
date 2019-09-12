import React from 'react'
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'
import {
  FormGroup,
  FormLabel,
  TextField,
  CircularProgress
} from '@material-ui/core'

import * as actionCreators from '../redux/actions/index'
import { connect } from 'react-redux'

class SubmissionsComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitialLoad()
  }

  render() {
    const columns = [
      {
        name: 'username',
        label: 'User',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField'
        }
      },
      {
        name: 'problem_id',
        label: 'Problem',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField'
        }
      },
      {
        name: 'language',
        label: 'Language',
        options: {
          filter: true,
          sort: true,
          filterType: 'dropdown'
        }
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          filter: true,
          sort: false,
          filterType: 'textField',
          customBodyRender: (value: any) => {
            if (value === 'in_queue') return 'Pending'
            return value
          }
        }
      },
      {
        name: 'points',
        label: 'Points',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRender: (value: any) => {
            if (value === -1) return 'N/A'
            return value
          }
        }
      },
      {
        name: 'time',
        label: 'Time (s)',
        options: {
          customBodyRender: (value: any) => {
            if (value === -1) return 'N/A'
            return value
          },
          filter: true,
          filterType: 'custom',
          customFilterListRender: (v: any) => {
            if (v[0] && v[1]) {
              return 'Time: ' + v[0] + ' <= ' + v[1] + ' s'
            } else if (v[0]) {
              return 'Time: >= ' + v[0] + ' s'
            } else if (v[1]) {
              return 'Time: <= ' + v[1] + ' s'
            } else {
              return false
            }
          },
          filterOptions: {
            names: [],
            logic(time: any, filters: any) {
              if (filters[0] && filters[1]) {
                return time < filters[0] || time > filters[1]
              } else if (filters[0]) {
                return time < filters[0]
              } else if (filters[1]) {
                return time > filters[1]
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
                <FormLabel>Time</FormLabel>
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
          },
          print: false
        }
      },
      {
        name: 'memory',
        label: 'Memory (KB)',
        options: {
          customBodyRender: (value: any) => {
            if (value === -1) return 'N/A'
            return value
          },
          filter: true,
          filterType: 'custom',
          customFilterListRender: (v: any) => {
            if (v[0] && v[1]) {
              return 'Memory: ' + v[0] + ' <= ' + v[1] + ' KB'
            } else if (v[0]) {
              return 'Memory: >= ' + v[0] + ' KB'
            } else if (v[1]) {
              return 'Memory: <= ' + v[1] + ' KB'
            } else {
              return false
            }
          },
          filterOptions: {
            names: [],
            logic(memory: any, filters: any) {
              if (filters[0] && filters[1]) {
                return memory < filters[0] || memory > filters[1]
              } else if (filters[0]) {
                return memory < filters[0]
              } else if (filters[1]) {
                return memory > filters[1]
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
                <FormLabel>Memory (KB)</FormLabel>
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

    return this.props.submissionsListStatus === 'LOADING' ? (
      <div id="loading">
        <CircularProgress />
      </div>
    ) : (
      <div
      // className={styles.wrapper}
      >
        <MUIDataTable
          title="Submissions"
          columns={columns as MUIDataTableColumnDef[]}
          data={this.props.submissionsList}
          options={{
            responsive: 'scrollMaxHeight',
            search: false,
            selectableRows: 'none',
            print: false,
            download: false,
            onRowClick: (rowData, rowMeta) => {
              const submission_id = this.props.submissionsList[
                rowMeta.dataIndex
              ].submission_id
              this.props.history.push('/submissions/' + submission_id)
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    submissionsList: state.submissions.submissionsList,
    submissionsListStatus: state.submissions.submissionsListStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.loadSubmissionsList())
    }
  }
}

export const SubmissionsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionsComponent)

// TODO: handle pages of 10
