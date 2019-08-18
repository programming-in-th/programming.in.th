/* React */
import React from 'react'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

/* Material */
import { CircularProgress, Button } from '@material-ui/core'

/* Ace */
import AceEditor from 'react-ace'
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/ruby'
import 'brace/mode/pascal'
import 'brace/mode/haskell'
import 'brace/theme/monokai'

/* Styles */
import styles from '../assets/css/submission.module.css'

class SubmissionDetail extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.submission_id)
  }

  render() {
    return this.props.detailStatus === 'LOADING' ? (
      <CircularProgress />
    ) : (
      <div>
        <div className={styles.editor}>
          <AceEditor
            mode={this.props.detail.metadata.language}
            theme="monokai"
            value={this.props.detail.code}
          />
        </div>
        <Button>Resubmit</Button>
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  console.log(state)
  return {
    detail: state.submissions.detail,
    detailStatus: state.submissions.detailStatus
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: (submission_id: string) => {
      dispatch(actionCreators.loadDetail(submission_id))
    }
  }
}

export const SubmissionDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionDetail)

// TODO: Check ownership of submission
