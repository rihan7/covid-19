import React from 'react'

import classes from './TextCard.module.css'

function TextCard(props) {
   let groupClass = null;
   switch (props.subject) {
      case 'Deaths': groupClass = classes.red; break;
      case 'Infected': groupClass = classes.yellow; break;
      default: groupClass = classes.green; break;
   }
   return (
      <div className={[classes.card, groupClass].join(' ')}>
         <p>{props.subject}</p>
         <h1>{props.total}</h1>
         <p>{props.date}</p>
         <p>{props.description}</p>
         {props.children}
      </div>
   )
}

export default TextCard
