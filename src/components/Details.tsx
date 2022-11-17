import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { ThemeContext } from '../store/theme-context';

const Details = () => {

  const location = useLocation();
  const { t, i18n } = useTranslation()
  const { theme } = useContext(ThemeContext);

  const country = useSelector((state:RootState) => state.Countries.selectedCountry)
  const camp = useSelector((state:RootState) => state.Countries.selectedCamp)

  return (
    <div className="container-xxl p-5" dir={i18n.dir()}
    style={{'backgroundColor': theme === 'light' ? 'black': 'white','color': theme === 'light' ? 'white': 'black','minHeight':'38.1rem','maxHeight':'max-content','textAlign':'center','alignContent':'center'}}>
    <table className="table table-primary table-hover table-striped ">
  <thead>
    <tr style={{'color': '#39528f'}}>
      <th scope="col" className="fs-4 p-4 ">{t('Country')}</th>
      <th scope="col" className="fs-4 p-4">{t('Camp')} </th>
      <th scope="col" className="fs-4 p-4">{t('School')} </th>
      <th scope="col" className="fs-4 p-4">{t('Month')}</th>
      <th scope="col" className="fs-4 p-4">{t('Total_Lessons')}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="fs-5 p-4">{country}</td>
      <td className="fs-5 p-4">{camp}</td>
      <td className="fs-5 p-4">{location.state.schoolName}</td>
      <td className="fs-5 p-4">{location.state.month}</td>
      <td className="fs-5 p-4">{location.state.totalLessons}</td>
    </tr>
  </tbody>
</table>
</div>
  )
}

export default Details