# React Project

## Installation
.... Report Start
To get started, ensure you have the necessary dependencies installed. Run the following command in your project directory:

```sh
npm install react-bootstrap bootstrap react-router-dom

This instruction will guide the reader to install `react-bootstrap`, `bootstrap`, and `react-router-dom` using npm.

```
1. The NavigationControl component is ready for routing
2. The Report&Analytics layout is ready and it also reponsive, i just need to ajust it to requirements
...Report End


.... Report Start
# Login and SignUp
1. i created one component to be shared between the pages, which hold the logo, and the welcome text passed as a props


# Navigation Header
the navHeader is completed, for the mobile part, two icons aren't showing at the top yet, but am leaving that aside for now
...Report End


.... Report Start
# 3-june-2024
1. sideNavigation component completed
    -Component created in process-
        -Navigation Button
        -Search Bar
        
2. Update of HeaderNavigation
    -Updates-
        -Responsive design while still displaying the user dropdown icon and the notification bell
        -Ajusting the Application name base on the screen size
        -Toggle the sideNavigation using the haederNavigation in mobile mode.
3. Report and Analytices
    -page completed-
        -Page Header Text [component]
        -dropdown component for filter
        -report card box with hovering effect
        -Responsive design
...Report End


.....Report Start
# 19-june-2024
1. Finished consuming SignUp and Login Api
-Created a Context folder used for consuming all Api, with subfolder for every aspect of the Api
-Implemented the SignUp and Login functionality using Axios

## Installation
    To get started, ensure you have the necessary dependencies installed. Run the following command in your project directory and also a new file will be created to store the baseUrl of the appilcation:

```sh
npm install axios
```
    Now in your project root directory where you have package.json file, crerate a new file [ .env ], Add this line of code to the file before running the sever again.
```sh
REACT_APP_EDO_SUBEB_BASE_URL=https://edoivm.azurewebsites.net
```

-Implemented error handling for both login and signup
-Implemented token storage for logged in users using session storage
-Implemented validation for protected routes

2. Finished consuming only the getItems Api form the items section
 -but haven't dispaly the returing data because it an empty array
 -the InventoryItems List is now scrollable, which will also be added to other component
 .....Report End

<!-- Uniekideas
CU:aZE;2n~3sVt&kxQ]j_$ -->




<!-- Inventory-Management-System-Demo

 ```sh
 name: Deploy React App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build
        env:
          REACT_APP_EDO_SUBEB_BASE_URL: ${{ secrets.REACT_APP_EDO_SUBEB_BASE_URL }}

      - name: Deploy to GitHub Pages
        run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

 ``` -->

 .....Report Start
 # 01-july-2024
 1. ----Consumed Module----
  - Profile module completed
  - General module completed
  - User Setting module completed
  - Discrepancy module completed
  - Tracking module completed

  1a. Profile module completed which involve... 
    - getting the current logged in user
    - updating the user profile, both with session data

  2a. General module completed which involve... 
    - posting image Api: This module is a general api that is used for posting image across the app
    - using this module i was able to update other module that required image functionality i.e
      - Inventory module
      - User module
      - Profile module
    - Note in some module UI eg.. "School module" there is an image display but 
      the api does'nt come with one

  3a. User Setting module completed which involve... 
    - getting the current logged in user setting ie language, theme-mode and time zone
    - updating the setting 

  4a. Discrepancy module completed which involve... 
    - getting all Discrepancy and displaying it
    - Viewing the details 
    - Creating a new Discrepancy: Note an admin can't create Discrepancy, only warehouser role users.

  5a. Tracking module completed which involve...
    - Note this module belong to the warehouse users only, so you might not be able to view or get into it.
    - getting all Tracking and displaying it
    - Creating a new Tracking
    - Viewing the details isn't ready, i don't know if it necessary because the UI don't have a view tracking page.
    
 .....Report End


  .....Report Start
 # 03-july-2024
 1. Consumed all avalilable API for other roles in the app
 2. Created a conditional side navigation component for pages that will be used across the app irrespective of the user role
 3. Implemented the margin functionality that calaculates the amount of data added in a single week. 
  .....Report End
  






