import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/slices/boardSlice';
import Task from './Task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, boardId }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    if (newTitle && newDueDate) {
      dispatch(addTask({
        boardId,
        columnId: column.id,
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate.toISOString(),
      }));
      setNewTitle('');
      setNewDescription('');
      setNewDueDate(null);
      setShowForm(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-200 p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{column.title}</h3>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white p-2 rounded">
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      <Droppable droppableId={`${column.id}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-4"
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} columnId={column.id} boardId={boardId} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showForm && (
        <div className="mt-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task Title"
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
            className="border p-2 rounded w-full mb-2"
          />
          <div className="mb-2">
            <label className="block mb-1">Due Date:</label>
            <DatePicker
              selected={newDueDate}
              onChange={date => setNewDueDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select due date"
              className="border p-2 rounded w-full"
            />
          </div>
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded">
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;


