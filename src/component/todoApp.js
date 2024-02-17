// src/components/Counter.js
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo,updateTodo } from '../features/todo/todoSlice';
import './todoAppStyle.css'

const Counter = () => {
  const inputRef = useRef(null);
  const closeBtn = useRef(null);

  const [isPopupActive, setPopupActive] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(''); 
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todoList.todos);
  const dispatch = useDispatch();

  const handleClose = () =>{
      setPopupActive(false);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      inputRef.current.click();
    }
  };

  const handleDelete = (index) =>{
    dispatch(removeTodo(index))
    // alert(index);
  }

  const handleEdit = (todo) => {
    // Set the selectedTodo state with the data to edit
    setSelectedTodo(todo);
    setPopupActive(true);
  };

  const handleUpdateTodo = () => {
    if (selectedTodo) {
      dispatch(updateTodo(selectedTodo));
      setSelectedTodo(null);
      setPopupActive(false);
    }
  };

  return (
    <div>
      <div style={{position:'fixed',top:'0',width:'100%',backgroundColor:'white',boxShadow:'0px 12px 20px rgba(0, 0, 0, 0.2)'}}>
      <input
          type="text"
          placeholder="Enter todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            padding: '6px',
            margin: '10px',
            border: 'none',
            // borderRadius: '4px',
            fontSize: '18px',
            outline: 'none',
            borderRight: '1px solid',
            borderLeft: '1px solid',
            width: '50%',
          
          }}
        />
        <button  ref={inputRef} 
          onClick={() => {
            if(text !== ''){
            dispatch(addTodo(text));
            setText('');
            }
          }}
          style={{
            padding: '8px 12px',
            backgroundColor: '#ff3333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Todo
        </button>
        </div>
        {/* <button onClick={handleDelete}>removeTodo</button> */}
    
      
      <table width={'100%'} style={{ border: '1px solid #ccc', borderRadius: '8px', background: '#f0f0f0', borderCollapse: 'collapse', margin: '52px 0 0 0' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: '#fff' }}>
            <th style={{ fontWeight: 'bold', padding: '12px 0', textAlign: 'center',width: '20%' }}>ID</th>
            <th style={{ fontWeight: 'bold', padding: '12px 0', textAlign: 'left', width: '65%' }}>Todos</th>
            <th style={{ fontWeight: 'bold', padding: '12px 0', textAlign: 'left', width: '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((todo, index) => (
              <tr key={index} style={{ backgroundColor: '#f2f2f2' }}>
                <td style={{ padding: '12px 0', textAlign: 'center' }}>{todo.id}</td>
                <td style={{ padding: '12px 0', textAlign: 'left' }}>{todo.des}</td>
                <td style={{ padding: '12px 0', display: 'flex', justifyContent:'start', gap: '5px' }}>
                  <button onClick={() => handleEdit(todo)} style={{ backgroundColor: 'limegreen', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(index)} style={{ backgroundColor: '#ff3333', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                    Remove
                  </button>                
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {isPopupActive && selectedTodo && (
        <div className="popup">
          <button className="close-btn" onClick={handleClose}>x</button>
          <h3>Edit Todo</h3>
          <input
            type="text"
            value={selectedTodo.des}       
            onChange={(e) => setSelectedTodo({ ...selectedTodo, des: e.target.value })}
          />
          <button onClick={handleUpdateTodo}>Save</button>
        </div>
      )}
     
    </div>
  );
};



export default Counter;