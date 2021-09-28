## MyRant 
MyRant is a web-based app that enables users to post rants about tech blog and comment on their or other user's posts. 

### Design And Technologies
The app implements the MVC design pattern. Technologies used include: 

1. Handlebars
2. Sequelize
3. Session management
4. Express routes

### Model
The model represents the backend database that stores the users, posts and comments. Sequelize was used to create the models and define the relationships. 

MySQL2 and Jawsdb were used to store the data

### View
The view is what the user sees as the end product. 
The view was implemented using handlebars to dynamically display the posts and comments 

### Controller
Using the express.js routes, the incoming data was added/updated/deleted from the database as requested by the user. 
Sessions were used to manage user login/logout

### Usage
To install the app locally you can run 

```
npm install 
npm start
```

Create an account and login to be able to post and comment. You can view posts without logging in. 

## Links
The app can also be used from the deployed version on heroku
[Heroku Deployment](https://myrants.herokuapp.com/)

## Contributing
contact Ray Ashir ray.dev.seng@gmail.com
## Test
n/a
## Questions
[Github rashir01](https://github.com/rashir01)