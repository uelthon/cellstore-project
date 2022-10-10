import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import notiReducer from "./reducers/notiReducer";
import productsReducer from "./reducers/productsReducer";
import ordersReducer from "./reducers/ordersReducer";
import pagesReducer from "./reducers/pagesReducer";
import compareReducer from "./reducers/compareReducer";

export default configureStore({
  reducer: {
      user: userReducer,
      notification: notiReducer,
      products: productsReducer,
      orders: ordersReducer,
      pages: pagesReducer,
      compare: compareReducer
  },
})