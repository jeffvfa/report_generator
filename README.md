# report_generator

Generates the monthly work reports for the company Stefanini

### Requirements

- Node.js version 12 or above;
- perl verions 5 or above
- jdk 8 or above
- git
- bash

### How to install

```
$ sudo apt install build-essential
$ git clone https://github.com/igorsodre/report_generator.git
$ cd report_generator
$ npm install
$ chmod u+x generate-report
$ echo "export PATH=\"$(pwd):\$PATH\"" >> ~/.bashrc
$ source ~/.bashrc
```

### How to write commit messages

To use report_generator your commit messages must be written on the format bellow:
- `task <ALM_TASK_NUMBER> <COMMIT_MESSAGE>`
- `EG.: task 1324567 fix bug in file xxx`

### How to execute

- open the terminal
- to generate reports for all git repositories within a given path:
- `$ generate-report -M -D="/path/to/my/projects/directory/" -A="c0000000" -T="0000000, 1111111, 2222222, 3333333, 4444444, 5555555, 6666666, 7777777"`

- to generate report for a single git repository:
- `$ generate-report -D="/path/to/my/git/project/" -A="c0000000" -T="0000000, 1111111, 2222222, 3333333, 4444444, 5555555, 6666666, 7777777"`

```
OBS.: Your path must contain '/' in the end.
Wrong path: "/kdi/git"
Correct path: "/kdi/git/"

Wrong path: "/home/myuser/Documents/Projects"
Correct path: "/home/myuser/Documents/Projects/"

Wrong path: "/home/myuser/meus_repositorios"
Correct path: "/home/myuser/meus_repositorios/"
```
