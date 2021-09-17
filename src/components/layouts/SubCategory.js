import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Menus from './Menus';
import {DishList} from '../../store/actions/itemAction'
import Loader from 'react-loader-spinner'



class SubCategory extends Component {
    state = { 

     }
     componentDidMount(){
         const{categoryId} = this.props
         let id;
         if(categoryId === ""){
            id = "363079077400219648"
         }
         else{
             id = categoryId
         }
        this.props.DishList(id)
     }
     

    render() { 
        const {dishes, loading} = this.props
        let dishlist;

        if(!dishes || dishes.length === 0){
            dishlist = <p className="center">You have no dishes for this category</p>
        }else{
            dishlist = dishes.map(dish=>{
                let btnAdd;
                if(dish.clearStatus === 1){
                    btnAdd = <Link to={`/item/${dish.id}`} className="btn blue darken-3 z-depth-0" style={{marginTop: 20}} >Add</Link>  
                }
                else{
                    btnAdd = <Link to={`/item/${dish.id}`} className="btn blue darken-3 z-depth-0 disabled" style={{marginTop: 20}} >Sold Out</Link>  
                }
                return(
                    <div key={dish.id} className="col s12 m6 l4">
            <div className="card small hoverable">
                 <div className="card-image">
                     <img src={dish.largeImgList} className="responsive-img" alt={dish.name} />
                     {/* <Link to={`item/${dish.id}`} className="btn-floating halfway-fab btn-large blue darken-3 z-depth-0"><i className="material-icons">add_shopping_cart</i></Link> */}
                 </div>
                     <div className="card-content">
                         <div className="row">
                             <div className="col s7 l6">
                             <p style={{fontWeight: 500, fontSize: 18}} className="">{dish.name}</p>
                             </div>
                             <div className="col s5 l6 right-align">
                                 <p style={{fontWeight: 600}}>{`$${dish.marketPrice}`}</p>
                                 {btnAdd}
                             </div>
                         </div>

                        </div>
                        {/* <div className="card-action">
                            <div className="right-align">
                             <Link to={`/item/${dish.id}`} className="btn blue darken-3 z-depth-0" >Details</Link>
                            </div>
                        </div> */}
                </div>
             </div>
                )
             })
        }

      
        return ( 
            <div className="container">

                <Menus />
                                  
                <div style={{marginTop: 20}} className="row">
                    { loading ? <Loader
                    type="Oval"
                    color="#1565C0"
                    height={50}
                    width={50}
                    className="center"
                    /> : dishlist}
                </div>
                    
                {/* <ul style={{marginTop: 10}} className="tabs tabs-fixed-width tab-demo z-depth-1">
                    <li className="tab" onClick={() => this.clickMe()}><a href="#test1">Test 1</a></li>
                    <li className="tab"><a href="#test2">Test 2</a></li>
                    <li className="tab"><a href="#test4">Test 4</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                </ul>
                <div id="test1" className="col s12"><p>Test 1</p></div>
                <div id="test2" className="col s12"><p>Test 2</p></div>
                <div id="test4" className="col s12"><p>Test 4</p></div>
                <div id="test0" className="col s12"><p>Test 5</p></div> */}

              
            </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        dishes: state.item.dishlist,
        loading: state.item.loading,
        categoryId : state.item.categoryId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        DishList : (id) => dispatch(DishList(id)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);