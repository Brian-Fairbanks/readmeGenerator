function makeHTML(data, gitData){

return `![user profile image](${gitData.avatar_url})
# ${data.title}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#contributing)
* [License](#license)

## Installation
${data.installation}
## Usage
${data.usage}
## License
${data.license}
## Contributing
${data.contributing}
## Tests
${data.tests}
## Questions
${data.questions}
`;
}

module.exports = {
    make: (data, gitData)=>makeHTML(data, gitData)
}
