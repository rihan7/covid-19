import React, { useState, useContext } from 'react';

import classes from './Chart.module.css'
import TextCard from '../../Components/TextCard/TextCard';
import CountryChart from '../../Components/CountryChart/CountryChart';
import { dataContext } from '../../context'
import Loader from '../../Components/Loading/Loading'


function Chart() {
   const [data, setData] = useState()
   const { loading, getChartPageData} = useContext(dataContext);
   
   if(!loading && !data) {
      const obj = getChartPageData('global');
      setData(obj)
   }

   const getCountryData = (event) => {
      const name = event.target.value;
      const obj = getChartPageData(name);
      setData(obj)
   }

   let render = <Loader height="100vh" width="100vw" />;
   
   if(data) {
      render =   (<div className={classes.chart} >
                  <div className={classes.cardList}>
                     <TextCard
                        subject="Infected"
                        total={(data.Infected).toLocaleString()}
                        date={data.date}
                        description='Number of active cases of COVID-19.' />
                     <TextCard
                        subject="Deaths"
                        total={(data.Deaths).toLocaleString()}
                        date={data.date}
                        description='Number of active cases of COVID-19.' />
                     <TextCard
                        subject="Recovered"
                        total={(data.Recovered).toLocaleString()}
                        date={data.date}
                        description='Number of active cases of COVID-19.' />
                  </div>
                  <select onChange={(event) => getCountryData(event)} >
                        <option value="global">Global</option>
                        {data.countries.map(country => <option value={country} key={country}>{country}</option> )}
                     </select>
                  <CountryChart {...data.countryChartData} />
               </div>)
         }

   return render
}

export default Chart
