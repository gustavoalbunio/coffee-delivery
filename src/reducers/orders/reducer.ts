import produce from 'immer'
import { Address, Coffee, Payment } from '../../contexts/OrderContext'
import { ActionTypes } from './actions'

export interface Product extends Coffee {
  quantity: number
}

interface OrderState {
  products: Product[]
  address: Address | null
  payment: Payment | null
}

export function orderReducer(state: OrderState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_PRODUCT: {
      const productIndex = state.products.findIndex(
        (product) => action.payload.product.id === product.id,
      )

      if (productIndex < 0) {
        return produce(state, (draft) => {
          draft.products.push({
            ...action.payload.product,
            quantity: 1,
          })
        })
      }

      return produce(state, (draft) => {
        const newQuantity = draft.products[productIndex].quantity + 1

        draft.products[productIndex] = {
          ...draft.products[productIndex],
          quantity: newQuantity,
        }
      })
    }
    case ActionTypes.REMOVE_PRODUCT: {
      const productIndex = state.products.findIndex(
        (product) => action.payload.productId === product.id,
      )

      if (productIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        const newQuantity = draft.products[productIndex].quantity - 1

        if (newQuantity === 0) {
          draft.products.splice(productIndex, 1)
        } else {
          draft.products[productIndex] = {
            ...draft.products[productIndex],
            quantity: newQuantity,
          }
        }
      })
    }
    case ActionTypes.DELETE_PRODUCT: {
      const productIndex = state.products.findIndex(
        (product) => action.payload.productId === product.id,
      )

      if (productIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.products.splice(productIndex, 1)
      })
    }
    case ActionTypes.ADD_ADDRESS: {
      return produce(state, (draft) => {
        draft.address = action.payload.address
      })
    }
    case ActionTypes.ADD_PAYMENT: {
      return produce(state, (draft) => {
        draft.payment = action.payload.payment
      })
    }

    default:
      return state
  }
}
