import React from "react";

export default function cartReducer( cart, action ) {
    switch ( action.type ) {
        case 'empty':
            return [];
        case 'add':
            const { id, sku } = action;
            const itemInCart = cart.find((i) => i.sku === sku);
            if (itemInCart) {
                // Return new array with the matching item replaced
                return cart.map((i) =>
                    i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                // Return new array with the new item appended
                return [...cart, { id, sku, quantity: 1 }];
            }

        default:
            throw new Error('Unhandled action ' + action.type);
    }

}