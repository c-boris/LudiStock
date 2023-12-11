import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
const ws = new WebSocket("ws://localhost:3001/cable");
function Chat() {
  const messageUrl = "http://localhost:3001/messages";
  const [messages, setMessages] = useState([]);
  const [user] = useAtom(userAtom);
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: user.id,
          channel: "MessagesChannel",
        }),
      })
    );
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (!["ping", "welcome", "confirm_subscription"].includes(data.type)) {
      setMessages(() => [...messages, data.message]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target.message.value;
    e.target.message.value = "";

    await fetch(messageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body, user_id: user.id }),
    });
  };

  const fetchMessages = async () => {
    const response = await fetch(messageUrl); //remplacer message en fonction de l'item, fetch sur channel de l'item et du user.
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto mt-20">
      <div className="bg-blue-500 p-4 text-white flex justify-center items-center">
        <button id="login" className="hover:bg-blue-400 rounded-md p-1">
          {/* ... Votre SVG ou icône */}
        </button>
        <span>Chat App</span>
        <p>{user.id}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4" id="messages">
        {messages.map((message) => (
          <div
            className={`flex ${user.id == message.user_id && "justify-end"}`}
            key={message.id}
          >
            <div
              className={`${
                user.id == message.user_id ? "bg-green-200" : " bg-blue-200"
              } text-black p-2 rounded-lg max-w-xs mb-2`}
            >
              <p>{message.body}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="bg-white p-4 flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          name="message"
        />
        <button
          className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
          type="submit"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Chat;
