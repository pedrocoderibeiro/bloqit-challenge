# bloqit-challenge

This document outlines the code challenge completed for Bloq.it, involving the creation of a CRUD (Create, Read, Update, Delete) application for three entities:

- Bloq
- Locker
- Rent

Relationships:

A Bloq can have multiple Lockers.
A Locker can be associated with multiple Rents (one at a time).
Constraints:

A Locker cannot be used in a new Rent if it's already in use by another Rent.
Only after a Rent's status is updated to "delivered," the associated Locker becomes available for new Rents.
Prerequisites:

To run the application, follow these steps:

Install dependencies: 
1. npm i
2. Prepare TypeScript configuration: npm run build
3. Start the application: npm start (for production)
4. Start the application with Nodemon (for development): npm run dev
5. Run existing tests: npm run test

Technology Stack:
- Express.js (web framework)
- TypeScript (typed superset of JavaScript)
- and a bit of dedication
