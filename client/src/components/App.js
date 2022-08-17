import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.js"
import Signup from "./Signup.js"
import Inbox from "./Inbox.js"

function App() {

  const [currentUser, setCurrentUser] = useState(false) 

  useEffect(() => {
    fetch("/me")
    .then(res => res.json())
    .then((user) => {
      setCurrentUser(user)
    })
  }, []);

  console.log(currentUser)
  // Test user: harry@hmail.com || asdf

  return (

        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
          <Route path="inbox" element={<Inbox currentUser={currentUser} 
          setCurrentUser={setCurrentUser} />} />
        </Routes>

  );
}

export default App;