# report_generator

Generates the monthly work reports for the company Stefanini

### Requirements

- Node.js version 13 or above;
- perl verions 5 or above
- jdk 11 or above (without this all your java files with be assigned with "BAIXA" complexity)
- git
- bash

### How to install

- `$ git clone https://github.com/igorsodre/report_generator.git`
- `$ cd report_generator`
- `$ npm install`
- `$ chmod u+x generate-report`
- `$ echo "export PATH=\"$(pwd):\$PATH\"" >> ~/.bashrc`

### How to execute

- open the terminal (ctrl + alt + t)
- to generate reports for all git repositories within a given path: `$ generate-report -M -D="/path/to/my/projects/directory/" -A="c0000000" -T="0000000, 1111111, 2222222, 3333333, 4444444, 5555555, 6666666, 7777777"`
- to generate report for a single git repository: `$ generate-report -D="/path/to/my/git/project/" -A="c0000000" -T="0000000, 1111111, 2222222, 3333333, 4444444, 5555555, 6666666, 7777777"`
