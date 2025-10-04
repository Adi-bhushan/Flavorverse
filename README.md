# FlavorVerse 🍲

FlavorVerse is a full-stack web application that allows users to share, discover, and save their favorite recipes from around the world. This project was built using the MERN stack (MongoDB, Express.js, React, Node.js).

**Live Demo:** [https://flavorverse08.netlify.app/](https://flavorverse08.netlify.app/)

---

## Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Recipe Management:** Authenticated users can create, edit, and delete their own recipes.
- **Recipe Gallery:** A public homepage where anyone can view all submitted recipes.
- **Favorites System:** Logged-in users can save recipes to their personal favorites list.
- **User Profiles:** A dedicated profile page to view created recipes and saved recipes.
- **Dark Mode Theme:** A modern, responsive, and easy-to-use interface.

---

## Technologies Used

- **Frontend:** React, React Router, Axios, React-Cookie
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Deployment:**
  - Backend API on **Render**
  - Frontend on **Netlify**
  - Database on **MongoDB Atlas**

---

## Local Setup and Installation

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Adi-bhushan/Flavorverse.git](https://github.com/Adi-bhushan/Flavorverse.git)
    cd Flavorverse
    ```
2.  **Setup the Backend:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and add your `MONGO_URI` and `JWT_SECRET`.
    ```bash
    npm start
    ```
3.  **Setup the Frontend:**
    ```bash
    cd ../client
    npm install
    npm start
    ```
