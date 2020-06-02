import React from 'react'

import classes from './CardList.module.css'

function CardList(props) {
   let lists = []
   for (let i = 0; i < 100; i++) {
      lists.push(<li><span style={props.groupClass} >1,283,929 </span> US</li>)
   }
   return (
      <div>
         {lists}
      </div>
   )
}

export default CardList
