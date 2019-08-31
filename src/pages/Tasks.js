import React from 'react'

import { Tabs } from 'antd'

import { TasksList } from '../components/tasks/Tasks'
import { TaskDetailPage } from '../components/tasks/TaskDetail'
import { SubmissionsList } from '../components/tasks/Submissions'
import { SubmissionDetailPage } from '../components/tasks/SubmissionDetail'
import { SubmitPage } from '../components/tasks/Submit'
import { Route, Switch } from 'react-router'

const { TabPane } = Tabs

const keyToPage = {
  list: '/tasks',
  submissions: '/tasks/submissions',
  submit: '/tasks/submit'
}

export class TasksPage extends React.Component {
  render() {
    return (
      <div className="card-container">
        <Switch>
          <Tabs
            defaultActiveKey={this.props.match.params.tab}
            onTabClick={key => {
              this.props.history.push(keyToPage[key])
            }}
          >
            <TabPane tab="Tasks" key="list">
              <Switch>
                <Route exact path="/tasks" component={TasksList} />
                <Route exact path="/tasks/:task" component={TaskDetailPage} />
              </Switch>
            </TabPane>
            <TabPane tab="Submissions" key="submissions">
              <Switch>
                <Route
                  exact
                  path="/tasks/submissions"
                  component={SubmissionsList}
                />
                <Route
                  exact
                  path="/tasks/submissions/:submission_id"
                  component={SubmissionDetailPage}
                />
              </Switch>
            </TabPane>
            <TabPane tab="Submit" key="submit">
              <SubmitPage />
            </TabPane>
          </Tabs>
        </Switch>
      </div>
    )
  }
}
