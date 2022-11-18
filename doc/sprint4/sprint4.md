# sprint4.md

## Meeting Details
On the 8th of November 2022, we held the sprint 4 planning meeting on Discord. During the meeting, group members discussed the user stories we will finish in sprint 4 and how the tasks are broken down. 

## Participants
Alfred Tze-Hong Ha, Megan Liu, Runyu Yue, Caleb Zhang, Chau, Pintao He


## Team Capacity
Alfred Tze-Hong Ha:	2h/day    
Megan Liu:		2h/day      
Runyu Yue:		2h/day    
Caleb Zhang:		2h/day      
Chau:			2h/day      
Pintao He:		2h/day        


## Goal: 
Finish user stories SHOR-12, SHOR-19, SHOR-20, SHOR-14, SHOR-15   

## Spikes
- Design appropriate data schemas to satisfy all functionalities
- Search in large text results in slow response time
- State and storage in frontend
- Data structure between backend and frontend



## Tasks Breakdown
#### SHOR-12 
As a student, I want my search results to be sorted based on rating so that I can quickly identify the courses that match my preference.
SHOR-12-1: Add a checkbox to course search page for selecting sort    
SHOR-12-2: Create new POST endpoint for course search result.     
  
Criteria of satisfaction:
- Verify that search results are displayed on the screen in sorted form.



#### SHOR-19 
As a student, I want to see the graduation requirements so that I can know how to graduate.     
SHOR-19 Create graduation requirement page in frontend    

Criteria of satisfaction:
- The page will display universal requirements of graduation for all students.

	
#### SHOR-20
As a student, I want to change the website into dark/light mode so that it can fit better for my eye view.      
SHOR-20 Add light/dark mode switch and have theme changing in frontend      

Criteria of satisfaction: 
- The mode change button will be applied to every page of the website.  
- The mode will stay the same when users navigate between pages. 


#### SHOR-14 
As a student, I want to get recommended on course selection for graduation so that I can get advice on which course to take.	        
SHOR-14-1: Update database for program computer specialist(add all the required courses and electives)            
SHOR-14-2: Endpoint for returning all the required courses and electives as lists to frontend           
SHOR-14-3: Endpoint for finding the elective course’s all prerequisites.          
SHOR-14-4: Create a page to display all the recommended courses           

Criteria of satisfaction: 
- Verify the selection fullfills the requirements for the program.
- Verify that the course being recommended is not in the academic history of the student.
- Verify the course description contains the preference user input



#### SHOR-15 
As a student, I want to write down my academic history so that I can get recommended courses by the system.       
SHOR-15 Create a form for inputting academic history

Criteria of satisfaction: 
- Verify the course codes being type in is valid.
- Verify user can choose multiple courses at the same time
- Verify there are same courses cannot be chosen twice


  
  
