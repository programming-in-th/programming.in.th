/* React */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import * as actionCreators from '../../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import firebase from 'firebase'

/* Material */
import { Icon, Result, Button, Select } from 'antd'
import 'brace/mode/c_cpp'
import 'brace/mode/python'

const { Option, OptGroup } = Select
// const responsive = `(max-width: 767px)`

class SubmitComponent extends React.Component<any, any> {
  state = {
    language: 'c_cpp'
  }
  render() {
    const submitCode = () => {
      console.log('call submitCode')
      const user = firebase.auth().currentUser
      if (!user) {
        console.log('no user')
        this.props.errorSubmit()
        return
      }
      this.props.submit(
        user.uid,
        'a_plus_b',
        (this.refs.aceEditor as any).editor.getValue(),
        this.state.language
      )
    }
    const changeState = (key: string) => {
      this.setState({ language: key })
      console.log(this.state.language)
    }
    return (
      <React.Fragment>
        {this.props.submissionResponse === -1 ? (
          <Result
            status="success"
            icon={<Icon type="loading" />}
            title="Submiting"
          />
        ) : this.props.submissionResponse === 200 ? (
          <Result
            title="Submission Successful"
            status="success"
            extra={[
              <Button type="primary">View Submission</Button>,
              <Button onClick={this.props.reSubmit}>Resubmit</Button>
            ]}
          />
        ) : this.props.submissionResponse !== 0 ? (
          <Result
            status="error"
            title="Submission Failed"
            extra={[<Button onClick={this.props.reSubmit}>Resubmit</Button>]}
          />
        ) : (
          <div>
            <h1>Submit Code</h1>
            <AceEditor
              mode={`${this.state.language}`}
              ref="aceEditor"
              theme="monokai"
            />
            <Select
              defaultValue="c_cpp"
              style={{ width: 120 }}
              onChange={changeState}
            >
              <OptGroup label="Language">
                <Option value="c_cpp">C / C++</Option>
                <Option value="python">Python</Option>
              </OptGroup>
            </Select>
            <br />
            {this.props.user ? (
              <Button type="primary" onClick={submitCode}>
                Submit
              </Button>
            ) : (
              <Button type="primary" onClick={submitCode} disabled>
                Submit
              </Button>
            )}
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
  return {
    submissionResponse: state.submissions.submissionResponse,
    user: state.user.user
  }
}

const mapDispatchToProps: (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => any = dispatch => {
  return {
    submit: (
      uid: string,
      problem_id: string,
      code: string,
      language: string
    ) => {
      dispatch(actionCreators.makeSubmission(uid, problem_id, code, language))
    },
    reSubmit: () => dispatch(actionCreators.resubmitSubmission()),
    errorSubmit: () => dispatch(actionCreators.errorSubmit())
  }
}

export const SubmitPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitComponent)
/*
TODO:
Authentication
Dropdown list of languages and change AceEditor mode to match language
Which problem
CSS
Redirect to SubmissionDetail page
*/
