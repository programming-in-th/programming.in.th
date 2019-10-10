import React from 'react'
import { WhiteContainerWrapper } from '../components/atomics'
import H from 'history'
import { connect } from 'react-redux'

import { ISubmissions } from '../redux/types/submission'
import * as actionCreators from '../redux/actions/index'

import { Table } from 'antd'

interface ISubmissionsComponentProps {
  onInitialLoad: () => void
  submissionsListStatus: 'LOADING' | 'SUCCESS' | null
  submissionsList: Array<ISubmissions>
  history: H.History
}

class SubmissionsComponent extends React.Component<
  ISubmissionsComponentProps,
  any
> {
  componentDidMount() {
    this.props.onInitialLoad()
  }

  columns = [
    {
      title: 'User',
      dataIndex: 'username'
    },
    {
      title: 'Problem',
      dataIndex: 'problem_id'
    },
    {
      title: 'Language',
      dataIndex: 'language'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Points',
      dataIndex: 'points'
    },
    {
      title: 'Time (s)',
      dataIndex: 'time'
    },
    {
      name: 'memory',
      label: 'Memory (KB)'
    }
  ]
  render() {
    return (
      <WhiteContainerWrapper>
        <Table
          dataSource={this.props.submissionsList}
          columns={this.columns}
          loading={this.props.submissionsListStatus === 'LOADING'}
          scroll={{ x: 100 }}
          onRow={(record: any) => {
            return {
              onClick: () => {
                this.props.history.push('/submissions/' + record.submission_id)
              }
            }
          }}
        />
      </WhiteContainerWrapper>
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
      dispatch(actionCreators.loadSubmissionsList())
    }
  }
}

export const SubmissionsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionsComponent)

// TODO: handle pages of 10
