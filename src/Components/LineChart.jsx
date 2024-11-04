
import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react'
import "./LineChart.css";


const LineChart = ({historicalCoinData}) => {
const [data,setData]=useState([[]]);

useEffect(()=>{
let DataCopy=[["Date","Prices"]];
if (historicalCoinData.prices) {
    historicalCoinData.prices.map((item)=>{
        DataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)} `,item[1]])
    })
    setData(DataCopy)
}
},[historicalCoinData])


  return (
<Chart 
  chartType="LineChart"
  data={data}
  height={"300px"} // Set a fixed height
  width={"800px"} // Set a fixed width
  legendToggle
/>
  )
}

export default LineChart;