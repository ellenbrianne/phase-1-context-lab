let employee = ["Ellen", "Bennett", "RN", 38]

let multipleEmployees = [
    ["Josie", "Stiles", "Simtech", 60], 
    ["Ellen", "Bennett", "RN", 38]
]

let employeeObject = createEmployeeRecord(employee)
let employeeObjects = createEmployeeRecords(multipleEmployees)

function createEmployeeRecord (array) {
    let employeeObject = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObject
}

function createEmployeeRecords (array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent (date) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(date.slice(11), 0),
        date: date.slice(0, 10)
    }
    //(Array.prototype.map.call(this, (array) => array.timeInEvents.push(timeIn)))
    this.timeInEvents.push(timeIn)

    return this
}

function createTimeOutEvent (date) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(date.slice(11), 0),
        date: date.slice(0, 10)
    }

    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate (date) {
    let hoursWorked
    let timeIn = []
    let timeOut = []

    this.timeInEvents.map((object) => {
        timeIn.push(object.hour)
    })

    this.timeOutEvents.map((object) => {
        timeOut.push(object.hour)
    })

    let timeInWorked = this.timeInEvents.find((event) => {
        return event.date == date
    })

    let timeOutWorked = this.timeOutEvents.find((event) => {
        return event.date == date
    })

    hoursWorked = parseInt(((timeOutWorked.hour - timeInWorked.hour) / 100), 10)

    return hoursWorked
}

function wagesEarnedOnDate (date) {
    let returnHours = hoursWorkedOnDate.call(this, date)
    let payOwed = parseInt((returnHours * this.payPerHour), 10)
    return payOwed
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (collection, firstNameString) {
   let match 

   collection.map((array) => {
    if (array.firstName == firstNameString) {
        match = array
    } 
   })
   return match
}

function calculatePayroll (array) {
    let reducedReturn = array.reduce((prev, curr) => {
        return prev + allWagesFor.call(curr)
    }, 0)

    return reducedReturn
}