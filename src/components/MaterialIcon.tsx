import React from 'react'
import styles from '../assets/material-icon/mticons.module.css'

interface IMaterialIconProps {
  icon: string
}

export const MaterialIcon: React.FunctionComponent<IMaterialIconProps> = (
  props: IMaterialIconProps
) => <i className={styles.icon}>{props.icon}</i>
