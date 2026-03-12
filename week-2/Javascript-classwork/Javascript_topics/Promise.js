let PreparingforExams=true;

let promiseObj=new Promise((fulfill,notfulfill)=>{
    setTimeout(()=>{
        if(PreparingforExams==true){
            fulfill("I got first rank")
        }else{
            not-fulfill("I did not got first rank")
        }
    },5000);
})

promiseObj
.then((message)=>console.log("Fulfilled:",message))//when promise is fulfilled
.catch((error)=>console.log("Notfulfilled:",error))//when promise is Rejected