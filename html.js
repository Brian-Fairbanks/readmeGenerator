function makeHTML(data, gitData){
    badgeString = "";
    for (const badge of data.badges.split(";")){
        let[label, message] = badge.split(",")
        badgeString+=`![${label}badge](https://img.shields.io/static/v1?label=${label}&message=${message.split(" ").join("%20")}&color=success)`;
    }
return `
# ${data.title} ${badgeString}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#contributing)
* [Testing](#tests)
* [Questions](#questions)

## Installation
${data.installation}
## Usage
${data.usage}
## License
${data.license}
## Contributing
${data.contributing}
![user profile image](${gitData.avatar_url}) | ${data.email==null?"email not found":data.email}
## Tests
${data.tests}
## Questions
${data.questions}
`;
}

module.exports = {
    make: (data, gitData)=>makeHTML(data, gitData)
}
