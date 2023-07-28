// Define the alarmList variable outside the setAlarm function
const alarmList = document.getElementById("alarms");
const stopDiv = document.querySelector('.stopBtn')
// Function to update the live clock display
function updateClock() {
  const clockDisplay = document.getElementById("clockDisplay");
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clockDisplay.innerText = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Function to set an alarm
function setAlarm() {
  const alarmDateTimeInput = document.getElementById("alarmDateTime");
  const alarmDateTime = new Date(alarmDateTimeInput.value).getTime();
  const now = new Date().getTime();

  if (isNaN(alarmDateTime) || alarmDateTime <= now) {
    alert("Please select a valid future date and time.");
    return;
  }

  const alarmItemDiv = document.createElement("div");
  alarmItemDiv.className = "alarm-item";

  // Create a span for the alarm date and time
  const alarmDateTimeSpan = document.createElement("span");
  alarmDateTimeSpan.innerText = new Date(alarmDateTime).toLocaleString();
  alarmItemDiv.appendChild(alarmDateTimeSpan);

  // Create a delete icon using the <i> tag from Font Awesome
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt delete-icon";
  deleteIcon.addEventListener("click", deleteAlarm);
  alarmItemDiv.appendChild(deleteIcon);

  alarmList.appendChild(alarmItemDiv);

  alarmDateTimeInput.value = ""; // Reset the input field after setting the alarm
  // Calculate the time remaining until the alarm goes off
  const timeUntilAlarm = alarmDateTime - now;

  // display stop btn
  // const stopDiv = document.querySelector('.stopBtn')
  // Set a timeout to trigger the alert at the specified alarm time
  setTimeout(function () {
    alert("Alarm on time!");
    // Your logic to play the alarm sound or take any other actions when the alarm goes off on time
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.play();
    stopDiv.style.display = 'block'
  }, timeUntilAlarm);
}

// Function to delete an alarm
function deleteAlarm(event) {
  const alarmItem = event.target.parentElement;
  alarmList.removeChild(alarmItem);
}

function stopAlarm(){
  alarmSound.pause()
  stopDiv.style.display = 'none'
  const alarm = document.querySelector('.alarm-item')
  alarm.remove()
}

// Set the click event for the "Set Alarm" button
document.getElementById("setAlarmBtn").addEventListener("click", setAlarm);
