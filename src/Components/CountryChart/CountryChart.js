import React from 'react';
import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";

import classes from './CountryChart.module.css'

function CountryChart(props) {
   const { confirmed, deaths, recovered } = props;
   const mapOptions = {
      chart: {
         type: 'area'
      },
      title: {
         text: 'Graph of COVID-19 Infected, Deaths and Recovered by Country'
      },
      xAxis: {
         type: 'datetime',
         tickmarkPlacement: 'on',
         dateTimeLabelFormats: {
            day: '%e %b'
         },
         title: {
            enabled: false,
            type: 'datetime'
         },
         
      },
      yAxis: {
         title: {
            text: 'Thousand'
         },
         labels: {
            formatter: function () {
               return this.value / 1000;
            }
         }
      },
      tooltip: {
         split: true,
      },
      plotOptions: {
         area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
               enabled: false,
               fillColor: '#8C8C8C'
            }
         }
      },
      series: [{
         name: 'Infected',
         data: confirmed,
         pointStart: Date.UTC(2010, 0, 22),
         pointInterval: 24 * 3600 * 1000, // one day
         color: '#e6ee10'
      },
      {
         name: 'Recovered',
         data: recovered,
         pointStart: Date.UTC(2010, 0, 22),
         pointInterval: 24 * 3600 * 1000, // one day
         color: '#41ee10'
      },
      {
         name: 'Deaths',
         data: deaths,
         pointStart: Date.UTC(2010, 0, 22),
         pointInterval: 24 * 3600 * 1000, // one day
         color: '#ee1010'
      }]
   }

   return (
      <div className={classes.CountryChart}>
         <HighchartsReact
            options={mapOptions}
            constructorType={"chart"}
            highcharts={Highcharts}
         />
      </div>
   )
}

export default CountryChart
