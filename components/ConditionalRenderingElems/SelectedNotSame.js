import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ApplyRecommendation from '../../API-instances/ApplyRecommendation'


const SelectedNotSame = React.forwardRef((props, ref) => {
    const handleApply = () => {
        ApplyRecommendation({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "bundleId": props.bundleID
            }
        }).then((res) => {
            props.changeSelect()
        })
    }

    return(
        <>
            <div style={{"width":"300px","margin":"auto", "marginTop": "13px"}}>
            <div style={{"width":"100px","float":"left","height":"100px", "margin": "0 18px", "textAlign": "center"}}>
                <img src={props.selectedProductImage} alt=""/>
                <Typography style={{ "fontSize": "12px"}} variant="h6">{props.selectedProductTitle}</Typography>
            </div>
            <div style={{"width":"0","float":"left","height":"100px","margin":"0 10px","textAlign":"center","paddingTop":"21px"}}>
            <DoubleArrowIcon />
            </div>
            <div style={{"width":"100px","float":"right","height":"100px", "textAlign": "center"}}>
            <img src={props.recommendationImage} alt=""/>
                <Typography style={{ "fontSize": "12px"}} variant="h6">{props.recommendationTitle}</Typography>
            </div>
            </div>
            <Button style={{ float: "right" }} onClick={handleApply} variant="contained" color="primary">
            Apply
            </Button>
        </>
    )
})

export default SelectedNotSame