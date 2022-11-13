import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../strore';

const Details = () => {

  const location = useLocation();

  const country = useSelector((state:RootState) => state.Countries.selectedCountry)
  const camp = useSelector((state:RootState) => state.Countries.selectedCamp)

  return (
    <div className="container-md  m-5 p-5">
    <table className="table table-primary table-hover table-striped ">
  <thead>
    <tr>
      <th scope="col">Country</th>
      <th scope="col">Camp </th>
      <th scope="col">School </th>
      <th scope="col">Month</th>
      <th scope="col">Total Lessons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{country}</td>
      <td>{camp}</td>
      <td>{location.state.schoolName}</td>
      <td>{location.state.month}</td>
      <td>{location.state.totalLessons}</td>
    </tr>
  </tbody>
</table>
</div>
  )
}

export default Details