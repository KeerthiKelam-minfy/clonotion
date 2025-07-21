# Clonotion - Real time collaboration tool
  
## Application Overview
  
Clonotion - A real time collaboration tool with rich text editing capabilities that helps you and your team document your work, in a very organized way, see what your teammates are editing, live cursor tracking, see who all are viewing your document and many more.
  
## **Setup Instructions**
  
## 1. Clone the repository
  
use this command: 
  
```jsx
git clone “https://KeerthiKelam-minfy/clonotion”
cd clonotion
```
  
## 2. Setup .env files
  
Setup your own environment variables using the env.example file, in both frontend and backend.
  
## 3. Install dependencies
  
```jsx
cd frontend
npm i
  
cd backend
npm i
```
  
## 4. Create a new firebase project
  
Create a new project in firebase and enable firebase auth and firestore database.
  
## 5. Setup firestore rules
  
After setting up firestore, write firebase rules for setting permissions for different CRUD operations for different roles (owner, viewer, editor).
  
## 6. Start the servers
  
1. Run your frontend using the command
  
```jsx
cd frontend
npm run dev
```
  
2. Start your backend server also - using the command  
  
```jsx
cd backend
npm start
```
  
-- Make sure you are connected to a stable internet connection.  
-- Then share a document with your friends and start collaborating.
    
### Application Interface Demo:  
   
**Landing Page**
<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/b4b8b968-ed4e-4435-ab06-d5717086536b" />
  
**Sign Up**
<img width="1920" height="967" alt="image" src="https://github.com/user-attachments/assets/825f54c1-f0a2-4de8-90ce-6dd439df8efa" />
   
**Login**
<img width="1920" height="964" alt="image" src="https://github.com/user-attachments/assets/24f170f0-2969-4bd5-8681-697fefa3c163" />
   
**Home page**  
<img width="1920" height="958" alt="image" src="https://github.com/user-attachments/assets/cbc736d0-caec-451d-9415-a88548b938bd" />
  
**Search Functionality**
<img width="1920" height="943" alt="image" src="https://github.com/user-attachments/assets/8db65b84-b395-40f8-9b69-c4c954c1991a" />
   
**document Page**
<img width="1920" height="948" alt="image" src="https://github.com/user-attachments/assets/a18a7af1-3eaa-41e9-9275-d3a82baa6a63" />  
  
**Real Time collaboration**
<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/bd2cbd8e-7b8e-4e0f-afc0-c2b90bcbad83" />
  
 
