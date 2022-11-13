import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IData, { scLesns } from "../types/IData";
import { Months } from "../types/Months";


type CountriesState = {
  status: "loading" | "idle";
  error: string | null| {};
  allData: IData[],
  countries: string[];
  camps: string[],
  schools: string[],
  selectedCountry: string,
  selectedCamp: string,
  selectedSchool: string[],
  chartData: scLesns[],  
};

export const getCountries = createAsyncThunk<IData[]>(
  "countries/getCountries",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch("data.json");
      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const intialCountries: CountriesState = {
  allData: [],
  countries: [],
  camps: [],
  schools: [],
  error: null,
  status: "idle",
  selectedCountry: '',
  selectedCamp: '',
  selectedSchool: [],
  chartData: [],
};

const CountriesSlice = createSlice({
  name: "countries",
  initialState: intialCountries,
  reducers: {
    getCamps: (state,action) => {
      let allCamps: string[] = [];
      state.selectedCountry = action.payload;

      state.allData.forEach((item:IData)=>{
        if(action.payload === item.country) {
          let camp= item.camp
          if(!allCamps.includes(camp))
          {
            allCamps.push(camp)
          }
        }
      })
      state.camps = allCamps
    },

    getSchools: (state,action) => {
      let allSchools: string[] = ['Allschools'];
      state.selectedCamp = action.payload.camp;

      state.allData.forEach((item:IData)=>{
        if(action.payload.contry === item.country && action.payload.camp === item.camp) {
          let school= item.school
          if(!allSchools.includes(school))
          {
            allSchools.push(school)
          }
        }
      })
      state.schools = allSchools
    },

    getLessons: (state, action) => {
      let allLessons: scLesns[] = [];

      if(action.payload.school !== 'Allschools') {
        state.selectedSchool = action.payload.school
      }else{
        state.selectedSchool = state.schools.filter(item => item !== 'Allschools')
      }
        
        state.allData.forEach((item:IData)=>{
          let condition = action.payload.school ==='Allschools' ? action.payload.country === item.country && action.payload.camp === item.camp :action.payload.country === item.country && action.payload.camp === item.camp && action.payload.school === item.school
          if(condition ) {
            let indx = Months.indexOf(item.month) 
            
            if(allLessons.length === 0 ||allLessons.every(itm=> itm.schoolName !== item.school)) {
              let lesson:scLesns;
              
              lesson = {schoolName: item.school,scLessons:Array.from({length:12}).fill(null) as []}
              lesson.scLessons[indx] = item.lessons

              allLessons.push(lesson)
            }else{
              let mainIndex =allLessons.findIndex(el => el.schoolName === item.school)
              if((allLessons[mainIndex].scLessons[indx])) {
                (allLessons[mainIndex].scLessons[indx] as number) += item.lessons
              }else{
                (allLessons[mainIndex].scLessons[indx] as number) = item.lessons
              }
            }
                         
            }
          })
          state.chartData = allLessons;  
    },
    clear: (state) => {
      state = intialCountries
    }
  },
  extraReducers: (builder) => {

    /// getCountries reducer

    builder.addCase(getCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getCountries.fulfilled, (state, action) => {

      state.allData = action.payload
      let allCountries: string[] = [];

      state.allData.forEach((item)=>{
        let country= item.country
        if(!allCountries.includes(country))
        {
          allCountries.push(country)
        }
      })
      state.countries = allCountries
      state.status = "idle";
    });

    builder.addCase(getCountries.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.status = "idle";
    });

  },
});
export const { getCamps, getSchools, getLessons, clear} = CountriesSlice.actions;
export default CountriesSlice;
