// set up included packages
const fs = require('fs');
const axios = require("axios");
const inquirer = require("inquirer");


const questions = [
    {name:"username", message:"Enter your GitHub username: "}
];

function writeToFile(fileName, data) {
}

function init() {
    // get github username
    inquirer
    .prompt([
        {
            message: questions[0].message,
            name: questions[0].name
        },
        {
            message:"Enter the title of your project: ",
            name: 'title'
        },
        {
            message:"Enter the description of your project: ",
            name: 'description'
        },
        {
            message:"Enter details for how to install your application: ",
            name: 'installation'
        },
        {
            message:"Enter instructions for how to use your application: ",
            name: 'usage'
        },
        {
            message:"Enter information about your licensing: ",
            name: 'license'
        },
        {
            message:"Enter the names of additional contributors: ",
            name: 'contributing'
        },
        {
            message:"Enter details aobout your testing: ",
            name: 'tests'
        },
        {
            message:"Enter any additional questions: ",
            name: 'questions'
        },
    ])
    .then(function( {username, title, description, installation, usage, license, contributing, tests, questions} ) {
        // make call to github api...
        const queryUrl = `https://api.github.com/users/${username}`;
    
        axios
        .get(queryUrl)
        .then(function (response){
            // to get email and profile picture
            // console.log(response);
            const{email, avatar_url} = response.data;
            //console.log(`${email} | ${avatar_url}`);
            return {avatar_url, email};
        })
        .then(function(data){
            let readme = `
![user profile image](${data.avatar_url})
# ${title}
## Description
${description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#contributing)
* [License](#license)

## Installation
${installation}
## Usage
${usage}
## License
${license}
## Contributing
${contributing}
## Tests
${tests}
## Questions
${questions}
`
            fs.writeFile("read.md", readme, function(err){
                if (err){return console.log(err);}
                console.log("Written");

            })
        })
    });
}

init();
