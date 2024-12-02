export const connectWebSocket = (onMessage) => {

    const socket = new WebSocket("wss://echo.websocket.events"); // Replace this URL with the actual server URL when ready
  
    // When the WebSocket connection opens
    socket.onopen = () => {
      console.log("WebSocket connection opened");
  
      
      setTimeout(() => {
        const mockMessages = [
          { event: "chat", message: "Hello, how are you?" },
          { event: "notification", message: "You have a new follower!" },
          { event: "update", message: "Your profile has been updated." },
          { event: "alert", message: "This is an alert!" },
          { event: "system", message: "System maintenance tonight." },
        ];
  
        
        mockMessages.forEach((data) => onMessage(data));
      }, 4000);
    };
  
    
    socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); 
          onMessage(data); 
        } catch (error) {
          console.error("Received invalid JSON:", event.data);
        }
      };
      
  

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    return socket;
  };
  