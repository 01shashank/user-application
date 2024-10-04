# User Form Application

This application stores and displays users data in the form of a table. You can add a user to the table by manually entering the details. You can also generate details of a random user and add them.

## Table of Contents

- [Live Demo](https://user-application-pnd8q97u4-shashank-sangales-projects.vercel.app/)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Tips](#tips)

## Live Demo

Check out the live version of the app [here](https://user-application-pnd8q97u4-shashank-sangales-projects.vercel.app/)

## Features

- Feature 1: All users are displayed on the home page are coming from a json file named user.json present in public folder of root directory.
- Feature 2: User can be added by clicking the "Add a User" button and filling up the form.
- Feature 3: There's is a "Generate" button which can automatically generate details of a random user in the form.

## Technologies

- React
- Material-UI
- TypeScript
- Cypress

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   git clone https://github.com/01shashank/user-application.git

2. **Install the dependecies:**
   npm install

3. **Run the project:**
   npm start
   The server will start on "http://localhost:3000/"

## Tips

- For running Tests using Cypress :-
    1. npx cypress open
    2. Select E2E testing option on the Cypress window.
    3. Select a suitable browser.
    4. Select the spec.cy.ts file.
    5. It should run the test cases present in the file.
