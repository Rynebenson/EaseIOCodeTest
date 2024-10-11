# Ease.IO Front End Coding Challenge

This repository contains the code for a frontend application developed as part of a senior developer coding challenge. Below you'll find instructions for running the application, running the tests, app preferences, component differentiation, and API usage.

## Table of Contents
- [Running the Application](#running-the-application)
- [Running the Tests](#running-the-tests)
- [App Preferences](#app-preferences)

## Running the Application

To run the application, follow these steps:

1. **Clone the repository**:
   - `git clone https://github.com/Rynebenson/EaseIOCodeTest`
   - `cd EaseIOCodeTest`

2. **Install the necessary packages**:
   - `npm install`

3. **Start the application**:
   - `npm start`

   The application will be available at `http://localhost:3000`.

## Running the Tests

To run the tests for this application, follow these steps:

1. **Ensure you have installed all necessary packages** (as described in the [Running the Application](#running-the-application) section).

2. **Run the tests**:
   - Use the following command to execute the tests:
     - `npm test`

## App Preferences

### Directory Structure

Almost all of the code is located in the `src` folder. I chose to name directories that are created to house a collection of items in plural form and using camlCase (eg: pages, libs, etc). The main ones I created are:

   - components: React components that can be re-used in several places.
   - services: These are actions which are called by the UI layer and manage the data within the global state / localStorage.
   - libs: Library classes/functions. These are not React components and display no UI.
   - pages: These are components that define pages in the app.
   - styles: I used tailwind so styles are written within components, so this currently only houses the global stylesheet.

### File Naming/Structure

Files should be named after the component/function/constants they export, respecting the casing used for it. ie:

   - If you export a constant named CONST, its file/directory should be named the CONST.
   - If you export a component named Text, the file/directory should be named Text.
   - For files that are utilities that export several functions/classes use the UpperCamelCase version ie: utils/Tasks.js.
   - All React components should be PascalCase (a.k.a. UpperCamelCase 🐫).