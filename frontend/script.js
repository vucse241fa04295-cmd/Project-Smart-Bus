alert("JS Loaded Successfully");

// =======================
// MAP
// =======================

var map = L.map('map').setView([16.3067, 80.4365], 13);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom: 19
}
).addTo(map);

// Moving Bus Demo

let lat = 16.3067;
let lng = 80.4365;

let busMarker = L.marker([lat,lng])
.addTo(map)
.bindPopup("🚌 SmartBus AI Bus");

setInterval(()=>{

lat += 0.0002;
lng += 0.0002;

busMarker.setLatLng([lat,lng]);

},3000);


// =======================
// AI DELAY PREDICTION
// =======================

function predictDelay(speed, occupancy){

let loadFactor = (occupancy / 40) * 100;

if(speed >= 35 && loadFactor < 60){
return "🟢 Arriving Early";
}

if(speed < 15 || loadFactor >= 95){
return "🔴 Delay Expected";
}

return "🟡 On Route";
}


// =======================
// PAGE LOAD
// =======================

window.addEventListener("DOMContentLoaded",()=>{

const aiStatus =
document.getElementById("aiStatus");

if(aiStatus){

aiStatus.innerHTML =
predictDelay(20,25);

}

});


// =======================
// AI ASSISTANT
// =======================

function openAI() {

document.getElementById("popupPanel").innerHTML = `

<div class="popup">

<h2>🤖 SmartBus AI Assistant</h2>

<button onclick="alert('📍 Bus VU-01 is near Guntur')">
Where is my Bus?
</button>

<button onclick="alert('⏱️ ETA: 8 Minutes')">
Bus ETA
</button>

<button onclick="alert('🚌 Route: Vignan University → Guntur')">
Route Information
</button>

<button onclick="alert('👨‍✈️ Driver: Ramesh Kumar')">
Driver Details
</button>

<button onclick="alert('💺 Available Seats: 12')">
Seat Availability
</button>

<button onclick="alert('✅ Attendance: Present')">
Attendance Status
</button>

<button onclick="closePopup()">
❌ Close
</button>

</div>

`;

document.getElementById("popupPanel").style.display = "flex";

}


// =======================
// SOS
// =======================

function sendSOS() {

document.getElementById("popupPanel").innerHTML = `

<div class="popup">

<h2>🚨 Emergency SOS Center</h2>

<button onclick="alert('🚑 Medical Emergency Alert Sent')">
Medical Emergency
</button>

<button onclick="alert('🚌 Bus Breakdown Reported')">
Bus Breakdown
</button>

<button onclick="alert('🛡️ Student Safety Alert Sent')">
Student Safety Issue
</button>

<button onclick="alert('🚨 Accident Alert Sent')">
Accident Report
</button>

<button onclick="alert('📞 Driver Contact: 9876543210')">
Contact Driver
</button>

<button onclick="alert('🏫 Transport Office Contact: 9876543211')">
Transport Office
</button>

<button onclick="closePopup()">
❌ Close
</button>

</div>

`;

document.getElementById("popupPanel").style.display = "flex";

}


// =======================
// ATTENDANCE
// =======================

function markAttendance() {

document.getElementById("popupPanel").innerHTML = `

<div class="popup">

<h2>✅ Attendance</h2>

<p>Attendance Marked Successfully</p>

<button onclick="closePopup()">
Close
</button>

</div>

`;

document.getElementById("popupPanel").style.display = "flex";

}


// =======================
// CLOSE POPUP
// =======================

function closePopup() {

document.getElementById("popupPanel").innerHTML = "";
document.getElementById("popupPanel").style.display = "none";

}


// =======================
// SIDEBAR FUNCTIONS
// =======================

// =======================
// NAVIGATION FUNCTIONS
// =======================

function hideAll(){

const sections = [
"dashboardSection",
"trackingSection",
"routesSection",
"studentsSection",
"driversSection"
];

sections.forEach(id => {

const section = document.getElementById(id);

if(section){
section.style.display = "none";
}

});

}

function showDashboard(){

hideAll();

document.getElementById("dashboardSection")
.style.display = "block";

}

function showTracking(){
    hideAll();

document.getElementById("driversSection")
.style.display = "block";

}

function showSettings(){

alert("⚙️ Settings Opened");

}

window.onload = function(){

showDashboard();

const aiStatus =
document.getElementById("aiStatus");

if(aiStatus){

aiStatus.innerHTML =
predictDelay(20,25);

}

};

function addStudent(){

let name =
document.getElementById("studentName").value;

let id =
document.getElementById("studentId").value;

let bus =
document.getElementById("busNo").value;

if(name=="" || id=="" || bus==""){
alert("Fill all fields");
return;
}

document.getElementById("showName").innerHTML = name;

document.getElementById("showId").innerHTML = id;

document.getElementById("showBus").innerHTML = bus;

alert("JS Loaded Successfully");
}
async function searchBus(){

let busNo =
document.getElementById("busNo").value.trim();

if(busNo==""){
alert("Enter Bus Number");
return;
}

try{

let response =
await fetch(
`http://127.0.0.1:5000/get_location/${busNo}`
);

let data =
await response.json();

console.log(data);

if(data.error){
alert("Bus Not Found");
return;
}

document.getElementById("busNumber").innerHTML =
busNo;

document.getElementById("location").innerHTML =
data.lat + ", " + data.lng;

busMarker.setLatLng([
data.lat,
data.lng
]);

map.setView([
data.lat,
data.lng
],15);

}
catch(err){

console.log(err);
alert("Server Error");

}

}
function markAttendance(){

let studentName =
document.getElementById("studentName").value;

let rollNo =
document.getElementById("rollNo").value;

let feeStatus =
document.getElementById("feeStatus").value;

if(
studentName === "" ||
rollNo === "" ||
feeStatus === ""
){
alert("Please Fill All Fields");
return;
}

let currentTime =
new Date().toLocaleTimeString();

let table =
document.getElementById("attendanceTable");

table.innerHTML += `
<tr>
<td>${studentName}</td>
<td>${rollNo}</td>
<td>${feeStatus}</td>
<td>✅ Present</td>
<td>${currentTime}</td>
</tr>
`;

document.getElementById("studentName").value="";
document.getElementById("rollNo").value="";
document.getElementById("feeStatus").value="";

alert("Attendance Marked Successfully");

}
function sendSOS(){

document.getElementById("popupPanel").innerHTML = `

<div class="popup">

<h2>🚨 SmartBus Emergency Center</h2>

<button onclick="medicalSOS()">
🚑 Medical Emergency
</button>

<button onclick="breakdownSOS()">
🚌 Bus Breakdown
</button>

<button onclick="accidentSOS()">
🚨 Accident Alert
</button>

<button onclick="safetySOS()">
🛡️ Safety Issue
</button>

<button onclick="contactDriver()">
📞 Contact Driver
</button>

<button onclick="contactOffice()">
🏫 Transport Office
</button>

<br><br>

<button onclick="closePopup()">
❌ Close
</button>

</div>

`;
document.getElementById("popupPanel").style.display = "flex";

}
function medicalSOS(){

navigator.geolocation.getCurrentPosition((pos)=>{

alert(
"🚑 Medical Emergency Sent\n\n" +
"Latitude: " + pos.coords.latitude +
"\nLongitude: " + pos.coords.longitude
);

});

}

function breakdownSOS(){

navigator.geolocation.getCurrentPosition((pos)=>{

alert(
"🚌 Bus Breakdown Reported\n\n" +
"Latitude: " + pos.coords.latitude +
"\nLongitude: " + pos.coords.longitude
);

});

}

function accidentSOS(){

navigator.geolocation.getCurrentPosition((pos)=>{

alert(
"🚨 Accident Alert Sent\n\n" +
"Latitude: " + pos.coords.latitude +
"\nLongitude: " + pos.coords.longitude
);

});

}

function safetySOS(){

navigator.geolocation.getCurrentPosition((pos)=>{

alert(
"🛡️ Student Safety Alert Sent\n\n" +
"Latitude: " + pos.coords.latitude +
"\nLongitude: " + pos.coords.longitude
);

});

}

function contactDriver(){

alert(
"📞 Driver Contact\n\n" +
"Name: Ramesh Kumar\n" +
"Phone: 9876543210"
);

}

function contactOffice(){

alert(
"🏫 Transport Office\n\n" +
"Phone: 9876543211\n" +
"Email: transport@vignan.ac.in"
);

}


function showSettings(){

let panel = document.getElementById("popupPanel");

if(panel.style.display === "block"){

panel.style.display = "none";
panel.innerHTML = "";

return;

}

panel.innerHTML = `

<div class="settingsPanel">

<h3>⚙️ Settings</h3>

<button onclick="editProfile()">👤 Profile</button>

<button onclick="notificationSettings()">🔔 Notifications</button>

<button onclick="changeTheme()">🌙 Theme</button>

<button onclick="changeLanguage()">🌐 Language</button>

<button onclick="gpsSettings()">📍 GPS</button>
<button onclick="closePopup()">❌ Close</button>

</div>

`;

panel.style.display = "block";

}


function editProfile(){

let name = prompt("Enter Your Name");

if(name){

localStorage.setItem("studentName",name);

alert("✅ Profile Updated");

}

}



function notificationSettings(){

alert(
"🔔 Notifications Enabled\n\n" +
"✔️ Bus Arrival Alerts\n" +
"✔️ Attendance Alerts\n" +
"✔️ Fee Alerts\n" +
"✔️ SOS Alerts"
);

}

function changeTheme(){

if(document.body.style.background=="white"){

document.body.style.background="#0f172a";
document.body.style.color="white";

alert("🌙 Dark Mode Enabled");

}
else{

document.body.style.background="white";
document.body.style.color="black";

alert("☀️ Light Mode Enabled");

}

}

function changeLanguage(){

let lang = prompt(
"Choose Language:\n\n1. English\n2. Telugu\n3. Hindi"
);

if(lang=="1"){

alert("✅ Language Changed To English");

}
else if(lang=="2"){

alert("✅ Language Changed To Telugu");

}
else if(lang=="3"){

alert("✅ Language Changed To Hindi");

}
else{

alert("Invalid Choice");

}

}

function gpsSettings(){

navigator.geolocation.getCurrentPosition((pos)=>{

alert(
"📍 GPS Enabled\n\n" +
"Latitude: " + pos.coords.latitude +
"\nLongitude: " + pos.coords.longitude
);

});

}
function closePopup(){

document.getElementById("popupPanel").innerHTML = "";

document.getElementById("popupPanel").style.display = "none";

}
function logout(){

localStorage.removeItem("loggedIn");

window.location.href="login.html";

}
function login(){

let user =
document.getElementById("username").value;

let pass =
document.getElementById("password").value;

if(user=="" || pass==""){

alert("Please Fill All Fields");
return;

}

localStorage.setItem("loggedIn","true");

window.location.href="index.html";

}