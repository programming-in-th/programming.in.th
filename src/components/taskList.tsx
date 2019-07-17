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
import { pseudoRandomBytes } from "crypto";

interface props {
    title: string,
    difficult: string, 
    date?: string
}


export default (props: props) => {
    return (
        <ListItem button className="task-list">
            <Avatar className = {props.difficult == "easy" ? "greenAvatar" : props.difficult == "medium" ? "yellowAvatar" : "redAvatar"}>
                <i className="material-icons">stars</i>
            </Avatar>
            {props.date ?
            <ListItemText primary={props.title} secondary={props.date} />
            : 
            <ListItemText primary={props.title} />
            }
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                    <i className="material-icons">chevron_right</i>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}