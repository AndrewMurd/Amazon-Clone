const initialState = {
    basket: [],
    searchInput: '',
    user: null,
    firstName: null,
    lastName: null,
    address: null,
    popup: false,
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
        case 'SET_SEARCH':
            return {
                ...state,
                searchInput: action.value,
            }
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
        case 'SET_NAME':
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address,
            }
        case 'OPEN_POPUP':
            return {
                ...state,
                popup: action.popup,
            }
        default:
            return state;
    }
};

export { reducer, getBasketSubtotal, initialState };