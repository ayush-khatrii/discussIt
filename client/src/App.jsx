import { Routes, Route, useFetcher } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import ChatPage from "./components/chats/ChatPage";
import SignInPage from "./components/signin/SignInPage";
import SignUpPage from "./components/signup/SignUpPage";
import SingleChatPage from "./components/chats/SingleChatPage";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile/Profile";
import useAuthStore from "./store/store";

const App = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      <Toaster />
      <div className='app'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={
            isLoggedIn ?
              <ChatPage /> : <SignInPage />
          } />
          <Route path="/chats/:chatId" element={<SingleChatPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={
            isLoggedIn ? <Profile /> : <SignInPage />
          } />
        </Routes>
      </div>
    </>
  )
}
export default App;