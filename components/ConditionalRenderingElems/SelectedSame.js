import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';


const SelectedSame = React.forwardRef((props, ref) => {
    return(
        <>
            <div style={{"width":"300px","margin":"auto", "marginTop": "13px"}}>
            <div style={{"width":"100px","height":"100px","margin":"0 35%","textAlign":"center"}}>
                <img src={props.selectedProductImage} alt=""/>
                <Typography style={{ "fontSize": "12px"}} variant="h6">{props.selectedProductTitle}</Typography>

            </div>
            </div>
            <Button style={{ float: "right" }} disabled={true} variant="contained" color="primary">
            Already Applied
            </Button>
        </>
    )
})

export default SelectedSame