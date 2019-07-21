/* React */
import React from "react"

/* React Util */
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Avatar
} from "@material-ui/core"

interface props {
    title: string,
    date?: string
}

export default (props: props) => {
    return (
        <ListItem button className="forum-list">
            <Avatar>
                <i className="material-icons">timeline</i>
            </Avatar>
            {props.date ?
            <ListItemText className="forum-item" primary={props.title} secondary={props.date} />
            : 
            <ListItemText className="forum-item" primary={props.title} />
            }
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                    <i className="material-icons">chevron_right</i>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}