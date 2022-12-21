const initialState = {
    basket: [],
    user: null,
}

const getBasketSubtotal = (basket) => {
    let subtotal = 0.0;
    for (let item of basket) {
        subtotal += item.price;
    }
    return subtotal;
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET': 
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            console.log(index);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn('Cannot remove product!');
            }

            return {
                ...state,
                basket: newBasket,
            }
        case 'SET_USER': 
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }   
};

export { reducer, getBasketSubtotal, initialState };