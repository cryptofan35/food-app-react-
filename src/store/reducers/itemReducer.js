import { v4 as uuidv4 } from 'uuid';

const initState = {
    dishattr: [],
    loading: false,
    category: [],
    dishlist: [],
    dishMenuById: [],
    ingredients: [],
    packFee: 0,
    count: 1,
    price : 0,
    ingredientPrice: 0,
    pricesum: 0,
    addedItems: [],
    total: 0,
    categoryId: '',
    OrderDetails: {},
    order_msg: '',
    order_error: '',
    Rapyd: {},
    redirect_url: '',
    status: '',
}

const itemReducer = (state = initState, action) =>{
    switch(action.type){
        case 'Loading' :
            return{
                ...state,
                loading: true
            }
        case 'MENUS' :
            return {
                ...state,
                category: action.result
            }
        case 'DISH_LIST' :
            return{
                ...state,
                dishlist: action.dishes,
                loading: false
            }
        case 'dishMenuById' :
            return{
                ...state,
                dishMenuById: action.result,
                count: 1,
                ingredientPrice: 0,
                price: action.result[0].price/100,
                pricesum: action.result[0].price/100,
                dishattr: action.result[0].attrs,
                ingredients: action.result[0].supplyCondiments,
                loading: false
            }
        case 'MENU' :
            return{
                ...state,
                categoryId: ""
            }
        case 'BACK_TO_MENU' :
            return{
                ...state,
                categoryId : action.id
            }
        case 'INCREMENT' :
            return{
                ...state,
                count: state.count + 1
            }
        case 'MULTIPLYPRICE' :
            return{
                ...state,
                pricesum: (state.price * state.count) + (state.count * state.ingredientPrice)
            }
        case 'DECREMENT' :
            return{
                ...state,
                count: state.count - 1
                }
        case 'DIVIDEPRICE' :
          return{
                ...state,
                pricesum: (state.price * state.count) + (state.count * state.ingredientPrice)
            }
        case 'INGREDIENT_SUM':
            let ingredient = state.ingredients.find(ing => ing.id.toString() === action.id.toString())
            let ingredientPrice = ingredient.marketPrice / 100
            return{
                ...state,
                ingredientPrice: state.ingredientPrice + ingredientPrice,
                pricesum: state.pricesum + (state.count * ingredientPrice)
            }
        case 'INGREDIENT_DEDUCT':
            let ingredientDeduct = state.ingredients.find(ing => ing.id.toString() === action.id.toString())
            console.log(ingredientDeduct)
            let ingredientDeductPrice = ingredientDeduct.marketPrice / 100
            return{
                ...state,
                ingredientPrice: state.ingredientPrice - ingredientDeductPrice,
                pricesum: state.pricesum - (state.count * ingredientDeductPrice)
            }
        case 'ADD_TO_CART' :
            let addedItem = state.dishlist.find(dish=> dish.id.toString() === action.id.toString())
            addedItem.quantity = state.count;
            addedItem.ingredientPrice = state.ingredientPrice
            addedItem.selectedToppings = action.selectedOption
            addedItem.selectedAddons = action.selectedChecked
            addedItem.boxQtySum = addedItem.boxQty * state.count
            addedItem.tpId = addedItem.id
            addedItem.price = addedItem.marketPrice * 100
            addedItem.packagePrice = addedItem.boxQty * 10
            addedItem.packageQuantity = state.count
            addedItem.totalFee = (addedItem.price + addedItem.packagePrice) * state.count
            addedItem.remark = action.specs
            addedItem.uniqueId = uuidv4()
            // get packaging fees
            const fees = addedItem.boxQtySum * 10 * 0.01
            //calculating the total
            let newTotal = state.total + state.pricesum + fees  
            let newPackFee = state.packFee + fees    
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total : parseFloat(newTotal.toFixed(2)),
                    packFee : parseFloat(newPackFee.toFixed(2)),
                }
        case 'REMOVE_FROM_CART' :
            let removedItem = state.addedItems.filter(item=> item.uniqueId !== action.id)
            let addedValue = state.addedItems.find(dish=> dish.uniqueId === action.id)
            let removedFees = addedValue.boxQtySum * 10 * 0.01
            let totalcalc = (addedValue.marketPrice * addedValue.quantity) + (addedValue.quantity * addedValue.ingredientPrice) + removedFees
            let removedTotal = state.total - totalcalc
            let PackFee =  state.packFee - parseFloat(removedFees.toFixed(2))
            return{
                ...state,
                addedItems : removedItem,
                total: parseFloat(removedTotal.toFixed(2)),
                packFee: parseFloat(PackFee.toFixed(2))
            }
        case 'OrderDetails' :
            return{
                ...state,
                loading: false,
                OrderDetails: action.result.result,
                order_msg: action.result.message
            }
        case 'OrderError':
            return{
                ...state,
                loading: false,
                order_error: "No item added to cart"
            }
        case 'Rapyd':
            return{
                ...state,
                Rapyd: action.result,
                status: action.result.status.status,
                redirect_url: action.result.data.redirect_url
            } 
        default:
            return state
    }
}


export default itemReducer;