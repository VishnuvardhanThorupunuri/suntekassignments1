 let enrollmentDeadline = new Date("2026-01-20");
 date1=new Date("2026-01-18")
 date2=new Date("2026-01-26")

 function validation(date){
 if(date < enrollmentDeadline||date == enrollmentDeadline){
    console.log("Enrollment Open")
 }else{
    console.log("Enrollment Closed")
 }
}
validation(date1)
validation(date2)
