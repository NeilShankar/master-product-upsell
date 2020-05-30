import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';


const NewRecomSame = React.forwardRef((props, ref) => {
    return(
        <>
            <div style={{"width":"300px","margin":"auto", "marginTop": "13px"}}>
                <Typography style={{ fontSize: "1.2em"}} variant="h6">No New Recommendations Yet 😢</Typography>
            </div>
            <Button disabled={true} style={{ float: "right" }} variant="contained" color="primary">
                Apply
            </Button>
        </>
    )
})

export default NewRecomSame