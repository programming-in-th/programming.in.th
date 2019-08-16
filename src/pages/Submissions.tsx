/* React */
import React from 'react'

import MUIDataTable, { FilterType } from 'mui-datatables'

/* Redux */
import { ISubmissions } from '../redux/types/submission'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'

import styles from '../assets/css/submission.module.css'

interface ISubmissionsPageProps {
  submissionsList: ISubmissions[]
  status: string
  onInitialLoad: () => void
}

class Submissions extends React.Component<ISubmissionsPageProps, {}> {
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
          filterType: 'textField' as FilterType
        }
      },
      {
        name: 'problem_id',
        label: 'Problem',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField' as FilterType
        }
      },
      {
        name: 'language',
        label: 'Language',
        options: {
          filter: true,
          sort: true,
          filterType: 'dropdown' as FilterType
        }
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          filter: true, // custom filter
          sort: false, // consider changing?
          filterType: 'textField' as FilterType
        }
      },
      {
        name: 'points',
        label: 'Points',
        options: {
          filter: true, // custom filter
          sort: true,
          filterType: 'textField' as FilterType
        }
      },
      {
        name: 'time',
        label: 'Time (s)',
        options: {
          filter: true, // custom filter
          sort: true,
          filterType: 'textField' as FilterType
        }
      },
      {
        name: 'memory',
        label: 'Memory (KB)',
        options: {
          filter: true, // mode of filter
          sort: true,
          filterType: 'textField' as FilterType
        }
      }
    ]

    return (
      <div className={styles.wrapper}>
        <MUIDataTable
          title="Submissions"
          columns={columns}
          data={this.props.submissionsList}
          options={{
            search: false,
            selectableRows: 'none',
            expandableRows: true,
            renderExpandableRow: (rowData, rowMeta) => {
              console.log(this.props.submissionsList[rowMeta.dataIndex])
              return <p>Hello</p>
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    submissionsList: state.submissions.submissionsList
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
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
