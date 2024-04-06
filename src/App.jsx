import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
const[todo,setTodo] = useState("");
const[todos,setTodos] = useState([]);
const [showFinished, setShowFinished] = useState(true)

const saveToLocal = (updatedTodos) => {
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};


useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])


const handleEdit =(e,id)=>{
    let t = todos.filter(item=>item.id==id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id)
    saveToLocal(newTodos)
    setTodos(newTodos);
  }
 
  const handleDelete =(e, id)=>{
   
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    saveToLocal(newTodos);
    setTodos(newTodos);

  }
   
  const handleAdd =()=>{
    let newTodo = {id: uuidv4(), todo, isCompleted : false};
    setTodos([...todos,newTodo]);
    saveToLocal([...todos, newTodo]);
    setTodo("");
  }
 
  const handleChange =(e)=>{
    setTodo(e.target.value);
  }

  const handleCheckbox =(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>item.id === id);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
   
    saveToLocal(newTodos);
    setTodos(newTodos);

  }
  const toggleFinish = ()=>{
    setShowFinished(!showFinished);
  }
 
  

  return (
    <>
      <Navbar/>
      
      <div className="container mx-auto my-5 bg-gray-300 p-5 rounded-xl min-h-[80vh]">
        <div className="addTodo ">
          <h2 className='font-bold'>Add a Todo</h2>
          <input type="text"  onChange={handleChange} value={todo} className='rounded bg-slate-500 text-white p-1 w-1/2 ' />
          <button onClick={handleAdd} disabled={todo.length < 1} className='text-white bg-slate-500 cursor-pointer py-1 px-2 mx-4 rounded-md hover:bg-cyan-950 '>Save</button>
        </div>
        <input  className="my-4" onChange={toggleFinish} type="checkbox" checked={showFinished}/> Show Finished
        <h2 className=' font-bold my-6'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div>No Todos to display</div>}
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-2 my-8 justify-between w-1/4">
            <div className='flex gap-5 '>
              <input type="checkbox" name={item.id} onChange={handleCheckbox} value={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='text-white bg-slate-500 cursor-pointer py-1 px-2 mx-1 rounded-md hover:bg-cyan-950'>Edit</button>
                <button onClick={(e)=>handleDelete(e, item.id)} className='text-white bg-slate-500 cursor-pointer py-1 px-2 mx-1 rounded-md hover:bg-cyan-950'>Delete</button>
              </div>
            </div>
            })}
        </div>
      </div>
    </>
  )                           
}

export default App
