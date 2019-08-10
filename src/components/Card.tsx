/* React */
import React from 'react'

/* React Util */
import { Button, Card, CardActionArea } from '@material-ui/core'
import { Link } from 'react-router-dom'

/* Static */
import styles from '../assets/css/card.module.css'

interface detailProps {
  title: string
  description?: string
  to?: string
  linkCard?: boolean
}

const CardDetail = (props: detailProps) => {
  return (
    <React.Fragment>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.body}>
        {props.description ? (
          <div className={styles.description}>
            <p>{props.description}</p>
          </div>
        ) : null}
        {props.to && !props.linkCard ? (
          <div className={styles.footer}>
            <div></div>
            <Button
              variant="contained"
              color="primary"
              className={styles.button}
            >
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
    <div className={styles.former}>
      <div
        className={styles.square}
        style={{
          backgroundColor: `${props.color}`,
          boxShadow: `0 5px 25px ${props.shadow}`
        }}
      >
        <i className="material-icons">{props.icon}</i>
      </div>
      <div className={styles.card}>
        {props.linkCard ? (
          <Card style={{ boxShadow: 'unset' }}>
            <CardActionArea>
              <Link to={`${props.to}`} className={styles.bodyLink}>
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
