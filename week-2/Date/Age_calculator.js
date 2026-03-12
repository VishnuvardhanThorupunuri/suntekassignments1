let dob ="2000-05-15";

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear()-birthDate.getFullYear();

    //Check if birthday has occured this year
    const monthDiff = today.getMonth()-birthDate.getMonth();
    const dayDiff = today.getDate()-birthDate.getDate();

    if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

console.log("Exact Age:",calculateAge(dob),"years");