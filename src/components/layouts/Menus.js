import React, { Component } from 'react';
import {connect} from 'react-redux'
import M from 'materialize-css';
import {Menus} from '../../store/actions/itemAction'
import {DishList} from '../../store/actions/itemAction'



class Menu extends Component {
    state = { 

     }

     componentDidMount(){
        this.props.Menus()
     }
     componentDidUpdate(){
        let tabs = document.querySelector('.tabs');
        M.Tabs.init(tabs, {});
     }
     menuClick = (id) =>{
        this.props.DishList(id)
     }
     

    render() { 
        const {categories} = this.props
          const menutab = categories.length ? (
            categories.map(category=>{

                return (
                    <li className="tab" key={category.id} onClick={() => this.menuClick(category.id)}>
                    <a href={`#${category.id}`} >{category.name}</a>
                </li> 
                )
            })
        ) : (
            <p className="center">Loading Menu Items...</p>
        )
        return (
            <React.Fragment>
                    <div className="fixedElement">
                        <ul style={{marginTop: 20}} className="tabs tabs-fixed-width tab-demo z-depth-1">
                            {menutab}
                        </ul>
                    </div>
            </React.Fragment>
          );
    }
}

const mapStateToProps = (state) =>{
    return{
        categories: state.item.category
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Menus : () => dispatch(Menus()),
        DishList : (id) => dispatch(DishList(id))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Menu);