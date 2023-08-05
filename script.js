setInterval(()=>{                                      //Digital clock using Date in built function
    let curr_hour = document.getElementById('curr-hours')
    let curr_mins = document.getElementById('curr-mins')
    let curr_secs = document.getElementById('curr-secs')
    var present = new Date()
    curr_hour.innerHTML= present.getHours()>12 ? present.getHours()-12 : present.getHours() //converting 24 format to 12 hour format
    curr_mins.innerHTML=present.getMinutes()
    curr_secs.innerHTML=present.getSeconds()
    })


let alarm = [];                       //Array to store objects created 


let set_alarm = document.getElementById('set-btn');
let input_hour = document.getElementById('input-hours');
let input_mins = document.getElementById('input-mins');
let input_secs= document.getElementById('input-secs')
let alarm_list = document.getElementById('alarm-list');
let time_zone = document.getElementById('input-zone');

function addalarm(){
    if(input_hour.value>12|| input_mins>60|| input_secs>60){      //input not exceeding the timiongs value
        alert('Enter Valid number')
        clearInputs()
        return
    }
    else{
        let hour = input_hour.value;
        let mins = input_mins.value;
        let secs = input_secs.value;
        let zone = time_zone.options[time_zone.selectedIndex].value;
        
        let time = {                  //creating an object to store in the array
        hour,
        mins,
        secs,
        zone
    }
    alarm.push(time)

    createlist()
    clearInputs()
    
    }
}

function createlist(){                         //fields that are created on clicking set alarm button
    let LI = document.createElement("li");
    LI.innerHTML=input_hour.value;
    alarm_list.appendChild(LI);
    let colon1 = document.createElement("span");
    colon1.innerHTML=":"
    LI.appendChild(colon1)
    let minutes = document.createElement("span");
    minutes.innerHTML=input_mins.value;
    LI.appendChild(minutes)
    let colon2 = document.createElement("span");
    colon2.innerHTML=":"
    LI.appendChild(colon2)
    let seconds = document.createElement("span");
    seconds.innerHTML=input_secs.value;
    LI.appendChild(seconds)
    let AM_PM = document.createElement('span');
    AM_PM.innerHTML= time_zone.options[time_zone.selectedIndex].value;
    LI.appendChild(AM_PM)
    let remove = document.createElement("button");
    remove.innerHTML="Delete";
    LI.appendChild(remove)

    setInterval(checkalarm)                             //to keep a track on created alarm-list
    
    
}
function clearInputs(){                            // clears the input fields after pushing it to array
    input_hour.value="";
    input_mins.value=""
    input_secs.value=""

}

function checkalarm(){                            //to check alarm list and keep a track on it
    var present = new Date();
    var curr_hour = present.getHours()>12 ? present.getHours()-12 : present.getHours()
    var curr_mins = present.getMinutes();
    var curr_secs = present.getSeconds();
    var curr_zone = present.getHours()>12 ? "PM" : "AM";
    for(var i=0;i<alarm.length;i++){
        if(alarm[i].hour==curr_hour && alarm[i].mins==curr_mins       //iterates through each objects in the array and it fetches the required fields
            && alarm[i].secs==curr_secs && alarm[i].zone==curr_zone ){
            alert('Done')
        }
    }
}

alarm_list.addEventListener('click',function (e){   //deleting from the array and also removing from UI
    if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
        alarm.splice(e,1)
    }
},false)

set_alarm.addEventListener('click',addalarm)


