import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      top: '55px'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    contents: {
      position: 'relative',
      top: '45px'
    }
  })
)

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

export default function CodeDialog(props: any) {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        fullScreen
        open={props.isShowingModal}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {'Submission: ' + props.submission_id}
            </Typography>
            <Button color="inherit" onClick={props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List className={classes.contents}>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}
