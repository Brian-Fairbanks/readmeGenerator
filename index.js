/*=========================================================================================
=  Variables
========================================================================================= */
// set up included packages
const fs = require('fs');
const util = require('util')
const axios = require("axios");
const inquirer = require("inquirer");
const readme = require("./html.js")

// promisify
const writeFileAsync = util.promisify(fs.writeFile);

//questions
const questions = [
    {
        message:"Enter your GitHub username: ",
        name:"username" 
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
    }
];

/*=========================================================================================
=  Functions
========================================================================================= */
function writeToFile(fileName, data) {
}

function promptUser(){
    // get github username
    return inquirer
    .prompt(
        questions
    )
}

async function init() {
    try{
        // await till user returns all data needed
        const data = await promptUser();

        // set up query url to...
        const queryUrl = `https://api.github.com/users/${data.username}`;
        
        //make call to github api
        const gitData = await axios
        .get(queryUrl)
        .then(function (response){
            // and return email and profile picture
            const{email, avatar_url} = response.data;
            return {avatar_url, email};
        })

        // get data written out into a readme...
        const site = readme.make(data, gitData);

        // write data to file
        await writeFileAsync("read.md", site, "utf8");
        console.log("Succsessfully wrote file");
    }
    // print error if anything happens along the way
    catch (err){
        return console.log(err);
    }
}


init();
