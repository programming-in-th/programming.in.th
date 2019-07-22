/* React */
import React from "react"

/* React Util */
import {
  List,
} from "@material-ui/core"

/* React Component */
import ForumList from "../components/taskList"

/* Static */
import "../assets/css/taskList.css"
import "../assets/css/avatar.css"

export default () => {
  return(
    <div id="task-list-wrapper">
      <List component="nav">
        <ForumList title="JOI18 Tents" difficult="medium" date="Too medium" />
        <ForumList title="JOI18 Construction" difficult="hard" date="Too hard" />
        <ForumList title="JOI17 Amusement Park" difficult="easy" date="Too ez" />
        <ForumList title="Yag and the Mirror" difficult="hard" date="Ui Kay Thoen" />
      </List>
    </div>
  )
}