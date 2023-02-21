import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { Globals } from '../Constants';
import Loader from './Loader';

const apiURL = Globals.baseAPIURL + 'api/';

function Schedule() {
    const options = [
        { value: 'Cricket', label: 'Cricket' },
        { value: 'Football', label: 'Football' }
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [categories, setCategories] = useState([]);

    let selectedCategoryString = '';
    let selectedDateString = 'startTime=' + startDate.toISOString();
    
    useEffect(() => {
        setCategoryState();
        setScheduleState();
      }, []);

    const setScheduleState = async () => {
        try {

            setLoading(true);

            let linkURL = apiURL + 'findAvailableSchedulesWithPagination?' + selectedDateString + '&' + selectedCategoryString;

            const requestOptions = {
            method: 'GET',
            headers: {  }
            };

            let response = await fetch(linkURL, requestOptions);
            response = await response.json();

            setLoading(false);

            if (response.response_code === 0) {
                setSchedule(organizeSchedule(response.schedules.schedules));
            }
        } catch (e) {
            console.log('error while fetching links')
        }
    }

    const setCategoryState = async () => {
        try {

            let linkURL = apiURL + 'getAllCategories';

            const requestOptions = {
                method: 'GET',
                headers: {  }
            };

            let response = await fetch(linkURL, requestOptions);
            response = await response.json();

            if (response.response_code === 0) {
                setCategories(mapCategories(response.categories));
            }
        } catch (e) {
            console.log('error while fetching links')
        }
    }

    const mapCategories = (list) => {
        let categories = [];

        list.forEach(element => {
            categories.push({
                value: element._id,
                label: element.value 
            });
        });

        return categories;
    } 

    const organizeSchedule = (schedule) => {
        let organizedSchedule = [];

        organizedSchedule.push(schedule.reduce(function (r, a) {
            r[new Date(a.startTime).toLocaleDateString()] = r[new Date(a.startTime).toLocaleDateString()] || [];
            r[new Date(a.startTime).toLocaleDateString()].push(a);
            return r;
        }, Object.create(null)));

        const groups = schedule.reduce((groups, match) => {
            const date = new Date(match.startTime).toLocaleDateString('en-GB');
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(match);
            return groups;
          }, {});
          
          // Edit: to add it in the array format instead
          organizedSchedule = Object.keys(groups).map((date) => {
            return {
              date,
              matches: groups[date]
            };
          });
         
        return organizedSchedule;
    }

    const onCategoryChange = (category) => {
        if (category === null) {
            selectedCategoryString = '';
        } else {
            selectedCategoryString = 'category=' + category.value;
        }

        setScheduleState();
    }

    const onDateChange = (date) => {
        selectedDateString = 'startTime=' + date.toISOString();
        setStartDate(date);
        setScheduleState();
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <Select
                            className="category-select"
                            options={categories}
                            onChange={(value) => onCategoryChange(value)}
                            isClearable
                        />
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-12" style={{width: ''}}>
                        <DatePicker selected={startDate} onChange={date => onDateChange(date)} minDate={new Date()} className="filter-datepicker"/>
                    </div>
                </div>
                {
                        loading 
                        ?
                            <Loader />
                        :
                        schedule && schedule.length > 0 && schedule.map((item, i) => {
                            return (
                                <div key={i}>
                                    <div className="row mt-5">
                                        <h5>{item.date}</h5>
                                    </div>
                                    {
                                        item.matches && item.matches.length > 0 && item.matches.map((match, j) => {
                                            return (
                                                <div key={j}>
                                                    <div className="row mt-5 text-center">
                                                        <div className="col-lg-2 col-sm-4">
                                                            <p className="">{match.category.value}</p>
                                                        </div>
                                                        <div className="col-lg-8 col-sm-4">
                                                            <p className="">{match.title}</p>
                                                            <div className="vl d-none d-lg-block"></div>
                                                        </div>
                                                        <div className="col-lg-2 col-sm-4">
                                                            <p className="">{new Date(match.startTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p>
                                                            <div className="vl d-none d-lg-block"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                }  
            </div>
        </>
    )
}

export default Schedule;