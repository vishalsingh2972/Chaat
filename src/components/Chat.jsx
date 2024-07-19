export const Chat = () => {
  return (
    <div className="chat-app">
      <form className="new-message-form">
        <input className="new-message-input" placeholder="Type your message here..."/>
        <button type="submit" className="send-button"> Send 🥂</button>
      </form>
    </div>
  )
}