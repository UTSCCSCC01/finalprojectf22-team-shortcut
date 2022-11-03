# SetUp
All initial setup files are committed in dev branch.      

### Frontend Setup    
1. Installed node.js (https://nodejs.org/en/)   
2. cd into the directory that plans to set up the product   
```cd CSCC01 ```      
3. create new folder for the product    
``` mkdir shortcut ``` 
``` cd shortcut ``` 
4. create front end by using REACT    
``` npx create-react-app frontend ```    
5. clean up in the src folder       
   modify the App.js to App.jsx  
   
### Backend Setup  
1. cd into the directory where the project is located   
``` cd shortcut ```   
2. create and cd into the backend directory   
``` mkdir backend ```   
``` cd backend ```    
3. Initialize the server    
``` npm init ```    
``` yes ```     
4. Initial files for the server       
5. Create ```app.js ``` in the backend directory      
6. In ```app.js ```, import modules       
7. In ```app.js ```, create an app       
8. In ```app.js ```, add middlewares          
9. In ```app.js ```, create a port    
10. Create new file ```.env```            
11. In ```.env ```, set up port = 8080      
12. In ```.env ```, add MONGO_URI by paste the URI from MongoDB and insert the password   
13. In ```app.js```, connect to MongoDB database


### Database Setup
1. Go to mongodb.com and sign up    
2. Create a new project called shortcut   
3. Go to the database tag on the left to create a new database    
4. Go to the network access tag on the left to whitelist ip address for each group member   
5. Click on the database access tag to add a user with name CalebZhang and create a new password for this user    
6. Click on the Database tag on the left and go to cluster one. Click on the connect and choose the option which says: "connect your application"   
7. Copy the connection string and write it to ```.env``` file in backend and assign it to the variable MONGO_URI
