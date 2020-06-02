import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WorldMap from '@highcharts/map-collection/custom/world.geo.json';



// Load Highcharts modules
require("highcharts/modules/map")(Highcharts);



const Cards = (props) => {
   let { confirmed, deaths, recovered} = props.data 
   
   const viewHeight =  window.innerHeight - 64;
   const mapOptions = {
      chart: {
         map: WorldMap,
         height: viewHeight,
         backgroundColor: '#A9A9A9'
      },

      title: {
         text: 'Current Status Of COVID-19'
      },

      legend: {
         enabled: true
      },

      plotOptions: {
         series: {
            events: {
               legendItemClick: function (event) {
                  this.chart.series.forEach((item, index) => {
                     item.setVisible(false)
                  });
                  this.chart.series[0].setVisible(true);
               }
            }
         }
      },

      mapNavigation: {
         enabled: true,
         buttonOptions: {
            verticalAlign: 'bottom'
         }
      },

      series: [{
         name: 'Countries',
         color: '#E0E0E0',
         enableMouseTracking: false
      }, 
      {
         type: 'mapbubble',
         name: 'Death',
         color: '#ff0000',
         joinBy: ['name', 'country'],
         data: deaths,
         minSize: 4,
         maxSize: '8%',
         tooltip: {
            pointFormat: '{point.name}: {point.z}'
            }
         }, 
         {
            type: 'mapbubble',
            name: 'Confirmed',
            color: '#FF8800',
            joinBy: ['name', 'country'],
            data: confirmed,
            minSize: 4,
            maxSize: '8%',
            tooltip: {
               pointFormat: '{point.name}: {point.z}'
            },
            visible: false,
         },
         {
            type: 'mapbubble',
            name: 'Recovered',
            color: '#339900',
            joinBy: ['name', 'country'],
            data: recovered,
            minSize: 4,
            maxSize: '8%',
            tooltip: {
               pointFormat: '{point.name}: {point.z}'
            },
            visible: false,
         }
   ]
   }
   
   return (
      <div>
         <HighchartsReact
            options={mapOptions}
            constructorType={"mapChart"}
            highcharts={Highcharts}
         />
      </div>
   )
}

export default Cards
