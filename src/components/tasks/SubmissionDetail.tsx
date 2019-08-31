/* React */
import React from 'react'

/* Redux */
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/actions/index'
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

/* Components */
import SubmissionResponseDialog from './SubmissionResponseDialog'

/* Styles */
import styles from '../../assets/css/submission.module.css'
import firebase from 'firebase'

class SubmissionDetailComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitialLoad(this.props.match.params.submission_id)
  }

  render() {
    const submitCode = () => {
      const user = firebase.auth().currentUser
      if (!user || user.uid !== this.props.detail.metadata.uid) {
        alert('Unauthorized')
        return
      }
      console.log((this.refs.aceEditor as any).editor.getValue())
      this.props.submit(
        this.props.detail.metadata.uid,
        this.props.detail.metadata.problem_id,
        (this.refs.aceEditor as any).editor.getValue(),
        this.props.detail.metadata.language
      )
    }
    return this.props.detailStatus === 'LOADING' ? (
      <CircularProgress />
    ) : (
      <div>
        <div className={styles.editor}>
          <AceEditor
            ref="aceEditor"
            mode={this.props.detail.metadata.language}
            theme="monokai"
            value={this.props.detail.code}
          />
        </div>
        <Button onClick={submitCode}>Submit</Button>
        {this.props.submissionResponse === -1 ? (
          <CircularProgress />
        ) : this.props.submissionResponse ? (
          <SubmissionResponseDialog status={this.props.submissionResponse} />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  console.log(state)
  return {
    detail: state.submissions.detail,
    detailStatus: state.submissions.detailStatus,
    submissionResponse: state.submissions.submissionResponse
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    onInitialLoad: (submission_id: string) => {
      dispatch(actionCreators.loadDetail(submission_id))
    },
    submit: (
      uid: string,
      problem_id: string,
      code: string,
      language: string
    ) => {
      dispatch(actionCreators.makeSubmission(uid, problem_id, code, language))
    }
  }
}

export const SubmissionDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionDetailComponent)

// TODO: Check ownership of submission
