import { AuthenticationRedux } from "@/types/redux/Authentication";
import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./authentication/slice";

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
    // generalSettings: GeneralSettingsSlice.reducer,
    // shareStore: ShareStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = {
  authentication: AuthenticationRedux;
  // generalSettings: GeneralSettingsStoreTypes
  // shareStore: ShareStoreTypes
};
