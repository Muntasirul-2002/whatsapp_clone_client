import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "../store/index";
import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";
const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (userInfo) {
      socket.current = io(SERVER_URL, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceivedMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          
        } = useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        
      };
      const handleReceivedChannelMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList } =
          useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        addChannelInChannelList(message)
      };
      socket.current.on("receivedMessage", handleReceivedMessage);
      socket.current.on(
        "receive-channel-message",
        handleReceivedChannelMessage
      );
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
