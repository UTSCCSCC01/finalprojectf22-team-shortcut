**ShortcUTSC**  is a web application designed for the University of Toronto Scarborough students to provide advanced search and personalized recommendation for courses and programs offered by the University.

# Motivation
Students often make mistakes when choosing their courses, whether cramming too many difficult courses into one semester or missing a program requirement. **ShortcUTSC** provides the guidance students need to make informed decisions on their degree planning based on their program, preferences and many more.
Resources of course information and selection tutorials from the University or other social platforms are plentiful but unorganized and sometimes confusing, which makes searching for the right courses time-consuming at best and without success at worst. **ShortcUTSC** offers selective and coordinated user-provided data in a straightforward presentation and proposes personalized suggestions based on user-specified information.

# Installation
Install Node.js (https://nodejs.org/en/).

Clone the project to your local machine.
```
git clone https://github.com/UTSCCSCC01/finalprojectf22-team-shortcut.git
```

Move into ```/shortcut/frontend```. Install dependencies and start the application.
```
$ npm install
$ npm start
```

Start a new shell. Move into ```/shortcut/backend```. Install dependencies and start the backend. Backend is automatically connected to a cloud-hosted MongoDB database.
```
$ npm install
$ npm start
```

# Contribution
## Do you use git flow?
Yes. 
## What do you name your branches?
- ```main``` for production
- ```dev``` for features and bug fixes, merged into main after each sprint
- ```task-[task name]``` for features, ```bug-[bug name]``` for bug fixes
## Do you use GitHub issues or another ticketing website?
Yes, we use Jira for task and issue tracking.
## Do you use pull requests?
Yes, pull requests are required before merging into main. A template for pull request is provided in ```.github/pull_request_template.md```.
