/* React */
import React from 'react'

/* Material Table */
import MaterialTable from 'material-table'

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
    return (
      <div className={styles.wrapper}>
        <MaterialTable
          columns={[
            { title: 'User', field: 'username' },
            { title: 'Problem', field: 'problem_id' },
            { title: 'Language', field: 'language' },
            { title: 'Status', field: 'status' },
            { title: 'Points', field: 'points' },
            { title: 'Time', field: 'time' },
            { title: 'Memory', field: 'memory' }
          ]}
          data={this.props.submissionsList}
          title="Submissions"
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
