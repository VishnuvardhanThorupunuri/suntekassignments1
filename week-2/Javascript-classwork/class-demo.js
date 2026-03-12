let person1={
    pid:100,
}

let person2={
    pid:200,
}

//create 100 person objects
//create person datatype
    class Person{
        //props
        pid;
        #age;
        static collegeName;
        //methods

        static{
            Person.collegeName='anurag'
        }
        constructor(pid,age){
            this.pid = pid;
            this.#age = age;
        }

        getPersondata(){
            console.log(this.pid,this.#age);
        }
    }

    //create objects of Person type
    let p1=new Person(100,21);
    let p2=new Person(200,19);

    //methods call on the objects
    
    p1.getPersondata()
    p2.getPersondata()

