# Centrepoint Alumni help

An app to allow former Centrepoint residents request their Centrepoint housing information, and to allow administrators to view and manage requests.

## User stories: ex-resident

**As a** former resident of Centrepoint  
**I would like** to access Centrepoint alumni network  
**so that** I can request my former address with a verified ID    

**As a** former resident of Centrepoint  
**I would like** the app to look similar to The Point  
**so that** I know that they are both part of the Centrepoint ex-resident network  

**As a** former resident of Centrepoint  
**I would like** the app to work on both mobile and desktop  
**so that** access it regardless of whichever platform I have access to  

**As a** former resident of Centrepoint  
**I would like** to know what type of information I can request  
**so that** I don't waste time with Yoti authentication  

**As a** former resident of Centrepoint  
**I would like** to log in to Yoti quickly and easily  
**so that** I am authenticated with Centrepoint  

**As an** authenticated user  
**I want like** to know that my authentication was successful  
**so that** I can be confident that I will receive the requested data  

**As a** former resident of Centrepoint  
**I would like** to be able to see options to request my address history, a tenancy reference and my rent arrears report  
**so that** I get the document I require for housing and benefits  

**As a** former resident of Centrepoint  
**I would like** to have the option of entering additional information  
**so that** I ensure I get the relevant data  

**As a** former resident of Centrepoint  
**I would like** to have options to be contacted by mail or e-mail  
**so that** receive the requested information quickly and reliably  

**As a** former resident of Centrepoint  
**I would like** the app to look simple, and the form data to be easy to input  
**so that** be confident that I have put in all the data correctly

**As a** former resident of Centrepoint  
**I would like** to know long it would take for Centrepoint to contact me  
**so that** I know when I will get my information (and that they will get in touch by phone if there are any questions)  

**As a** former resident of Centrepoint  
**I would like** to stay logged in until I log out  
**so that** I am authenticated with the app when (and only when) I'm using it

## User stories: admin

**As a** Centrepoint admin  
**I would like** to access the ex-resident app dashboard  
**so that** I can view all requests for housing data from ex-residents

**As a** Centrepoint admin  
**I would like** to log in to Yoti quickly and easily  
**so that** I am authenticated with Centrepoint

**As a** Centrepoint admin  
**I would like** to make sure that only administrators can view the dashboard  
**so that** ex-residents data is not revealed to external visitors

**As a** Centrepoint admin  
**I would like** to see a list of all data requests from ex-residents  
**so that** I know what requests have been made and need my attention

**As a** Centrepoint admin  
**I would like** to see which data requests from ex-residents are open and which closed  
**so that** I know which requests to focus on

**As a** Centrepoint admin  
**I would like** to see when each of the requests was made  
**so that** I know which requests to give priority to

**As a** Centrepoint admin  
**I would like** to be able to change a request status from open to closed once I have processed it  
**so that** I know that it doesn't need my attention any more

**As a** Centrepoint admin  
**I would like** to be able to filter requests based on whether they are open or closed  
**so that** I can see a list of all requests I am interested in more clearly

**As a** Centrepoint admin  
**I would like** to stay logged in until I log out  
**so that** I am authenticated with the dashboard when (and only when) I'm using it

**As a** Centrepoint admin  
**I would like** to be able to add admin privileges to colleagues at Centrepoint  
**so that** they can view and work on requests from the dashboard as well

## Wireframes: ex-resident app

<img src="./wireframes/wireframes-12.JPG" height="400"/>
<img src="./wireframes/wireframes-34.JPG" height="400"/>

## Wireframes: admin dashboard

<img src="./wireframes/Dashboard.png" width="500"/>
<img src="./wireframes/Dashboard-open-req.png" width="500"/>

## App flow

<img src="./wireframes/app-flow.png" width="450"/>

## Database schema

<img src="./wireframes/db-schema.png" width="300"/>

## Design decisions

Fonts and colours were taken to match those at https://centrepoint.org.uk

#### Fonts

- Body text: Lato (regular)
- Headings: Oswald (regular)
- Fallbacks: Sans-Serif

#### Colour palette
- color1: rgb(54,54,54);
- color2: rgb(233,230,220);
- color3: rgb(209,68,20);
- color4: rgb(255,209,65);
- color5: rgb(246,246,246);

## Technical decisions

### Platform: ex-resident app
- Mobile-first web app
- Should be able to work well on older smartphones with smaller screens

### Platform: admin dashboard
- Desktop web app
- Office use friendly

### Tech stack
- Front-end: HTML, CSS, Materialize, JavaScript (jQuery)
- Back-end: Node.js, Hapi.js, Handlebars, Postgres
- Authentication: Yoti

## Installation instructions

- Clone this repo and `cd` into it
- Install Postgres ([see here for instructions](https://github.com/dwyl/learn-postgresql))
- Enter Postgres command line tool (`psql postgres` on Mac)
- Create database by typing `CREATE DATABASE exresident_requests;`
- Ask us for the database password
- Add user 'centrepoint' and assign as the owner of the database:  
  `CREATE USER centrepoint WITH SUPERUSER PASSWORD 'password-here';`  
  `ALTER DATABASE exresident_requests OWNER TO centrepoint;`
- Create a `config.env` file with the following two lines:  
  `export DB_URL = postgres://centrepoint:password-here@localhost:5432/exresident_requests`
  `export DB_MAX_CONNECTIONS = 2`   
- Run `npm install` to install all dependencies
- Run `npm run build` to build the database
- Run `npm start` to start the server
- Navigate to `http://localhost:9443/` in your browser

#### In order to set up an HTTPS server
- generate a key file for your certificate  ($ openssl genrsa -out key.pem 2048)
- generate an intermediate file (csr)  ($ openssl req -new -key key.pem -out csr.pem)
- generate a certificate file, using the key and csr ($ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem)
- remove the intermediate csr file
