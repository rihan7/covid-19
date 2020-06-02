import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Header.module.css'

function Header() {
   return (
      <div className={classes.header}>
         <div className={classes.title}>
            COVID-19
         </div>
         <div>
           <nav>
              <ul>
                 <li>
                     <Link to="/">Home</Link>
                 </li>
                  <li>
                     <Link to="/chart">Chart</Link>
                  </li>
              </ul>
           </nav>
         </div>
      </div>
   )
}

export default Header
