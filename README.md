# Eraz License Manager

This is a simple command-line tool for managing licenses in a MongoDB database using Mongoose, a MongoDB object modeling tool for Node.js. The script connects to a MongoDB cluster, defined by a URI and creates a new model called "License" using the Mongoose schema and model. The script includes several functions to generate, update and delete license documents, and also display all licenses. The script uses the readline module to create an interface that prompts the user to enter options and provides relevant information.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js
-   MongoDB account and cluster

### Installing

1.  Clone the repository
```bash
git clone https://github.com/fikiismyname/eraz-license.git
``` 

2.  Install the dependencies
```bash
npm install
``` 

3.  Replace the MongoDB cluster URI in the connect function with your own.
```javascript
mongoose.connect(
  "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
``` 

## Running the script
```bash
node index.js
```  

The script will start running and display the menu options.

## Menu options

1.  **Generate a new license**: Enter the license URL and expiration date. The script will check if the license already exists, and if not, it will create a new document with the provided information.
2.  **Update the expiration date of an existing license**: Enter the license URL and the new expiration date. The script will find the license and update the expiration date.
3.  **Delete an existing license**: Enter the license URL. The script will delete the license that matches the provided URL.
4.  **Display all existing licenses**: The script will display all licenses along with their URLs and expiration dates.
5.  **Exit the application**: The script will exit and stop running.

## Built With

-   [Node.js](https://nodejs.org/) - JavaScript runtime
-   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool for Node.js
-   [MongoDB](https://www.mongodb.com/) - NoSQL database
-   [readline](https://nodejs.org/api/readline.html) - Node.js module for reading input from the command line

## Authors

-   **Fiki Fadilah Putra** - _Wibu Nolep_ - [fikiismyname](https://github.com/fikiismyname)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/fikiismyname/eraz-license/blob/master/LICENSE) file for details.

## Acknowledgments

-   Hat tip to anyone whose code was used
-   OpenAI
-   Inspiration
-   etc

## Note

Make sure to replace the username, password and cluster name in connect function with your own. Also, If you are going to use this code, just make sure to remove the hardcoded URL.
