# Centrepoint Alumni help

An app to allow former Centrepoint residents access their Centrepoint address history and information that they may require for their new tenancy agreements.

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

## User stories

**As a** former resident of Centrepoint  
**I would like** to access Centrepoint alumni network  
**so that** I can request my former address with a verified ID    

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
**I would like** to know long it would take for Centrepoint to contact me  
**so that** I know when I will get my information (and that they will get in touch by phone if there are any questions)  

## Project plan

### Wednesday

- Design app flow & storyboards
- Decide on fonts & colours
- Create README
- Set up landing & confirmation pages
- Set up basic back-end
- Set up Yoti authentication

### Thursday

- Set up housing data page
- Set up thank you page
- Styling and animations

### Friday

- Set up back-end for remaining pages
- Styling and animations
- Prepare for demo & presentation

## App flow

<img src="./wireframes/app-flow.png" width="400"/>

## Ex-resident app wireframes

<img src="./wireframes/wireframes-12.JPG" width="400"/>
<img src="./wireframes/wireframes-34.JPG" width="300"/>

## Admin dashboard wireframes

<img src="./wireframes/Dashboard.png" width="500"/>
<img src="./wireframes/Dashboard-open-req.png" width="500"/>

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

### Platform
- Mobile-first web app to ensure wide access
- Should be able to work well on older smartphones with smaller screens

### Tech stack - currently implemented
- Front-end: HTML, CSS, Materialize, JavaScript (jQuery)
- Back-end: Node.js, Hapi.js
- Authentication: Yoti
