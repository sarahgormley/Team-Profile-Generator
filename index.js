const generateHTML = require('./src/generateHTML')

const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const fs = require('fs')
const inquirer = require('inquirer') 

const teamArray = []

const newManager = () => {
  return inquirer.prompt ([
    {
      type:'input',
      name: 'name',
      message: 'What is the managers name?'
    },
    {   
      type:'input',
      name: 'id',
      message: 'Please enter the managers id'
    },
    {
      type:'input',
      name:'email',
      message:'Please enter the managers email'
    },
    {
      type: 'input',
      name:'officeNumber',
      message: 'Please enter the managers office number'
    }
  ])
  .then(managerInput => {
    const {name, id, email, officeNumber} = managerInput;
    const manager = new Manager (name,id,email,officeNumber);

    teamArray.push(manager);
    console.log(manager);
  })
}

const addEmployee = () => {
  console.log(`Adding employees to the team...`);

  return inquirer.prompt ([
    {
      type:'list',
      name:'role',
      message:'Please choose new employee role',
      choices: ['Engineer','Intern']
    },
    {
      type:'input',
      name:'name',
      message:"What's the name of the employee"
    },
    {
      type:'input',
      name:'id',
      message:'Please enter the employee id'
    },
    {
      type:'input',
      name:'email',
      message:"Please enter the employee's email"
    },
    {
      type:'input',
      name:'github',
      message:"Please enter the employee's github"
    },
    {
      type:'input',
      name:'school',
      message:"Please enter the intern's school",
      when: (input) => input.role === "Intern"
    },
    {
      type:'confirm',
      name:'confirmAddEmployee',
      message:'Would you like to add another employee?',
      default:false
    }
  ])
  .then(employeeData => {
    let{ name, id, email, role, github, school, confirmAddEmployee} = employeeData
    let employee

    if (role === "Engineer") {
      employee = new Engineer (name, id, email, github)
      console.log(employee)
    } 
    else if (role === "Intern") {
      employee = new Intern (name, id, email, school)
      console.log(employee)
    }
    teamArray.push(employee)

    if(confirmAddEmployee) {
      return addEmployee(teamArray)
    } 
    else {
      return teamArray
    }
  })
}

const writeFile = data => {
  fs.writeFile('./dist/indexhtml', data, err => {
    if(err) {
      console.log(err)
      return
    } else {
      console.log("Your new employee data has been a success")
    }
  })
}

newManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray)
  }) 
  .then(pageHTML => {
    return writeFile(pageHTML)
  })
  .catch(err => {
    console.log(err)
  })