import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ApplyNewRecommendation from '../../API-instances/ApplyNewRecommendation'


const NewRecomNotSame = React.forwardRef((props, ref) => {
    const handleApply = () => {
        ApplyNewRecommendation({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "bundleId": props.bundleID
            }
        }).then((res) => {
            props.changeRecoms()
        })
    }

    return(
        <>
            <div style={{"width":"300px","margin":"auto", "marginTop": "13px"}}>
            <div style={{"width":"100px","float":"left","height":"100px", "margin": "0 18px", "textAlign": "center"}}>
                <img src={props.Recom.Image} alt=""/>
                <Typography style={{ "fontSize": "12px"}} variant="h6">{props.Recom.Title}</Typography>
            </div>
            <div style={{"width":"0","float":"left","height":"100px","margin":"0 10px","textAlign":"center","paddingTop":"21px"}}>
            <DoubleArrowIcon />
            </div>
            <div style={{"width":"100px","float":"right","height":"100px", "textAlign": "center"}}>
            <img src={props.newRecomInfo.Image} alt=""/>
                <Typography style={{ "fontSize": "12px"}} variant="h6">{props.newRecomInfo.Title}</Typography>
            </div>
            </div>
            <Button style={{ float: "right" }} onClick={handleApply} variant="contained" color="primary">
            Apply
            </Button>
        </>
    )
})

export default NewRecomNotSame