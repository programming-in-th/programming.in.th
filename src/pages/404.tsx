/* React */
import React from 'react'

/* React Util */
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

export const NotFound = () => {
  const style: { [name: string]: React.CSSProperties } = {
    container: {
      width: '100%',
      height: 'calc(100vh - 83px - 83px + 56px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    h1: {
      fontSize: '32px',
      color: 'var(--snack)'
    },
    button: {
      fontSize: '18px',
      margin: '25px 0',
      padding: '5px 50px'
    },
    a: {
      textDecoration: 'none',
      color: '#ffffff'
    }
  }
  return (
    <div id="root" style={style.container}>
      <p style={style.h1}>Page not found</p>
      <Link to="/" style={style.a}>
        <Button variant="contained" color="primary" style={style.button}>
          Return
        </Button>
      </Link>
    </div>
  )
}
