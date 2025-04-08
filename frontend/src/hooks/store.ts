import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authenticationReducer } from "./authenticate/useAuthenticatinReducer";
import { providerReducer } from "./web3/providerReducer";
import { governorContractReducer } from "./web3/dao/governorContractReducer";
import { jaelTokenReducer } from "./web3/dao/JAELTokenReducer";

const middleware = [thunk];

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    provider: providerReducer,
    gc: governorContractReducer,
    jt: jaelTokenReducer,
  },
  middleware,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
