import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clear, getCamps, getCountries, getSchools } from "../store/CountriesSlice";
import { useTranslation } from "react-i18next";

const DropDownList: React.FC = () => {

  const selectedCountry = useSelector(
    (state: RootState) => state.Countries.selectedCountry
  );
  const selectedCamp = useSelector(
    (state: RootState) => state.Countries.selectedCamp
  );
  const selectedSchool= useSelector(
    (state: RootState) => state.Countries.selectedSchool
  );

  const navigate = useNavigate();
  const [country, setCountry] = useState<string>(selectedCountry? selectedCountry : '');
  const [camp, setCamp] = useState<string>(selectedCamp ? selectedCamp : '');
  const [school, setSchool] = useState((selectedSchool && selectedSchool.length >1 && typeof selectedSchool !== 'string') ? 'Allschools' : selectedSchool);

  const handleSearch = () => {
    if(country&&camp&&school) {
      navigate({
        pathname: "/chart",
        search: `?country=${country}&camp=${camp}&school=${school}`,
      });
    }

  };

  const selectorCountries = useSelector(
    (state: RootState) => state.Countries.countries
  );
  const selectorCamps = useSelector(
    (state: RootState) => state.Countries.camps
  );
  const selectorSchools = useSelector(
    (state: RootState) => state.Countries.schools
  );
  const selectorStatus = useSelector(
    (state: RootState) => state.Countries.status
  );
  const selectorError = useSelector(
    (state: RootState) => state.Countries.error
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    
    return () => {
      dispatch(clear())
    }
  }, [dispatch]);

  const { t } = useTranslation()

  return (
    <>
      <br />
      {selectorStatus === "loading" && !selectorError && (
        <div className="d-flex justify-content-center text-primary mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {selectorStatus === "idle" && !selectorError && (
        <>

          <div className="container text-center">
            <div className="row">
              <div className="col">
                <p>
                  {t('Select_Country')} : <strong>{country}</strong>
                </p>
                <DropdownList
                  value={country}
                  onChange={(contry) => {
                    setCountry(contry);
                    dispatch(getCamps(contry));
                  }}
                  data={selectorCountries}
                />
              </div>
              <div className="col">
                <p>
                {t('Select_Camp')} : <strong>{camp}</strong>
                </p>
                <DropdownList
                  value={camp}
                  onChange={(cmp) => {
                    setCamp(cmp);
                    dispatch(getSchools({ contry: country, camp: cmp }));
                  }}
                  data={selectorCamps}
                />
              </div>
              <div className="col">
                <p>
                {t('Select_School')} : <strong>{school}</strong>
                </p>
                <DropdownList
                  value={school}
                  onChange={(schol) => setSchool(schol)}
                  data={selectorSchools}
                />
              </div>
            </div>
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              {t('Search')}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DropDownList;
