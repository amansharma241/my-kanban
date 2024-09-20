# Project Documentation: Kanban Board Application

## Project Requirements

- Allow users to create tasks with a title, description, and due date.
- Enable users to organize tasks across different columns: "To Do," "In Progress," and "Done."
- Provide functionality for users to reorder tasks within the same column using drag-and-drop.
- Allow users to edit and delete tasks.
- Implement a search feature to filter tasks by title or description.



### Technology Stack

- **React**: Chosen for its component-based architecture, facilitating efficient UI development.
- **Redux**: Used for state management, ensuring a predictable state container and easy access to task data.
- **react-beautiful-dnd**: Integrated for seamless drag-and-drop functionality, enhancing the user experience.
- **Tailwind CSS**: Utilized for styling components with utility classes, enabling rapid design and responsiveness.

### State Management

- **React Hooks**: Employed for managing local component state (e.g., task details, search term).

### Styling Approach

- **Tailwind CSS**: Leveraged for consistent styling across components, ensuring a modern and responsive design.
- **Custom CSS**: Applied where necessary for specific UI elements needing unique styles.

### Data Handling

- **Validation**: Implemented client-side validation to ensure correct data entry for tasks.

## User Experience (UX) Considerations

### Ease of Use

- **Simplified UI**: Designed a clean interface with intuitive controls to focus on core functionalities.
- **User Guidance**: Streamlined the task creation and management process to enhance user interaction.

## Instructions to Run it Locally

### Clone the Repository

```bash
git clone https://github.com/username/kanban-board.git
cd kanban-board
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

## Usage

1. Open the application in your browser at [http://localhost:3000](http://localhost:3000).
2. Create tasks by filling out the form and clicking "Add Task."
3. Drag and drop tasks to reorder them within the same column or move them to different columns.
4. Use the search bar to filter tasks by title or description.

```

