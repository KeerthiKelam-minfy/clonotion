# Clonotion - Real time collaboration tool

## Application Overview

Clonotion - A real time collaboration tool with rich text editing capabilities that helps you and your team document your work, in a very organized way, see what your teammates are editing, live cursor tracking, see who all are viewing your document and many more.

## Setup Instructions

## **Clone the repository**

use this command: 

```jsx
git clone “https://KeerthiKelam-minfy/clonotion”
cd clonotion
```

## Setup Instructions

Setup your own environment variables using the env.example file, in both frontend and backend.

## Install dependencies

```jsx
cd frontend
npm i

cd backend
npm i
```

## Create a new firebase project

Create a new project in firebase and enable firebase auth and firestore database.

## Setup firestore rules

After setting up firestore, write firebase rules for setting permissions for different CRUD operations for different roles (owner, viewer, editor).

## Start the servers

1. Run your frontend using the command

```jsx
cd frontend
npm run dev
```

1. Start your backend server also - using the command  

```jsx
cd backend
npm start
```

1. Make sure you are connected to a stable internet connection.
2. Then share a document with your friends and start collaborating.
