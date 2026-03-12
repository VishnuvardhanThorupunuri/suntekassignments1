function validateTitle(title){
    if(title.length==0){
        return "Title is empty"
    }
    if(title.length<3){
        return "Title should hava min of 3 chars"
    }
    return true;
}

export function validateProperty(property){

}

export function validateDuedate(date){

}

//export {validateTitle,validateProperty,validateTitle}