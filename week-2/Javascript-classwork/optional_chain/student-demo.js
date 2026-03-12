let student={
    rollNo:1,
    name:"ravi"
}

console.log(student.rollNo)//1
console.log(student.name)//*ravi*//
console.log(student.city)//undefined
//? optional chaining ,?? " " Nullish coalescing//
console.log(student.city?.length??"Property not existed")//undefined.length