import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"; //addDoc function is used to create and add new data to a collection in our Firestore database. Basically, it allows us to send new documents (rows of data) to our Firestore database. //addDoc helps us to add a document to our collection that we have already created in our firebase database
import { db, auth } from "../config/firebase";
import "../styles/Chat.css";

export const Chat = (props) => {
  const {room} = props;

  const [newMessage, setNewMessage] = useState(); //this state will represent what user is typing in the <input> below
  const [messages, setMessages] = useState([]);

  //reference to the 'messages' collection that we created in our firebase database
  const messagesRef = collection(db, "messages");
  
  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), /*orderBy("created_at")*/);
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})  
      })
      setMessages(messages);
    })

    return() => unsubscribe();
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents the page from reloading after the form is submitted
    // console.log(event)
    // console.log(newMessage);
    // console.log(auth.currentUser);

    //first check if message is empty or not, as we don't want to send empty messages to our db
    if(newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      created_at: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room
    });
    //make message text empty once message is sent
    setNewMessage("");
  }

  return (
    <div className="chat-app">
      <div className="header">Welcome to {room.toUpperCase()}</div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user} :</span>
            {message.text}
          </div>
          ))
        }
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input 
          className="new-message-input" 
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">Send ▶</button>
      </form>
    </div>
  )
}