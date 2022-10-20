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


### SHOR-7
As a student, I want to see the course descriptions so that I can have a general understanding of what the course is about.
- Create Course Description page
- Create POST endpoint /course



### SHOR-16 	
As a student, I want to search for programs with keywords so that I can find my interest in learning.
- Create General Program Search page in frontend
- Create POST endpoint /program/search
- Create sample database for programs


### SHOR-17	
As a student, I want to see the information (descriptions, POST requirements) of the programs so that I can evaluate myself.		
- Create Program Description page
- Create POST endpoint /programs


### SHOR-13
As a student, I want to rate and write comments for the course that I took so that I am able to provide my experiences to future students.
- Create a rating form in frontend
- Create POST endpoint /course/rate


### SHOR-9
As a student, I want to see the detailed course rating and comments from previous students individually so that I can see the others’ experiences in detail.
- Create comments viewing page in frontend
- Create POST endpoint /seeCourseRatings
