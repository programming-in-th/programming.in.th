/* React */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

/* Material */
import Button from '@material-ui/core/Button'

class SubmitComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Submit Code</h1>
        <AceEditor mode="javascript" theme="monokai" />
        <Button>Submit</Button>
      </div>
    )
  }
}

export const SubmitPage = SubmitComponent
/*
TODO:
CSS
Dropdown list of languages and change AceEditor mode to match language
Redirect to SubmissionDetail page
*/
