## Meeting Details
On the 10th of October 2022, we held the sprint 2 planning meeting on Discord. During the meeting, group members discussed the user stories we will finish in sprint 2 and how the tasks are broken down. 

## Participants
Alfred Tze-Hong Ha, Megan Liu, Runyu Yue, Caleb Zhang, Chau, Pintao He

## Team Capacity
Alfred Tze-Hong Ha:	2h/day
Megan Liu:		2h/day
Runyu Yue:		2h/day
Caleb Zhang:		2h/day
Chau:			2h/day
Pintao He:		2h/day


## Goal
Finish user stories SHOR-5, SHOR-7, SHOR-16, SHOR-17, SHOR-13, SHOR-9

## Spikes
- UI Design
- Design appropriate data schemas to satisfy all functionalities
- Search in large text results in slow response time
- Not familiar with Trello

## Tasks Breakdown
### SHOR-5  
As a student, I want to search for my desired course with keywords so that I can find the right course for me.
- Create General Course Search page in frontend
- Create POST endpoint /course/search
- Create sample database for courses

Acceptance criteria:  
- Users can input keywords to the search bar to search for related courses.   
- Search results should contain courses that have the keywords specified by users in the course name and course code.   
- A message should be displayed if no course matches the keywords.  


### SHOR-7
As a student, I want to see the course descriptions so that I can have a general understanding of what the course is about.
- Create Course Description page
- Create POST endpoint /course

Acceptance criteria:  
- Verify users can see the correct descriptions based on their search.    
- Verify the words displaying and font is suitable for reading.   



### SHOR-16 	
As a student, I want to search for programs with keywords so that I can find my interest in learning.
- Create General Program Search page in frontend
- Create POST endpoint /program/search
- Create sample database for programs

Acceptance criteria:  
- Verify users can input keywords to the search bar to search for related programs.   
- Verify search results contain programs that have the keywords specified by users in the program name, program included courses, or description.  
- Verify that a message is displayed if no program matches the keywords. 


### SHOR-17	
As a student, I want to see the information (descriptions, POST requirements) of the programs so that I can evaluate myself.		
- Create Program Description page
- Create POST endpoint /programs

Acceptance criteria:
- Verify users can see the correct description based on their search.       
- Verify users can see if the program is limited or unlimited (required POST).   
- If the searched program is limited, verify users can see the correct POST requirement for that specific program.   
- Verify the words displaying and font is suitable for reading.    

### SHOR-13
As a student, I want to rate and write comments for the course that I took so that I am able to provide my experiences to future students.
- Create a rating form in frontend
- Create POST endpoint /course/rate

Acceptance criteria:
- Verify the basic display of the comments and ratings.   
- Verify the total course grade will be changed based on the ratings.   

### SHOR-9
As a student, I want to see the detailed course rating and comments from previous students individually so that I can see the others’ experiences in detail.
- Create comments viewing page in frontend
- Create POST endpoint /seeCourseRatings

Acceptance criteria:
- Verify every comments are displayed in the same format, and the font is suitable for reading.  
- Verify the users can see the writer of each comments.   
- Verify all comments that previously made can be seen on the screen. 
