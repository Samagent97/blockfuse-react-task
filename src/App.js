import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "./store";
import { connectWebSocket } from "./websocket"; 

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.eventMessages);

  
  useEffect(() => {
    const socket = connectWebSocket((data) => {
      const { event, message } = data;
      dispatch(addMessage({ event, message })); 
    });

    return () => {
      socket.close(); 
    };
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>WebSocket + Redux </h1>
      <div>
        
        {Object.entries(messages).map(([event, msgs]) => (
          <div key={event} style={{ marginBottom: "20px" }}>
            <h3>Event: {event}</h3>
            <ul>
              {msgs.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
