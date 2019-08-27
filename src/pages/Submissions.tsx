import React from 'react'
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'
import { FormGroup, FormLabel, TextField } from '@material-ui/core'
import styles from '../assets/css/submission.module.css'

import * as actionCreators from '../redux/actions/index'
import { connect } from 'react-redux'

class Submissions extends React.Component<any, {}> {
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
          filter: true, // custom filter
          sort: false, // consider changing?
          filterType: 'textField'
        }
      },
      {
        name: 'points',
        label: 'Points',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField'
        }
      },
      {
        name: 'time',
        label: 'Time (s)',
        options: {
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
                    style={{ width: '45%', marginRight: '5%' }}
                  />
                  <TextField
                    label="Max"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ width: '45%' }}
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
                    style={{ width: '45%', marginRight: '5%' }}
                  />
                  <TextField
                    label="Max"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value
                      onChange(filterList[index], index, column)
                    }}
                    style={{ width: '45%' }}
                  />
                </FormGroup>
              </div>
            )
          },
          print: false
        }
      }
    ]

    return (
      <div className={styles.wrapper}>
        <MUIDataTable
          title="Submissions"
          columns={columns as MUIDataTableColumnDef[]}
          data={this.props.submissionsList}
          options={{
            search: false,
            selectableRows: 'none',
            onRowClick: (rowData, rowMeta) => {
              const submission_id = this.props.submissionsList[
                rowMeta.dataIndex
              ].submission_id
              console.log(submission_id)
              this.props.history.push('/submission_detail/' + submission_id)
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    submissionsList: state.submissions.submissionsList,
    submissionsListStatus: state.submissions.submissionsListStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitialLoad: () => {
      dispatch(actionCreators.loadSubmissionsList(10))
    }
  }
}

export const SubmissionsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Submissions)
