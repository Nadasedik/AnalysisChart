import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../store/theme-context';
import AnalysisChart from './AnalysisChart'
import DropDownList from './DropDownList'
import { useTranslation } from "react-i18next";
import DropdownList from "react-widgets/DropdownList";

const Chart = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation()

  const { t, i18n, ready } = useTranslation()

const myLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
const [lang, setLang] = useState(myLang);

if(ready) {
  return (
    <div className='overflow-hidden' 
    style={{'backgroundColor': theme === 'light' ? 'black': 'white','color': theme === 'light' ? 'white': 'black','minHeight':'38.1rem','maxHeight':'max-content'}}
    dir={i18n.dir()}>
      <div className='d-flex justify-content-between'>
        <h3 className='p-3'>{t('Analysis_Chart')}</h3>
      <div className='col-1 p-2'>
      <DropdownList
                value={lang}
                onChange={(lang) => {
                  i18n.changeLanguage(lang);
                  setLang(lang)
                  localStorage.setItem('lang',lang)
                }}
                data={['en','ar']}
              />
              </div>
      </div>
      <div className='d-flex justify-content-between'>
      <h4 className='p-3 '>{t('Number_of_lessons')}</h4>
      <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={theme === 'dark' ? false : true}
      onChange={toggleTheme}
      size={50}
    />
    </div>
        <DropDownList />
      {location.search &&
        <AnalysisChart /> 
        }
    </div>
  ) }
  return <span>Loading...</span>;
}

export default Chart