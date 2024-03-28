
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBd011LxDJt8TaKhccB5hbd6AJ6D3EbxAs",
  authDomain: "facerecognitionrealtime-f6b2a.firebaseapp.com",
  databaseURL: "https://facerecognitionrealtime-f6b2a-default-rtdb.firebaseio.com",
  projectId: "facerecognitionrealtime-f6b2a",
  storageBucket: "facerecognitionrealtime-f6b2a.appspot.com",
  messagingSenderId: "928126751639",
  appId: "1:928126751639:web:43256ab5d2682051e5aad2",
  measurementId: "G-JVSZLXFZT3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


console.log("%cFirebase is connected", "color: red; font-size: 16px; font-weight: bold;");

const attendanceResults = document.querySelector(".attendanceResults");

let lastShownDiv;
onValue(ref(db, 'Students'), (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  for (const regNo in data) {
    console.log(`${regNo}: ${data[regNo].name}`);
    const div = document.createElement("div");
    div.classList.add(`attendanceResults__row`);
    div.classList.add(`#${regNo}`)

    const overviewDiv = document.createElement("div");
    overviewDiv.classList.add("overview");
    
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.textContent = `${data[regNo].name} - ${regNo}`;
    const moreDiv = document.createElement("div");
    moreDiv.classList.add("more");
    moreDiv.textContent = "more";
    moreDiv.addEventListener("click", () => {
      lastShownDiv?.classList.toggle("show");
      div.classList.toggle("show");
      lastShownDiv = div;
    });
    
    overviewDiv.appendChild(nameDiv);
    overviewDiv.appendChild(moreDiv);


    const moreDetailsDiv = document.createElement("div");
    moreDetailsDiv.classList.add("moreDetails");

    let ul = document.createElement("ul")

    Object.keys(data[regNo]).forEach((key) => {
      let li = document.createElement("li")
      li.textContent = `${key}: ${data[regNo][key]}`
      ul.appendChild(li)
    }) 

    div.appendChild(overviewDiv);
    div.appendChild(moreDetailsDiv);
    moreDetailsDiv.appendChild(ul)

    attendanceResults.appendChild(div);
  }

}, (error) => {
  console.error("Error: ", error);
});





// FIREBASE END