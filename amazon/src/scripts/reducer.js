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
        subtotal += item.quantity * item.content.price;
    }
    return subtotal;
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// this function returns the result of adding two baskets together
const addTwoBaskets = (b1, b2) => {
    let bigBasket;
    let smallBasket;
    if (b1.length >= b2.length) {
        bigBasket = b1;
        smallBasket = b2;
    } else {
        bigBasket = b2;
        smallBasket = b1;
    }

    for (let i = 0; i < bigBasket.length; i++) {
        let found = false;
        for (let j = 0; j < smallBasket.length; j++) {
            if (bigBasket[i].content.id == smallBasket[j].content.id) {
                smallBasket[j].quantity += bigBasket[i].quantity;
                found = true;
            }
        }
        if (!found) {
            smallBasket.push(bigBasket[i]);
        }
    }
    return smallBasket;
}

const reducer = (state, action) => {
    switch (action.type) {
        // set the searched for value
        case 'SET_SEARCH':
            return {
                ...state,
                searchInput: action.value,
            }
        case 'SET_BASKET':
            return {
                ...state,
                basket: action.basket,
            }
        // add product to basket
        case 'ADD_TO_BASKET':
            let newBasket_ADD_TO_BASKET = [...state.basket];
            for (let i = 0; i < newBasket_ADD_TO_BASKET.length; i++) {
                if (newBasket_ADD_TO_BASKET[i].content.id == action.item.id) {
                    newBasket_ADD_TO_BASKET[i].quantity += 0.5; // reducer is called twice, idk why (should be "+= 1")
                    return {
                        ...state,
                        basket: newBasket_ADD_TO_BASKET,
                    }
                }
            }
    
            return {
                ...state,
                basket: [...state.basket, {quantity: 1, content: action.item}],
            }
        // change the quantity of an item in the basket
        case 'CHANGE_QTY':
            let newBasket_CHANGE_QTY = [...state.basket];
            for (let i = 0; i < newBasket_CHANGE_QTY.length; i++) {
                if (newBasket_CHANGE_QTY[i].content.id == action.id) {
                    newBasket_CHANGE_QTY[i].quantity = action.quantity;
                    return {
                        ...state,
                        basket: newBasket_CHANGE_QTY,
                    }
                }
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            }
        // remove item from basket
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.content.id === action.id
            );
            let newBasket_REMOVE_FROM_BASKET = [...state.basket];
            if (index >= 0) {
                newBasket_REMOVE_FROM_BASKET.splice(index, 1);
            } else {
                console.warn('Cannot remove product!');
            }

            return {
                ...state,
                basket: newBasket_REMOVE_FROM_BASKET,
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
        // opens or closes popup for address input
        case 'OPEN_POPUP':
            return {
                ...state,
                popup: action.popup,
            }
        default:
            return state;
    }
};

export { reducer, getBasketSubtotal, addTwoBaskets, validateEmail, initialState };