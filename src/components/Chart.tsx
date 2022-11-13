import React from 'react'
import AnalysisChart from './AnalysisChart'
import DropDownList from './DropDownList'

const Chart = () => {
  return (
    <div>
      <h3 className='pb-3 ps-3 pt-3'>Analysis Chart</h3>
      <h4 className='ps-3'>Number of lessons</h4>
        <DropDownList />
        <AnalysisChart />
    </div>
  )
}

export default Chart