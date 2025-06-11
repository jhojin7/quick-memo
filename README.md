# QuickMemo: Beautiful Memo Application

QuickMemo is a sleek and intuitive web application designed to help you quickly jot down thoughts, ideas, and reminders without any friction. Built with a focus on speed and ease of use, it provides a seamless experience for capturing your memos and organizing them in a clean, accessible grid view.

## Features

*   **Instant Memo Creation**: Start typing immediately on the landing page thanks to auto-focus, allowing for rapid note-taking.
*   **Seamless Workflow**: The textarea automatically refocuses after saving a memo, keeping you in the flow.
*   **Memo Grid View**: A dedicated page to view, search, edit, and delete all your memos in an organized grid.
*   **Responsive Design**: A beautiful and production-ready interface that adapts to various screen sizes.
*   **Local Storage**: Memos are persistently stored in your browser's local storage, ensuring your notes are safe even after closing the application.

## Technologies Used

*   **React**: A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React**: A collection of beautiful and customizable open-source icons.
*   **Vite**: A fast and opinionated build tool for modern web projects.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    # This step is not applicable in the current environment, but would be for a typical project setup.
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will open the application in your browser, typically at `http://localhost:5173`.

## Project Structure

*   `src/App.tsx`: The main application component, handling view changes between the landing page and memo grid.
*   `src/components/LandingPage.tsx`: The component for creating new memos, featuring an auto-focusing textarea.
*   `src/components/MemoGrid.tsx`: The component for displaying, searching, and managing all memos.
*   `src/hooks/useMemos.ts`: A custom React hook for managing memo state, including adding, updating, deleting, and searching memos, with local storage persistence.
*   `src/types/memo.ts`: TypeScript type definitions for memo objects and view modes.
