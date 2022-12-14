import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../store/theme-context';
import { scLesns } from '../types/IData'

type SelectorChartDataType = {
    selectorChartData: scLesns[];
}
const TotalLessons = ({selectorChartData} : SelectorChartDataType) => {

   const { theme } = useContext(ThemeContext);
   const { t } = useTranslation()

  return (
    <div className='mt-5 ms-2 mb-5 pb-5'>
       <h4 style={{'color' :theme === 'dark' ? 'black' :'white'}}> {t('Total_Lessons')}  {selectorChartData.map(itm => itm.scLessons.reduce((acc, val) => {
              return (acc || 0) + (val || 0);
           }, 0)).reduce((acc, val) => {
            return (acc || 0) + (val || 0);
         }, 0)}</h4>

        {selectorChartData.map((item,indx) => 
        <div className='mt-5 mb-5' key={indx} style={{'color': '#'+Math.floor(Math.random()*16777215).toString(16)}}>
        <h4> <i className="fa-sharp fa-solid fa-circle-info me-1"></i> {item.scLessons.reduce((acc, val) => {
              return (acc || 0) + (val || 0);
           }, 0)} {t('Lessons')}</h4>
        <p> {t('in')} {item.schoolName}</p>
        </div>)}
    </div>
  )
}

export default TotalLessons