/* React */
import React from "react"

/* React Component */
import Card from "../components/card"

export default class extends React.Component {
    render(){
        return(
            <>
                <div id="root">
                    <div className="card-wrapper">
                        <Card 
                            title="Task"
                            icon="functions"
                            to="/task"
                            linkCard
                        />
                        <Card 
                            title="Forum"
                            icon="forum"
                            to="/forum"
                            color="rgb(76, 217, 100)"
                            shadow="rgba(76, 217, 100, .625)"
                            linkCard
                        />
                        <Card 
                            title="Stats"
                            icon="timeline"
                            to="/me"
                            color="rgb(88, 86, 214)"
                            shadow="rgba(88, 86, 214, .625)"
                            linkCard
                        />
                    </div>
                </div>
            </>
        )
    }
}