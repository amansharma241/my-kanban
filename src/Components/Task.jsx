import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../Redux/slices/boardSlice';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, columnId, boardId, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(task.dueDate || '');

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const handleDelete = () => {
    dispatch(deleteTask({ boardId, columnId, taskId: task.id }));
  };

  const handleEditFlag = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (newTitle.trim() && newDescription.trim()) {
      dispatch(editTask({
        columnId,
        boardId,
        taskId: task.id,
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
      }));
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (task.dueDate) {
      setNewDueDate(task.dueDate);
    }
  }, [task.dueDate]);

  const formatDueDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded shadow-md ${isOverdue ? 'bg-red-200' : 'bg-white'}`}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
                Save
              </button>
            </>
          ) : (
            <>
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              {task.dueDate && <p className="text-sm text-gray-500">Due: {formatDueDate(task.dueDate)}</p>}
              <div className="flex justify-between mt-2">
                <button onClick={handleEditFlag} className="text-blue-500">Edit</button>
                <button onClick={handleDelete} className="text-red-500">Delete</button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;


