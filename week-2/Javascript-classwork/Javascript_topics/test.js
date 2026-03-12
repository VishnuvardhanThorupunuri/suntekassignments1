//API
//JSON (Javascript Object Notation)
let student={
    sno:1,
    name:'ravi',
    age:19
}
let studentJson={
    "sno":1,
    "name":"ravi",//In Json "" are only accepted but not the ''
    "age":19
}
console.log(typeof student)//object


//JSON to JS object
let studentJSON=JSON.stringify(student)
console.log(typeof studentJSON)

//JSON to JS object
let data=JSON.parse('{"sno":1,"name":Ravi,');