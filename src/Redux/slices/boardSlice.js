import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [
    {
      id: 'board-1',
      title: 'Board',
      columns: [
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Progress', tasks: [] },
        { id: 3, title: 'Done', tasks: [] },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { boardId, columnId, title, description, dueDate } = action.payload;
      const board = state.boards[0];
      const column = board.columns.find((column) => column.id === columnId);
      column.tasks.push({
        id: Date.now().toString(),
        title,
        description,
        dueDate,
      });
    },
    deleteTask: (state, action) => {
      const { columnId, taskId } = action.payload;
      const board = state.boards[0];
      const column = board.columns.find((column) => column.id === columnId);
      column.tasks = column.tasks.filter((task) => task.id !== taskId);
    },
    editTask: (state, action) => {
      const { columnId, taskId, title, description, dueDate } = action.payload;
      const board = state.boards[0];
      const column = board.columns.find((column) => column.id === columnId);
      const task = column.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
      }
    },
    
    moveTask: (state, action) => {
      const { taskId, sourceColumnId, sourceIndex, destinationColumnId, destinationIndex } = action.payload;
      const board = state.boards[0];
      const sourceColumn = board.columns.find(column => column.id === sourceColumnId);

      // If moving within the same column
      if (sourceColumnId === destinationColumnId) {
        const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
        sourceColumn.tasks.splice(destinationIndex, 0, movedTask);
      } else {
        // Moving to a different column
        const destinationColumn = board.columns.find(column => column.id === destinationColumnId);
        const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
        destinationColumn.tasks.splice(destinationIndex, 0, movedTask);
      }
    },
   
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    addColumn: (state, action) => {
      const { column } = action.payload;
      const board = state.boards[0];
      board.columns.push(column);
    },
  },
});

export const {addTask,deleteTask, editTask, moveTask, reorderTaskInColumn,addBoard, addColumn,} = boardSlice.actions;

export default boardSlice.reducer;


