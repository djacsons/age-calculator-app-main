const dayInput = document.getElementById('topDay')
const monthInput = document.getElementById('topMonth')
const yearInput = document.getElementById('topYear')
const topChildren = document.getElementsByClassName('topChildren')
const outputNums = document.getElementsByClassName('nums')
const bottomNames = document.getElementsByClassName('bottomName')
const inputErrors = document.getElementsByClassName('inputError')
const inputs = document.getElementsByClassName('inputs')
let userDay
let userMonth
let userYear
let invalidNum
//current date and time:
const date = new Date()
let day = date.getDate()
let month = date.getMonth()+1
let year = date.getFullYear()
monthDays = (monthNum)=>{
    let arr1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return arr1[monthNum-1]
}
valueEmpty = ()=>{
    if (dayInput.value == '' || monthInput.value == '' || yearInput.value == '')
        return true
    else return false
}
validEntry = ()=>{
    if (Number(dayInput.value)<=31&&Number(dayInput.value)>0){
        if (Number(monthInput.value)<=12&&Number(monthInput.value)>0){
            if (Number(yearInput.value)<=Number(year)) return true
            else {
                invalidNum = 2
                return false
            }
        }
        else {
            invalidNum = 1
            return false
        }
    }
    else {
        invalidNum = 0
        return false
    }
}
notInPast = ()=>{
    if (Number(year)>Number(yearInput.value)) return false
    else if (Number(year)<Number(yearInput.value)) return true
    else if (Number(year)==Number(yearInput.value)){
        if (Number(month)>Number(monthInput.value)) return false
        else if (Number(month)==Number(monthInput.value)){
            if (Number(day)>Number(dayInput.value)) return false
            else if (Number(day)<=Number(dayInput.value)) return true
        }
        else return true
    }
    else return true
}
yearCorrectionNeeded = ()=>{
    if (Number(month)<Number(monthInput.value)){
        return true
    }
    else if (Number(month)==Number(monthInput.value)){
        if (Number(day)<Number(dayInput.value)){
            return true
        }
        else return false
    }
    else return false
}
monthCounter = ()=>{
    if (validEntry()){
        if (Number(monthInput.value)<Number(month)){
            return (Number(month)-Number(monthInput.value))
        }
        else if ((Number(monthInput.value)==Number(month))&&(Number(dayInput.value)>Number(day))) return 11
        else{
            let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            let i = month-1
            let months = 0
            while (arr1.slice(i)[0]!=Number(monthInput.value)){
                i--
                months++
            }
            return months
        }  
    }
}
dayCounter = ()=>{
    if (month==monthInput.value){
        if (Number(day)<Number(dayInput.value)){
            return day
        }
        else return (Math.abs(Number(day)-Number(userDay)))
    }
    else{
       return (Math.abs(Number(day)-Number(userDay)))
    }
    
}
dateIsWrong = ()=>{
if (monthDays(Number(monthInput.value))<Number(dayInput.value)) return true
else return false
}
mainFunction = ()=>{
    for (let i = 0; i < 3; i++){
        if (!topChildren[i].childNodes[5].classList.contains('invisible')){
            topChildren[i].childNodes[5].classList.add('invisible')
        }
        topChildren[i].childNodes[1].style.color = 'hsl(0, 1%, 44%)'
        inputs[i].style.border = '1px solid rgb(164, 164, 164)'
    }
    
    if (yearCorrectionNeeded()) outputNums[0].innerText = (Number(year)-Number(userYear)-1).toString()
    else if (!yearCorrectionNeeded()) outputNums[0].innerText = (Number(year)-Number(userYear)).toString()
    outputNums[1].innerText = monthCounter().toString()
    outputNums[2].innerText = dayCounter().toString()
    
}
checkSingular = ()=>{
    for (let i = 0; i < 3; i++){
        if (outputNums[i].innerHTML == '1'){
            switch (i) {
                case 0:
                    bottomNames[0].innerHTML = 'year'
                    break;
                case 1:
                    bottomNames[1].innerHTML = 'month'
                    break;
                case 2:
                    bottomNames[2].innerHTML = 'day'
                    break;
                default:
                    break;
            }
        }
        else{
            switch (i) {
                case 0:
                    bottomNames[0].innerHTML = 'years'
                    break;
                case 1:
                    bottomNames[1].innerHTML = 'months'
                    break;
                case 2:
                    bottomNames[2].innerHTML = 'days'
                    break;
                default:
                    break;
            } 
        }

    }
}
errorSwitch = ()=>{
    for (let i = 0; i < 3; i++){
        if (inputs[i].value == ''){
            inputErrors[i].innerHTML = 'This field is required'
        }
    }
    if (Number(dayInput.value)>31||Number(dayInput)<0){
        inputErrors[0].innerHTML = 'Must be a valid day'
    }
    else if (Number(monthInput.value)>12||Number(monthInput)<1){
        inputErrors[1].innerHTML = 'Must be a valid month'
    }
    else if(notInPast()){
        inputErrors[2].innerHTML = 'Must be in the past'
    }
    else if (dateIsWrong()){
        inputErrors[0].innerHTML = 'Must be a valid date'
    }
}
errorReveal = ()=>{
    //to change input borders:
    if(valueEmpty()){
        for (let i = 0; i < 3; i++){
            if (topChildren[i].childNodes[3].value == ''){
                topChildren[i].childNodes[1].style.color = 'hsl(0, 100%, 67%)'
                topChildren[i].childNodes[5].classList.remove('invisible')
                inputs[i].style.border = '1px solid hsl(0, 100%, 67%)'
            }
            outputNums[i].innerHTML = '--'
        }
        errorSwitch()
    }
    else if (dateIsWrong()){
        for (let i = 0; i < 3; i++){
            topChildren[i].childNodes[1].style.color = 'hsl(0, 100%, 67%)'
            outputNums[i].innerHTML = '--'
            inputs[i].style.border = '1px solid hsl(0, 100%, 67%)'
        }
        topChildren[0].childNodes[5].classList.remove('invisible')
        errorSwitch()
        for (let i = 1; i < 3; i++){
            topChildren[i].childNodes[5].classList.add('invisible')
            if (topChildren[0].childNodes[5].innerHTML == 'Must be a valid day'){
                topChildren[i].childNodes[1].style.color = 'hsl(0, 100%, 67%)'
                outputNums[i].innerHTML = '--'
                topChildren[i].childNodes[1].style.color = 'hsl(0, 1%, 44%)'
                inputs[i].style.border = '1px solid rgb(164, 164, 164)'
            }
        }
    }
    else if (notInPast()){
        for (let i = 0; i < 3; i++){
            outputNums[i].innerHTML = '--'
        } 
        topChildren[2].childNodes[1].style.color = 'hsl(0, 100%, 67%)'
        topChildren[2].childNodes[5].classList.remove('invisible')
        inputs[2].style.border = '1px solid hsl(0, 100%, 67%)'
        errorSwitch()
    }
    else if (!validEntry()){
        topChildren[invalidNum].childNodes[1].style.color = 'hsl(0, 100%, 67%)'
        topChildren[invalidNum].childNodes[5].classList.remove('invisible')
        inputs[invalidNum].style.border = '1px solid hsl(0, 100%, 67%)'
        errorSwitch()
    }
}
mainButton =() => {
    userDay = dayInput.value
    userMonth = monthInput.value
    userYear = yearInput.value
    
    if (validEntry()&&!valueEmpty()&&!dateIsWrong()){
        mainFunction()
    }
    else if ((!validEntry()||valueEmpty()||dateIsWrong())){
        errorSwitch()
        errorReveal()
    }
    checkSingular()
}