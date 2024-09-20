import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTask } from '../Redux/slices/boardSlice'; 

const Board = () => {
  const board = useSelector(state => state.board.boards[0]); 
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch(); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterTasks = (tasks) => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      moveTask({
        taskId: result.draggableId,
        sourceColumnId: source.droppableId, 
        sourceIndex: source.index,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 p-4">
        <div key={board.id} className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{board.title}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex gap-4">
            {board.columns.map(column => (
              <Column
                key={column.id}
                column={{
                  ...column,
                  tasks: filterTasks(column.tasks) 
                }}
                boardId={board.id} 
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;


