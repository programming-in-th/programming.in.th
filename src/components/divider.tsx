/* React */
import React from "react"

interface props {
  title?: string,
  lang?: string
}

export default (props: props) => {
  return(
    <div className="divider">
      {props.title ?
        <>
          {props.lang === "th" ?
          <p className="th">{props.title}</p>
          : <p>{props.title}</p> }
        </>
      : null }
    </div>
  )
}