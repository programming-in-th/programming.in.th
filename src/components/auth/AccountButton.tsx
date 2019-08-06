import React from 'react'
import Button from '@material-ui/core/Button'

interface IButtonProps {
  id?: String
  icon?: String
  text: String
  onClick?: () => void
}

export const AccountButton: React.FunctionComponent<IButtonProps> = (
  props: IButtonProps
) => {
  return (
    <Button
      id={`${props.id ? props.id : ''}`}
      variant="contained"
      color="primary"
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      {props.icon ? <i className="material-icons">{props.icon}</i> : null}
      {props.text}
    </Button>
  )
}
