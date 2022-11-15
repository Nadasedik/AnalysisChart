import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../strore/theme-context';
import AnalysisChart from './AnalysisChart'
import DropDownList from './DropDownList'

const Chart = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation()


  return (
    <div className='overflow-hidden' style={{'backgroundColor': theme === 'light' ? 'black': 'white','color': theme === 'light' ? 'white': 'black','minHeight':'38.1rem','maxHeight':'max-content'}}>
      <h3 className='pb-3 ps-3 pt-3'>Analysis Chart</h3>
      <div className='float-end'>
      <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={theme === 'dark' ? false : true}
      onChange={toggleTheme}
      size={50}
    />
    </div>
      <h4 className='ps-3'>Number of lessons</h4>
        <DropDownList />
      {location.search &&
        <AnalysisChart /> 
        }
    </div>
  )
}

export default Chart