// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductContext from "../contextApi/ProductContext";

import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged, signOut, sendEmailVerification } from '../Config/firebaseCongif'

import { db, collection, addDoc, onSnapshot, getDocs, deleteDoc, doc, updateDoc , serverTimestamp  } from '../Config/firebaseCongif'

import "./Home.css"

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const email = user.email;
    console.log(email);

    const uid = user.uid;
    console.log(uid);

  } else {
    // User is signed out
    console.log("user not found");

  }
});




// const logout = () =>{
//   signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
// }


// const senEmail = () =>{
//   sendEmailVerification(auth.currentUser)
//   .then(() => {
//     // Email verification sent!
//     console.log("send email...");

//   });
// }






function Home() {


  const [value, setValue] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)

  useEffect(() => {

    onSnapshot(collection(db, "todos"), (snapshot) => {

      const todoList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((data) => data.todo)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))

      setTodos(todoList)

    })

  }, [])

  const addText = async () => {

    if (value.trim() === "") {
      return
    }

    const docRef = await addDoc(collection(db, "todos"), {
      todo: value,
      country: "pakistan",
      createdAt: Date.now() ,
      timestamp : serverTimestamp ()
    })

    console.log("Document ID:", docRef.id)

    setValue("")
  }

  const deleteAll = async () => {

    const snapshot = await getDocs(collection(db, "todos"))

    snapshot.docs.map((data) => {
      deleteDoc(doc(db, "todos", data.id))
    })

  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    console.log(id);

  }

  const editTodo = (data) => {
    setValue(data.todo)
    setEditId(data.id)
  }

  const updateTodo = async () => {

    await updateDoc(doc(db, "todos", editId), {
      todo: value ,
      timestamp : serverTimestamp ()

    })

    setValue("")
    setEditId(null)

  }

  return (
    <div className="todo-container">

      <div className="todo-box">

        <h1>My Todo List</h1>
        <p className="subtitle">Manage your daily tasks</p>

        <div className="input-section">

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your todo..."
          />

          {
            editId ? (
              <button className="update-btn" onClick={updateTodo}>
                Update
              </button>
            ) : (
              <button className="add-btn" onClick={addText}>
                Add
              </button>
            )
          }

        </div>

        <button className="delete-all-btn" onClick={deleteAll}>
          Delete All
        </button>

        <ul className="todo-list">
          {
            todos.map((data) => {
              return (
                <li key={data.id} className="todo-item">

                  <span>{data.todo}</span>

                  <div className="todo-actions">

                    <button
                      className="edit-btn"
                      onClick={() => editTodo(data)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(data.id)}
                    >
                      Delete
                    </button>

                  </div>

                </li>
              )
            })
          }
        </ul>

      </div>

    </div>
  )



}

export default Home;
