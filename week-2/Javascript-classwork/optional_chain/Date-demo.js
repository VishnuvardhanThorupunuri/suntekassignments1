/*Get Date Components (Local Time)






/*Set Date Components(Local time)

//new Date(yyyy,mm,ds)- yyyy-date,hh:mm:ss-Time,sss-milliseconds,



//IST=UTC+5.30
//A Javascript Date object stores time as a UTC timestamp internally



//Create Date
let date1=new Date()
//console.log("date1 is ",date1)//ISO Standard Time
//console.log(date1.toString())

//console.log(Date.now())
let date2=new Date("2022-1-22")
let date3=new Date(2026,0,21)
let date4=new Date(Date.now())
let date5=new Date(2026,0)//default
let date6=new Date(2026,0,0)

console.log(date5.toString())//toString- to get time in normal standard
*/
let date1=new Date(2022,0,1)
let date2=new Date(2024,0,1)

//find difference
if(date1>date2){
    [date1,date2]=[date2,date1]
}

//find years
let year=date2.getFullYear()-date1.getFullYear()
let months=date1.getMonth()-date1.getMonth()
let days=date




if(months<0){
    years--;
    months=months+12
}
if(days<0){
    months--;
    
}
console.log()