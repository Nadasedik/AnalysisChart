import React, { useEffect, useRef } from 'react'
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../strore';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { clear, getLessons } from '../strore/CountriesSlice';
import { Months } from '../types/Months';
import { getElementAtEvent } from 'react-chartjs-2';
import TotalLessons from './TotalLessons';

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = { 
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
                font: {
                    size: 16,
                    weight: 'bold',
                },
                padding: 35,
                pointStyle: 'circle'
              },
              align: 'start' as const,
      },
      title: {
        display: true,
            text: 'No of Lessons',    
            position: 'top'  as const,
            align: 'start' as const ,
            font: {
              size: 14,
              weight: 'bold'
          },
          padding: {
                bottom: 30
              }
      }
    
  },
}

  
const AnalysisChart:React.FC = () => {

  const navigate = useNavigate();
  const  chartRef = useRef<any>();
  const location = useLocation()

    const value = queryString.parse(location.search);


    const selectorChartData = useSelector((state:RootState) => state.Countries.chartData)

    const dispatch: AppDispatch = useDispatch()
    
    useEffect(() => {
      dispatch(getLessons({country: value.country, camp: value.camp, school: value.school}))

      return () => {
        dispatch(clear())
      }
    
    }, [dispatch, value.camp, value.country, value.school]);
    
  const labels = Months

 const data = {
  labels,
  datasets: selectorChartData.map(item=> ({
    pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
    label: item.schoolName ,
    data: item.scLessons,
    borderColor:'#'+Math.floor(Math.random()*16777215).toString(16),
    spanGaps: true,
  })),
};

const handleClick = (e:React.MouseEvent<HTMLCanvasElement>) => { 

  if(chartRef && getElementAtEvent(chartRef.current, e)[0]) {
    let scIndx = getElementAtEvent(chartRef.current, e)[0].datasetIndex;
    let moIndx =getElementAtEvent(chartRef.current, e)[0].index;
    let scName = selectorChartData[scIndx].schoolName
    let totalLessons = selectorChartData[scIndx].scLessons[moIndx]
    let month = Months[moIndx]
    navigate(
       `/details`,
       {
        state:{schoolName:scName,totalLessons:totalLessons,month:month}
       }
    );
    
  } else {

    console.log(e)
  }
}
  return (
    <div className="container-sm d-flex justify-content-center">
      <div className='col-10'>
      <Line options={options} data={data} onClick={handleClick} ref ={chartRef} />
      </div>
      <TotalLessons selectorChartData = {selectorChartData}/>      
      <br />
    </div>
  )
}

export default AnalysisChart