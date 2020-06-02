import React from 'react'
import classes from './Loading.module.css'

function Loading(props) {
   let width = props.width ? props.width : '100%'
   let height = props.height ? props.height : '100%'
   return (
      <div style={{ width: width, height: height}} className="container">
         <div className={classes.ldsRipple}>
            <div></div>
            <div></div>
         </div>
      </div>
   )
}

export default Loading
