import React, {useContext} from 'react';

import classes from './Home.module.css';
import WorldChart from '../../Components/WorldChart/WorldChart'
import Card from '../../Components/Card/Card';
import { dataContext } from '../../context'
import Loader from '../../Components/Loading/Loading'

function Home() {
   let data;
   const context = useContext(dataContext);
   if (context.loading === false) {
      data = context.getListData();
   }
   
   let render = <Loader height="100vh" width="100vw" />
   if (data) {
      render = (<>
         <Card group='Confirmed' subTitle="Confirmed Cases by Country" {...data.confirmedData} />
         <WorldChart data={data.mapArray} />
         <Card group='Deaths' subTitle="Total Deaths by Country" {...data.deathsData} />
         <Card group='Recovered' subTitle="Total Recovered by Country" {...data.recoveredData} />
      </>
      )
   }

   return (
      <div className={classes.Home} >
         {render}
      </div>
   )
}

export default Home
