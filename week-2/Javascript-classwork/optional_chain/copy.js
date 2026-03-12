let data=100;
//create copy
let datacopy=data;

//check
data=200;
console.log("data :",data)
console.log("dataCopy :",datacopy)

let obj={
    a:10,
    b:20
}

//create copy X
//let copyObj=obj;
let copyObj={...obj}

//check
obj.a=1234;
//console.log("obj:",obj)
//console.log("copyobj:",copyObj)



let student1={
    collegeName:"AnuragUniversity",
    collegeAddress:{
        street:"Uppal",
        pincode:500088
    }
}




//let student2={...student1}
let student2=structuredClone(student1)

//check
