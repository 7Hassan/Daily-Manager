

import Nav from "../components/nav";
import { Title } from "../utils/funcs";


const Chat = () => {
  return <main>
    <Title title='DM - Chat' />
    <div className="main-container">
      <Nav page='chat' />
      <div className="main">
        <div className="container">
          chat
        </div>
      </div>
    </div>
  </main >
};

export default Chat;
