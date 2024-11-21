

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a different storage option if needed

// Define a configuration for state persistence
const persistConfig = {
   key: "root", // This is the storage key
   storage, // The storage engine to use (e.g., local storage)
   // You can also add blacklist or whitelist options if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer, // Use the persisted reducer
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
         serializableCheck: false,
      });
   },
});

const persistor = persistStore(store); // Create a persistor for your store

export { store, persistor }; // Export the store and the persistor