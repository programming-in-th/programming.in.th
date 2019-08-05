/* React */
import React from 'react'

/* React Util */
import { Button, Card, CardActionArea } from '@material-ui/core'
import { Link } from 'react-router-dom'

/* Static */
import '../assets/css/card.css'

interface detailProps {
  title: string
  description?: string
  to?: string
  linkCard?: boolean
}

const CardDetail = (props: detailProps) => {
  return (
    <React.Fragment>
      <div className="card-title">{props.title}</div>
      <div className="card-body">
        {props.description ? (
          <div className="card-description">
            <p>{props.description}</p>
          </div>
        ) : null}
        {props.to && !props.linkCard ? (
          <div className="card-footer">
            <div></div>
            <Button variant="contained" color="primary" className="card-button">
              <Link to={`${props.to}`}>{props.title}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}

interface props {
  title: string
  icon: string
  description?: string
  to?: string
  linkCard?: boolean
  color?: string
  shadow?: string
}

export const CustomCard = (props: props) => {
  return (
    <div className="card-former">
      <div
        className="card-square"
        style={{
          backgroundColor: `${props.color}`,
          boxShadow: `0 5px 25px ${props.shadow}`
        }}
      >
        <i className="material-icons">{props.icon}</i>
      </div>
      <div className="card">
        {props.linkCard ? (
          <Card style={{ boxShadow: 'unset' }}>
            <CardActionArea>
              <Link to={`${props.to}`} className="card-body-link">
                <CardDetail
                  title={props.title}
                  description={props.description}
                  linkCard={true}
                />
              </Link>
            </CardActionArea>
          </Card>
        ) : (
          <CardDetail
            title={props.title}
            description={props.description}
            to={props.to}
          />
        )}
      </div>
    </div>
  )
}
