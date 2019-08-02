/* React */
import React from 'react'

/* React Util */
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar
} from '@material-ui/core'

interface props {
  title: string
  difficulty: number
  tags: Array<String>
}

export default (props: props) => {
  let tags = ''
  if (props.tags)
    props.tags.forEach((element, index) => {
      if (index !== props.tags.length - 1) tags += element + ', '
      else tags += element
    })

  return (
    <ListItem button className="task-list">
      <Avatar
        className={
          props.difficulty <= 4
            ? 'greenAvatar'
            : props.difficulty <= 6
            ? 'yellowAvatar'
            : 'redAvatar'
        }
      >
        <i className="material-icons">stars</i>
      </Avatar>
      {props.tags ? (
        <ListItemText
          className="task-item"
          primary={props.title}
          secondary={tags}
        />
      ) : (
        <ListItemText className="task-item" primary={props.title} />
      )}
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <i className="material-icons">chevron_right</i>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
