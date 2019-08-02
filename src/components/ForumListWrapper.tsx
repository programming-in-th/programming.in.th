/* React */
import React from 'react'

/* React Util */
import { List } from '@material-ui/core'

/* React Component */
import { ForumList } from './ForumList'

/* Static */
import '../assets/css/forumList.css'

export const ForumListWrapper = () => {
  return (
    <div id="forum-list-wrapper">
      <List component="nav">
        <ForumList
          title="Hello World! This is a test title for forum list testing!"
          date="1 Jan"
        />
        <ForumList title="Hello yo yo" date="1 Jan" />
        <ForumList title="Hello" date="1 Jan" />
        <ForumList title="Hello" date="1 Jan" />
      </List>
    </div>
  )
}
