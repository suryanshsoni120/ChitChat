import React, { useState, useEffect } from "react";
import {
  client,
  databases,
  DATABASE_ID,
  COLLECTION_ID,
} from "../appwrite/appwriteConfig";
import { ID, Query, Permission, Role } from "appwrite";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { CgTrash } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [...prevState, response.payload]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderAsc("$createdAt"),
      Query.limit(100),
    ]);
    setMessages(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const permissions = [Permission.write(Role.user(user.$id))];

    const payload = {
      user_id: user.$id,
      user_name: user.name,
      body: messageBody,
    };

    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload,
      permissions
    );
    setMessageBody("");

    // Scroll to bottom of chat window after submitting a message to see the latest message
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const deleteMessage = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  };

  return (
    <main className="m-auto max-w-xl pt-10">
      <img
        src="/icon.png"
        className="w-40 h-40 items-center justify-center m-auto pb-4"
        alt="Logo"
      />
      <Header />
      <div className="p-8 bg-[#f5f5f5] border-2 border-solid rounded-b-xl shadow-xl border-[#282939]">
        <div id="chat-window" className="h-96 overflow-y-scroll">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.$id}
                className="flex flex-wrap flex-col m-4 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <p>
                    {message?.user_name ? (
                      <span> {message?.user_name}</span>
                    ) : (
                      "Anonymous user"
                    )}

                    <small className="ml-4 text-[#a4a1a1]">
                      {" "}
                      {new Date(message.$createdAt).toLocaleString()}
                    </small>
                  </p>

                  {message.$permissions.includes(
                    `delete("user:${user.$id}")`
                  ) && (
                    <CgTrash
                      className="cursor-pointer text-blue-400 transition duration-300 ease-in-out hover:text-[#db1a5a]"
                      size={24}
                      onClick={() => deleteMessage(message.$id)}
                    />
                  )}
                </div>

                <div
                  className={
                    "text-[#e2e3e8] bg-[#db1a5a] w-fit rounded-xl p-4 break-words" +
                    (message.user_id === user.$id
                      ? " border border-solid border-[#db1a5a] bg-[#f5f5f5] text-black"
                      : "")
                  }
                >
                  <span>{message.body}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxlength="250"
              placeholder="Type something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
              className="bg-[#e2e3e8] text-[#282939] rounded-xl p-4 w-full resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <input
              className="bg-blue-600 hover:bg-blue-900 text-[#f5f5f5] rounded-xl cursor-pointer p-4 text-xl transition duration-300 ease-in-out"
              type="submit"
              value="SEND"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Chat;
