import React from 'react'
import { scLesns } from '../types/IData'

type SelectorChartDataType = {
    selectorChartData: scLesns[];
}
const TotalLessons = ({selectorChartData} : SelectorChartDataType) => {

  return (
    <div className='mt-5 ms-2 mb-3 pb-5'>
       <h4> TotalLessons {selectorChartData.map(itm => itm.scLessons.reduce((acc, val) => {
              return (acc || 0) + (val || 0);
           }, 0)).reduce((acc, val) => {
            return (acc || 0) + (val || 0);
         }, 0)}</h4>

        {selectorChartData.map((item,indx) => 
        <div className='mt-2' key={indx} style={{'color': '#'+Math.floor(Math.random()*16777215).toString(16)}}>
        <h4> <i className="fa-sharp fa-solid fa-circle-info me-1"></i> {item.scLessons.reduce((acc, val) => {
              return (acc || 0) + (val || 0);
           }, 0)} Lessons</h4>
        <p> in {item.schoolName}</p>
        </div>)}
    </div>
  )
}

export default TotalLessons