/* React */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import * as actionCreators from '../../redux/actions/index'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import styled from 'styled-components'
import firebase from 'firebase'

/* Material */
import { Button, Select } from 'antd'
import 'brace/mode/c_cpp'
import 'brace/mode/python'

const { Option, OptGroup } = Select
const responsive = `(max-width: 767px)`

const Wrapper = styled.div`
  margin: 10px 5%;
  @media ${responsive} {
    width: 90% !important;
  }
`

class SubmitComponent extends React.Component<any, any> {
  render() {
    let state = 'c_cpp'
    const submitCode = () => {
      console.log('call submitCode')
      const user = firebase.auth().currentUser
      if (!user) {
        console.log('no user')
        return
      }
      this.props.submit(
        user.uid,
        'a_plus_b',
        (this.refs.aceEditor as any).editor.getValue(),
        state
      )
    }
    const changeState = (key: string) => {
      state = key
      console.log(state)
    }
    return (
      <Wrapper>
        <h1>Submit Code</h1>
        <AceEditor mode={`${state}`} ref="aceEditor" theme="monokai" />
        <Select
          defaultValue="c_cpp"
          style={{ width: 120 }}
          onChange={changeState}
        >
          <OptGroup label="Language">
            <Option value="c_cpp">C / C++</Option>
            <Option value="python">python</Option>
          </OptGroup>
        </Select>
        <br />
        <Button type="primary" onClick={submitCode}>
          Submit
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps: (state: any) => any = state => {
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
