import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './reducers/counterSlice'

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
})