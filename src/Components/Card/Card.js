import React from 'react'

import classes from './Card.module.css';



function Card(props) {
   let groupClass = null;
   switch (props.group) {
      case 'Deaths': groupClass = { "color": "red" }; break;
      case 'Confirmed': groupClass = { "color": "yellow" }; break;
      default: groupClass = { "color": "green" }; break;
   }

   let lists = null;
   if (props.sortedData) {
      lists = props.sortedData.map((ele, i) => {
         return (<li className={classes.list} key={i} >
                  <span style={groupClass} >{(ele.z).toLocaleString()} </span> {ele.country}
               </li>)
      })
   }

   return (
      <div className={classes.Card}>
         <div className={classes.Head}>
            <p>Total {props.group} </p>
            <h2 style={groupClass}>{(props.total).toLocaleString()}</h2>
         </div>
         <div className={classes.subTitle}>
            <p>{props.subTitle}</p>
         </div>
         <div className={classes.cardList}>
            {lists}
         </div>
      </div>
   )
}

export default Card