const initState = {
    shopDetails: {},
    waiting: false
}

const shopReducer = (state = initState, action) =>{
   switch(action.type){
    case 'SHOP_INFO':
        return{
            ...state,
            shopDetails: action.result,
        }
    default:
        return state
   }
}

export default shopReducer;