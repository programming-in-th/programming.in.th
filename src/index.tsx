/* React */
import React from "react"
import ReactDOM from "react-dom"

/* React Util */
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { blue } from "@material-ui/core/colors"

/* Pages */
import Index from "./pages/index"
import Task from "./pages/task"
import NotFound from "./pages/notFound"

/* React Component */
import Nav from "./components/nav"

/* Static */
import "./assets/css/init.css"
import "./assets/css/main.css"
import "./assets/material-icon/material-icons.css"
import "./assets/css/responsive.css"


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
        main: "#fafafa"
    }
  },
  typography: {
    useNextVariants: true,
  }
});

const Root = () => {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/task" component={Task} />
                        <Route component={NotFound} />
                    </Switch>
                </>
            </MuiThemeProvider>
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById("react"));