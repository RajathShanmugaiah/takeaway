import React,{useState,useEffect} from "react";
import {
    Dialog,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography
  } from '@material-ui/core';
  import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { CloseRounded } from '@material-ui/icons';
import DateAndTime from "./datepicker";

const FirstModal = ({ open}) =>{
    const [step, setstep] = useState(1);

    useEffect(() => {
      setstep(1);
    }, [open])
  
    return(
        <Dialog open={open}>
            <DateAndTime />
        </Dialog>
    )
}
export default FirstModal