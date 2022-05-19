import { useContext, useState } from 'react';
import styled from 'styled-components'
import AppTheme from "../Colors";
import { ThemeContext } from "../context/ThemeContext";
import Header from './Header';
import moment from 'moment';
import Calendar from 'react-calendar'
import './Calenders.css';
import "./Date.css";
import { InputBoxes } from './InputBoxes';
import Button from '@mui/material/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {nanoid} from "nanoid";

const DateContainer = styled.div`
    width: 80%;
    height: 460px;
    margin:auto;
    margin-top: 25px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: grid;
    grid-template-columns: 20% 40% 40%;
    background-color: ${props => props.bgm };
    color: ${props => props.colour};
    $
`;

export const Date = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    const [values,setValues] = useState("");
    const weekdayshort = moment.weekdaysShort();
    console.log('weekdayshort:', weekdayshort)
    const [startDate, setStartDate] = useState();
    var d = new window.Date();
    const [dateState, setDateState] = useState(d);
    const [diffData,setDiffData] = useState(false);
    const [diffData1,setDiffData1] = useState(d);
    const [newDate,setNewDate] = useState("");
    
    /*
    <table className='tableStart'>
                        <thead>
                        <tr>
                        {
                            weekdayshort.map((day)=>{
                                return (
                                    <th key={day} className="week-day">
                                     {day}
                                    </th>
                                  )
                            })
                        }
                        </tr>
                        </thead>
                    </table>
    */

    function isBefore(date1, date2) {
        date1 = date1.split('-').map(Number);
        date2 = date2.split('-').map(Number);
        console.log('date1:', date1)
        console.log('date2:', date2)
        if(date1[0] <= date2[0]){
            if(date1[1] <= date2[1]){
                if(date1[2] <= date2[2]){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }

    const changeDate = (e) => {
        
        console.log('dateState:', dateState)
        console.log('diffData:', diffData)
        if(diffData===false){
            const date = moment(dateState).format('YYYY-MM-D');
            setDiffData(true);
            setDiffData1(date);
            console.log('date:', date)
            setValues(moment(dateState).format('D/M/YYYY'));
            console.log("moment(dateState).format('MMMM Do YYYY'):", moment(dateState).format('D/M/YYYY'))
            console.log('values:', values)
        }
        else if(diffData===true){
            const date2 = moment(dateState).format('YYYY-MM-D');
            if(isBefore(diffData1,date2)){
                setDateState(e);
                console.log("diff",isBefore(diffData1,date2));
                setNewDate(moment(dateState).format('D/M/YYYY'));
                console.log("moment(dateState).format('MMMM Do YYYY'):", moment(dateState).format('D/M/YYYY'))
            }else if(isBefore(diffData1,date2) === false){
                setDateState(e);
                console.log("err",isBefore(diffData1,date2));
                alert(`Enter a date after ${diffData1}`);
                return;
            }
        }
       
    }
console.log('values:', values)

    const handleDateSelect=(e)=>{
        console.log('e:', e)
    }
    return (
        <>
            <Header/>
            <DateContainer className='dateContainer' bgm={currentTheme.backgroundColor} colour={currentTheme.textColor}>
                <div key={nanoid()} className='sideBar'>
                    <div  key={nanoid()}>
                        <p>Last 7 days</p>
                    </div>
                    <div  key={nanoid()}>
                        <p>Last 14 days</p>
                    </div>
                    <div  key={nanoid()}>
                        <p>Last 30 days</p>
                    </div>
                    <div key={nanoid()}>
                        <p>Last 3 months</p>
                    </div>
                    <div key={nanoid()}>
                        <p>Last 12 months</p>
                    </div>
                    <div key={nanoid()}>
                        <p>Month to date</p>
                    </div>
                    <div key={nanoid()}>
                        <p>Quarter to date</p>
                    </div>
                    <div key={nanoid()}>
                        <p>All time</p>
                    </div>
                    <div key={nanoid()}>
                        <p>Custom</p>
                    </div>
                </div>
                <div key={nanoid()} className='startDateDiv'>
                    <Calendar  key={nanoid()} value={dateState}
                    onChange={changeDate}/>   
                    <div  key={nanoid()} className='inputDiv'>
                        <InputBoxes length={2} selectedPick={values} secondPick={newDate} onChange={(val)=>setValues(val)} perBox={8} label={"Input boxes"}/>
                    </div>
                </div>
                <div  key={nanoid()} className='endDateDiv'>
                    <Calendar  key={nanoid()}  value={dateState}  onChange={changeDate} /> 
                    <div  key={nanoid()} className='buttonDiv' style={{marginTop:"15%",marginLeft:"20%"}}>
                        <Button  key={nanoid()} variant="contained" onClick={()=>{
                            setValues("");
                            setNewDate("");
                        }}
                        style={{width: "75%",backgroundColor:"grey"}}
                        >Cancel</Button>
                        <Button  key={nanoid()} variant="contained" 
                        onClick={()=>{
                            alert("Successfully submitted!")
                            setValues("");
                            setNewDate("");
                        }}
                        style={{width: "75%",backgroundColor:"#724AEB"}}>Set Date</Button>
                    </div>
                </div>
            </DateContainer>
        </>
    )
}