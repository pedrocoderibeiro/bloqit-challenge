# bloqit-challenge

This is the code challenge i did for Bloq.it, where i add to create a crud for 3 entities bloq, locker and rent
Where a bloq has multiple lockers and a locker can have multiple rents

Basically here i decided that it made sense for me that a locker can't be used in a rent, if its already being used by another one
so only after a rent has had an update on it's status to delivered, i allowed a another one to be associated to it and reset the locker to be un occupied

So to get started we need to run the following commands

npm i to install all the dependencies we have
npm run build to prepare the tsconfig
npm start so we can start the application
npm run dev to run nodemon
npm run test to run all tests that exist pre entity


Made with Express, Typescript and <3
