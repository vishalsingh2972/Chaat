import { useState, useRef } from "react";
import "./styles/App.css"
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

const cookies =  new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  {console.log(isAuth)}
  const [room, setRoom] = useState(null);

  const roomInput = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token")//remove cookies after user gets logged out

    //similarly change other functionalities also to default values after user gets logged out
    setIsAuth(false);
    setRoom(null);
  }

  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }

  return (
    <>
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
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App;