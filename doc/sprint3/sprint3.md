# sprint3.md
## Meeting Details
On the 25th of October 2022, we held the sprint 3 planning meeting on Discord. During the meeting, group members discussed the user stories we will finish in sprint 3 and how the tasks are broken down. 

## Participants
Alfred Tze-Hong Ha, Megan Liu, Runyu Yue, Caleb Zhang, Chau, Pintao He


## Team Capacity
Alfred Tze-Hong Ha	2h/day
Megan Liu		2h/day
Runyu Yue		2h/day
Caleb Zhang		2h/day
Chau			2h/day
Pintao He		2h/day


Goal: 
Finish user stories SHOR-6, SHOR-18, SHOR-8, SHOR-10, SHOR-11

Spikes
UI Design
Design appropriate data schemas to satisfy all functionalities
Search in large text results in slow response time
Not familiar with Trello



## Tasks Breakdown
### SHOR-6
As a student, I want to be able to advance my search for courses so that I can find courses with more specific requirements.      
SHOR-6-1: Create advanced search course layout in frontend      
SHOR-6-2: Create POST endpoint      

Criteria of satisfaction:     
- Verify rating number is calculated and displayed correctly        
- Verify users can easily identify and understand what the number is used for.      



### SHOR-18
As a student, I want to advance my search for programs so that I can find desired program based on my requirements.     
SHOR-18-1: Create advanced search program layout in frontend.       
SHOR-18-2: Create POST endpoint for advance search.     

Criteria of satisfaction:     
- Verify the advance search button successfully leads to advance search.      
- Verify users can see and choose different specifications for searching.     
- Verify searching results match with the requirements that user input.     
- Verify the words displaying and font is suitable for reading.     
  

### SHOR-8
As a student, I want to see the average course rating so that I can have a broad sense of how people think about the course.	      
SHOR-8-1: Add average course rating in course description page in frontend          
SHOR-8-2: Update CourseSchema to add fields: {score: average, num}      
SHOR-8-3: Update POST course/rate endpoint to update score in course      
 
Criteria of satisfaction:     
- Verify rating number is calculated and displayed correctly        
- Verify users can easily identify and understand what the number is used for.        
 


### SHOR-10	
As a student, I want to be able to like/dislike the students’ comments so that I can provide my feedback quickly.       
SHOR-10-1: Update CommentView page to implement the functionality and the display in frontend.          
SHOR-10-2: Update CommentSchema to add fields: likes + dislikes           
SHOR-10-3: Create endpoint for like/dislike: remember to check for duplicates           

Criteria of satisfaction:     
- Verify users can click the buttons to like or dislike others’ comments.     
- Verify after each like or dislike, the screen display will also be updated.     
   

## SHOR-11
As a student, I want to be able to comment on other students’ comments so that I can share my opinions.       
SHOR-11-1: Update CommentView page to implement the functionality and the display in frontend.      
SHOR-11-2: Create endpoint for replying to a comment      
SHOR-11-3: Create endpoint for displaying the comment on a comment      


Criteria of satisfaction:     
- Verify users can successfully write their comments.     
- Verify after users commented, their comments will be updated to the screen display.     


