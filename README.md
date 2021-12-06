### Please describe your process for approaching the code challenge. What kind of planning did you do? Did your plans change as you began coding?

After reading the assignment requirements, I started by sketching the needed screens to achieve the desired solution.
After that, I worked on choosing the right tools to build the solution:

* Framework: React Native with TypeScript and ESLint
* Database: Firebase Realtime Database with RNFirebase Library for seamless communication
* Navigation: React Navigation
* Testing: Testing Library for React Native

I started the development by creating a Firebase Android project and Realtime Database, and linking those to the React
Native project using RNFirebase, next step was creating the different Types needed throughout the project, after that, I
created the 2 screens needed and the UI elements required. I built the navigation using a NativeStackNavigator to allow
for a scalable screen navigation.

I capitalized on the great Firebase Realtime DB and RNFirebase for networking and DB communication and to keep the app
in sync with the remote DB

### Is there anything you’d like to add or mention in regards to the app design and navigation you chose?

While the app screens could have been managed easily using state and props to show the classroom screen, I chose to
implement navigation using React Navigation to ensure scalability

### If you were given another day to work on this, how would you spend it? What if you were given a month?

I would improve the UI design, add a splash screen, login, improve the DB to have classrooms assigned based on teacher
ID/Authentication 
