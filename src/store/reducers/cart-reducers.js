export function addItem(state, item) {
    const updatedTotalAmount =
      state.totalAmount + item.payload.price * item.payload.amount;

    const existingCartItemIndex = state.products.findIndex(
      (product) => product.payload.id === item.payload.id
    );
    const existingCartItem = state.products[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      existingCartItem.payload.amount =
        existingCartItem.payload.amount + item.payload.amount;
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = existingCartItem;
    } else {
      updatedItems = state.products.concat(item);
    }

    state.products = updatedItems;
    state.totalAmount = updatedTotalAmount;
};

export function removeItem(state, item) {
    const existingCartItemIndex = state.products.findIndex(
      (product) => product.payload.id === item.payload.id
    );
    const existingCartItem = state.products[existingCartItemIndex];
    const updatedTotalAmount =
      state.totalAmount - existingCartItem.payload.price;
    let updatedItems;
    if (existingCartItem.payload.amount === 1) {
      updatedItems = state.products.filter(
        (product) => product.payload.id !== existingCartItem.payload.id
      );
    } else {
      existingCartItem.payload.amount = existingCartItem.payload.amount - 1;
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = existingCartItem;
    }
    state.products = updatedItems;
    state.totalAmount = updatedTotalAmount;
}
  
export function clearCart(state) {
    state.products = [];
    state.totalAmount = 0;
  }