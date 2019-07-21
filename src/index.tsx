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
import Tasks from "./pages/tasks"
import NotFound from "./pages/notFound"

/* React Component */
import Nav from "./components/nav"

/* Static */
import "./assets/css/init.css"
import "./assets/css/main.css"
import "./assets/material-icon/material-icons.css"
import "./assets/css/responsive.css"
import firebase from "firebase";

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyCjd-glhd1Rl_QJUfLp4w2zxEB94bhIsJE",
        authDomain: "grader-ef0b5.firebaseapp.com",
        databaseURL: "https://grader-ef0b5.firebaseio.com",
        projectId: "grader-ef0b5",
        storageBucket: "grader-ef0b5.appspot.com",
        messagingSenderId: "408883593148",
        appId: "1:408883593148:web:7e080f677cb99238"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: "#fafafa"
        }
    },
    typography: {
        // useNextVariants: true,
        // TODO: fix typography
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
                        <Route exact path="/tasks" component={Tasks} />
                        <Route component={NotFound} />
                    </Switch>
                </>
            </MuiThemeProvider>
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById("react"));