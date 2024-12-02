import { configureStore, createSlice } from "@reduxjs/toolkit";


const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    eventMessages: {}, 
  },
  reducers: {
    addMessage: (state, action) => {
      const { event, message } = action.payload;
      if (!state.eventMessages[event]) {
        state.eventMessages[event] = [];
      }
      state.eventMessages[event].push(message);
    },
  },
});


export const { addMessage } = messagesSlice.actions;


const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});

export default store;
