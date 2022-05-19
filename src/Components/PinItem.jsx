import { forwardRef } from "react";
import {nanoid} from "nanoid";

const style = {
    height: "45px",
    borderRadius: "10px",
    border: "1px solid grey",
    width: "100px",
    fontSize: 14,
    margin: 5
};


export const PinItem = forwardRef(({onChange,onBackspace,max},ref) => {

    const handleKeyUp = (e) => {
        switch(e.keyCode){
            case 8:{
                if(!e.target.value){
                    onBackspace(e.target.value);
                }
                break;
            }
            case 9:{
                e.preventDefault();
                break;
            }
            default:{
                onChange(e.target.value);
            }
        }
    }

    return(
        <input  key={nanoid()} onKeyUp={handleKeyUp} ref={ref} maxLength={max} style={style} />
    )
})