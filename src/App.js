import { useState, useRef } from "react";
import "./styles/App.css"
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";

const cookies =  new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  {console.log(isAuth)}
  const [room, setRoom] = useState(null);

  const roomInput = useRef(null);

  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }

  return (
    <div>
      {room ? 
        <div>
          <Chat room={room}/>
        </div> 
        : 
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInput}/>
          <button onClick={() => setRoom(roomInput.current.value)}>Enter Chat</button>
        </div>
      }
    </div>
  )
}

export default App;