/*Timer Functions 
---------------
setTimeout(()={},timeout)
setinterval(()={},timeout)

*/


//Ravi made promise to kiran tha he will call him after 10mins
console.log("Ravi promise to kiran that he will hime after 10mins ")
console.log("kiran is waiting")
let futureAvailability=false;
//Create promise(kiran)
let promiseObj=new Promise((fulfill,reject)=>{
    setTimeout(() => {
        if(futureAvailability==true){
            fulfill("Hello frnd..how are you")

        }else{
            reject("Sorry ..I will call you later")
        }
    },5000);

})



//consume promise(Ravi)
promiseObj
.then((message)=>console.log("Fulfilled:",message))//when promise is fulfilled
.catch((error)=>console.log("Rejected:",error))//when promise is Rejected


//modern way to consume promise(async & await)

/*async function consumePromise() {
    let res=await
    
}*/