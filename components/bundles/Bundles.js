import GetAllBundles from '../../API-instances/GetAllBundles'
import React from 'react'

export default class Bundles extends React.Component {
    // constructor(){
    //     super();
    //     this.state = {bundles: []}
    // }

    // componentDidMount() {
    //     GetAllBundles({
    //         method: "GET"
    //     }).then(({ res: bundles }) => {
    //         this.setState({ bundles })
    //     })
    // }
    render() {  
        
        return(
            <div>   
               {listItems}
            </div>
        )
    }
}