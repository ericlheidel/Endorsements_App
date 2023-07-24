// import Firebase functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// set our app's "settings" from our specific Firebase Realtime Database (endorsementList)
const appSettings = {
    databaseURL: "https://endorsements-8fdbc-default-rtdb.firebaseio.com/"
}

// initial variables for Firebase settings
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

// initial variables for pp functionality
const textAreaEl = document.getElementById("endorsement-text")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

// PUBLISH BUTTON
publishBtn.addEventListener("click", function() {
    let inputValue = textAreaEl.value
    
    push(endorsementsListInDB, inputValue)
    
    clearEndorsementTextEl()
})


// onValue Function (constant communication between app and database)
onValue(endorsementsListInDB, function(snapshot) {
    let endorsementsArray = Object.entries(snapshot.val())
    
    clearEndorsementListEl()
    
    for (let i =0 ; i < endorsementsArray.length; i++) {
        
        let currentEndorsement = endorsementsArray[i]
        let currentEndorsementID = currentEndorsement[0]
        let currentEndorsementValue = currentEndorsement[1]
        
        appendEndorsementToListEl(currentEndorsement)
    }
    
})


// add endorsement text to endorsement list (FUNCTION)
function appendEndorsementToListEl(endorsement) {
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]
    
    let newEl = document.createElement("li")
    
    newEl.innerHTML = endorsementValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfEndorsementInDB = ref(database, `endorsementsList/${endorsementID}`)
        
        remove(exactLocationOfEndorsementInDB)
    })
    
    endorsementListEl.append(newEl)
}


// clear the textarea that holds typed in Endorsement
function clearEndorsementTextEl() {
    textAreaEl.value = ""
}


// clear the actual endorsement (<li>) from the endorsement list (<ul>) when specific <li> is clicked
function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}