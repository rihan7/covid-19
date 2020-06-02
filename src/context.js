import React, { useState, useEffect } from 'react';

export const dataContext = React.createContext({});


function DataProvider(props) {
   const [dataObj, setDataObj] = useState({loading: true});

   useEffect(() => {
      setDataObj({ ...dataObj, loading: true})
      fetch("https://pomber.github.io/covid19/timeseries.json")
         .then(response => response.json())
         .then(data => {
            const global = getGlobalData(data);
            setDataObj({
               ...dataObj,
               fullData: data,
               global,
               loading: false
            });
         })
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const getGlobalData = (data) => {
      let arr = [];
      Object.keys(data).map(name => {
         if (arr.length <= 0) {
            const dataLength = data[name].length;
            arr = Array(dataLength).fill().map(u => [])
         }
         return data[name].forEach((ele, i) => {
            arr[i].push(ele)
         })
      })

      const reduceData = arr.map(element => {
         return element.reduce((sum, cur) => {
            Object.keys(cur).forEach(item => {
               if (item === "date") {
                  return sum.date = cur.date
               }
               sum[item] = (sum[item] || 0) + cur[item]
            });
            return sum
         }, {})
      });
      return reduceData;
   }

   const mapArrayContractor = (data) => {
      let mapObj = {
         confirmed: [],
         deaths: [],
         recovered: []
      };

      Object.keys(data).map(country => {
         const countryArray = data[country];
         const lastDateObj = countryArray[countryArray.length - 1];
         country = country === 'US' ? 'United States of America' : country
         
         return Object.keys(mapObj).map(ele => mapObj[ele].push({ country, z: lastDateObj[ele] }) )
      });
      return mapObj;
   }

   const CardData = (data) => {
      const total = data.reduce((sum, cur) => sum + cur.z, 0);
      const sortedData = data.sort((a, b) => b.z - a.z);
      return { total, sortedData }
   }

   

   const getListData = () => {
      const modifiedData = mapArrayContractor(dataObj.fullData);
      const { confirmed, deaths, recovered } = modifiedData
        let confirmedData = CardData(confirmed)
        let deathsData = CardData(deaths)
        let recoveredData = CardData(recovered);

        return { confirmedData, deathsData, recoveredData, mapArray: modifiedData }
      }
      
   const getChartPageData = (name) => {
      const countryArray = name === 'global' ? dataObj.global : dataObj.fullData[name];
      const countryChartData = getCountryChart(countryArray);
      // console.log(countryChartData)
      const countryLast = countryArray[countryArray.length - 1];
      countryLast.date = new Date(countryLast.date).toDateString();
      const countryList = Object.keys(dataObj.fullData);
      return {
         Infected: countryLast.confirmed,
         Deaths: countryLast.deaths,
         Recovered: countryLast.recovered,
         date: countryLast.date,
         countries: countryList,
         countryChartData
      }
   }

   const getCountryChart = (data) => {
      const countryChart = {
         confirmed: [],
         deaths: [],
         recovered: []
      }
      data.forEach(ele => {
         Object.keys(ele).map(name => {
            // eslint-disable-next-line array-callback-return
            if(name === "date") return;
            return countryChart[name].push(ele[name])
         })
      });
      return countryChart
   }


   return (
      <dataContext.Provider value={{ ...dataObj, getListData: getListData, getChartPageData: getChartPageData }}>
         {props.children}
      </dataContext.Provider>
   )
}

export default DataProvider;
