import React, { Component } from 'react';
import M from 'materialize-css';


class DeliveryOptions extends Component {
    state = { 
        value: 'Self Pickup',
        showOption: false
     }

     componentDidMount(){
        let select = document.querySelectorAll('select');
      M.FormSelect.init(select, {})
     }
     componentDidUpdate(){
        let select = document.querySelectorAll('select');
        M.FormSelect.init(select, {})
     }
     handleChange = (e) =>{
         this.setState({
             value: e.target.value
         })
         if(e.target.value === "Delivery"){
             this.setState({
                 showOption: true
             })
         }
         else if(e.target.value === "Self Pickup"){
            this.setState({
                showOption: false
            })
         }
     }

    render() { 
        return ( 
            <div className="container" style={{marginTop: 20}}>
                <div className="row">
                    <div className="col s12 l6">
                        <div className="input-field">
                            <select value={this.state.value} onChange={this.handleChange}>
                            <option value="Self Pickup" defaultValue>Self Pickup</option>
                            <option value="Delivery">Delivery</option>
                            </select>
                            <label>Select dining preference</label>
                        </div>
                    </div>
                    <div className="col s12 l6">
                        <div className="input-field">
                            <select>
                            <option value="asap" defaultValue>ASAP</option>
                            </select>
                            <label>Timing</label>
                        </div>
                    </div>
                    {this.state.showOption && (
                         <div className="col s12 l12">
                         <div className="input-field">
                                 <select>
                                 <option value="addr1" defaultValue>Victor's Kitchen @ Sunshine Plaza 91 Bencoolen Street, 01-49, Singapore, 189652</option>
                                 <option value="addr2">Victor's Kitchen @ Chinatown Point 133 New Bridge Rd, Chinatown Point, B1-33, Singapore, 059413</option>
                                 <option vlaue="addr3">290A BISHAN STREET 24 MULTI STOREY CAR PARK, Singapore, 571290</option>
                                 <option value="new">Add new</option>
                                 </select>
                                 <label>Delivery Address</label>
                             </div>
                     </div>

                    )}
                </div>
            </div>
         );
    }
}
 
export default DeliveryOptions;