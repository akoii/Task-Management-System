import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../AuthStore/Auth"
const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store