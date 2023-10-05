import React from "react";
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Button from '@mui/material/Button';
function Main12(){
    return (
        <div>

            
            <div style={{display:'flex',margin:20,justifyContent:'space-between'}}>
            <FilterAltSharpIcon fontSize='large' color='info'  />
            <Button variant='contained' sx={{borderRadius:20,backgroundColor:'#D62828',color: 'white'}}>สร้างธนาคาร</Button></div>
        </div>
    );
}
export default Main12;