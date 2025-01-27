//Sign in with Google page
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css"

const cookies =  new Cookies();

export const Auth = ({setIsAuth}) => {

  const signInWithGoogle = async () => {

    try{
    const result = await signInWithPopup(auth, provider);
    // console.log(result);
    // console.log(result.user.refreshToken);

    cookies.set("auth-token", result.user.refreshToken); //for keeping user logged in even when he refreshes the page or opens a new tab etc., so we create a cookie and store the token in cookie so it remembers not to sign the user out when we refresh the page and the component re-renders
    setIsAuth(true); //for page to redirect after login is done
    }
    catch(error){
      console.error(error);
    }
    
  }

  return(
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}
