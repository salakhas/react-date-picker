import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { PinItem } from "./PinItem";
import {nanoid} from "nanoid";

export const InputBoxes = ({length,selectedPick,secondPick,label,perBox,onChange}) => {
    const [values,setValues] = useState(new Array(length).fill(""));
    const elements =  useRef(new Array(length).fill(0));

    const handleChange = (value,i) =>{
        console.log(value,i);
        const val = [...values];
        val[i] = value;
        setValues(val);
        if(value.length>0 && value.length===perBox && i < length-1){
            elements.current[i+1].focus();
        }
        onChange(val.join(""))
    }

    const handleBackspace = (value,i) => {
        if(i>0){
            elements.current[i-1].focus();
        }
        const val = [...values];
        val[i] = value;
        setValues(val);
    }

    useEffect(()=>{
        console.log(elements)
    });

    const handlePaste = (e) => {
        e.preventDefault();
        console.log('e.clipboardData.getData("Text"):', e.clipboardData.getData("Text"))
        let clipboardDatas = e.clipboardData.getData("Text");
        clipboardDatas = clipboardDatas.split('');
        console.log('clipboardDatas:', clipboardDatas)
        console.log('clipboardDatas.length:', clipboardDatas.length)
        if(clipboardDatas.length>5){
            return;
        }
        else if(clipboardDatas.length===5){
            console.log("hi")
            setValues([...clipboardDatas])
            for(let i=0; i<clipboardDatas.length; i++){
                console.log('i:', i)
                elements.current[i].value=clipboardDatas[i];
                console.log('elements.current[i].value', elements.current[i].value)
            }
           // setValues([...clipboardDatas])
           for(let k=0; k<clipboardDatas.length; k++){
               elements.current[k].style.border="3px solid green";
           }
           elements.current[length-1].focus();
            console.log('values:', values)
        }
        else if(clipboardDatas.length < 5){
            console.log("hi")
           
            const diff = length - clipboardDatas.length;
            for(let j=0; j<diff; j++){
                clipboardDatas.push('');
            }
            setValues([...clipboardDatas])
            for(let i=0; i<length; i++){
                console.log('i:', i)
                
                elements.current[i].value=clipboardDatas[i];
                
                
                console.log('elements.current[i].value>>>', elements.current[i].value)
            }
            console.log('length-diff:', length-diff)
           elements.current[length-diff].focus();
            console.log('values:', values)
        }
    }
    useEffect(()=>{
        elements.current[0].value = selectedPick;
        elements.current[1].focus();
    },[selectedPick])

    useEffect(()=>{
        elements.current[0].value = selectedPick;
        console.log('secondPick:', secondPick)
        elements.current[1].value = secondPick;
    },[secondPick])
    return (
        <>
            <div onPaste={handlePaste} key={nanoid()} style={{marginTop:"15%",marginLeft:"20%"}}>
                {values.map((item,i)=> (
                    <>
                        <PinItem key={i}
                    ref={(n) => (elements.current[i] = n)}
                    onChange={(e)=>handleChange(e,i)}
                    onBackspace={(e)=>handleBackspace(e,i)}
                    max={perBox}/>
                    </>
                )
                
                
                )}
            </div>
        </>
    )
}

InputBoxes.propTypes = {
    length: PropTypes.number.isRequired,
    perBox: PropTypes.number,
    label: PropTypes.string
};

InputBoxes.defaultProps = {
    label: "Label",
    perBox: 1
}