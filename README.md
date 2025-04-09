# iNoteBook

iNoteBook is a full-stack web application designed to help users securely create, manage, and store their personal notes on the cloud. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, it offers a seamless and responsive user experience.

## Features

- **User Authentication:** Secure user registration and login system to protect personal notes.
- **CRUD Operations:** Create, Read, Update, and Delete notes with ease.
- **Cloud Storage:** Notes are stored in MongoDB, allowing access from any device with an internet connection.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Installation

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MAHARSHIBHOWMICK/iNoteBook.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd iNoteBook
   ```

3. **Install dependencies:**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the application:**
   - Start the backend server:
     ```bash
     cd ../backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

   The application will be running at `http://localhost:3000`.

## Usage

- **Register/Login:** Create a new account or log in with existing credentials.
- **Manage Notes:** Add new notes, edit existing ones, or delete notes you no longer need.
- **Logout:** Securely log out from the application when done.
