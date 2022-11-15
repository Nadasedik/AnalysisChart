import React, { useEffect, useRef, useContext} from 'react'
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
import { ThemeContext } from '../strore/theme-context';

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
  
//   export const options = { 
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//                 font: {
//                     size: 16,
//                     weight: 'bold',
//                     color:'yellow'
//                 },
//                 padding: 35,
//                 pointStyle: 'circle'
//               },
//               align: 'start' as const,
//               color:'blue'
//       },
//       title: {
//         display: true,
//             text: 'No of Lessons',    
//             position: 'top'  as const,
//             align: 'start' as const ,
//             font: {
//               size: 14,
//               weight: 'bold'
//           },
//           // color: 'red',
//           padding: {
//                 bottom: 30
//               }
//       }
    
//   },
//   scales: {
//     x: {
//       grid: {
//         borderColor: 'green',
//         color:'blue'
//       },
//       ticks: { color: 'red'}
//     },
//     y: {
//       grid: {
//         borderColor: 'green',
//         color:'blue'
//       },
//        ticks: { color: 'red'}
//     },
//   }
// }

  
const AnalysisChart:React.FC = () => {


  const { theme } = useContext(ThemeContext);
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
      pointHoverRadius: 20,
    label: item.schoolName ,
    data: item.scLessons,
    borderColor:'#'+Math.floor(Math.random()*16777215).toString(16),
    spanGaps: true,
  })),
};

const options = { 
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
              font: {
                  size: 16,
                  weight: 'bold',
                  color:'yellow'
              },
              padding: 40,
              pointStyle: 'circle'
            },
            align: 'start' as const,
            color:'blue'
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
        color: theme === 'dark' ? '#747575' : '#dce0e6',
        padding: {
              bottom: 20
            }
    }
  
},
scales: {
  x: {
    grid: {
      borderColor: theme === 'dark' ? '#dce0e6' : '#343536',
      color: theme === 'dark' ? '#dce0e6' : '#343536'
    },
    ticks: { color: theme === 'dark' ? 'black' : 'white'}
  },
  y: {
    grid: {
      borderColor: theme === 'dark' ? '#dce0e6' : '#343536',
      color:theme === 'dark' ? '#dce0e6' : '#343536'
    },
     ticks: { color: theme === 'dark' ? 'black' : 'white'}
  },
}
}

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
    <div className="container-sm d-flex justify-content-center" style={{'backgroundColor': theme === 'light' ? 'black': 'white','color': theme === 'light' ? 'white': 'black'}}>
      <div className='col-10'>
      <Line options={options} data={data} onClick={handleClick} ref ={chartRef} />
      </div>
      <TotalLessons selectorChartData = {selectorChartData}/>      
      <br />
    </div>
  )
}

export default AnalysisChart