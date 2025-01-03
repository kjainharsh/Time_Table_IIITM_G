var timetable = {
    1: ["A", "B", "C", "F", "G", "D", "E"],
    2: ["K", "K", "K", "K", "G", "K", "K"],
    3: ["A", "B", "C", "F", "G", "D", "E"],
    4: ["K", "K", "Z", "Z", "G", "Z", "Z", "Z", "Z"],
    5: ["L", "A", "B", "C", "G", "D", "E"]
}
var labtime = {
    1: ["Z", "Z", "Z", "N"],
    2: ["K", "K", "K", "K"],
    3: ["Z", "Z", "Z", "K"],
    4: ["K", "I", "J", "M"],
    5: ["Z", "Z", "Z", "K"]
}
var alphaToCode = {
    "A": "CS201", // Discrete Structures
    "B": "CS203", // Design and Analysis of Algorithms
    "C": "CS204", // Database Systems
    "D": "CS205", // Paradigms of Programming Language
    "E": "CS202", // Computer Organization and Architecture
    "F": "HS201", // Indian Culture, Ethics and Moral Values
    "G": "G",    // Lunch time
    "I": "CS203_LAB", // Design and Analysis of Algorithms Lab
    "J": "CS204_LAB", // DataBase Systems Lab
    "L": "DS_TUTORIAL", // Discrete Structures Tutorial
    "K": "K",    // Free time
    "M": "CS205_LAB", // Paradigms of Programming Language Lab
    "N": "CS202_LAB", // Computer Organization and Architecture Lab
    "Z": "Z" //Already Alloted
}

var codeToCourse = {
    "CS201": "Discrete Structures",
    "CS203": "Design and Analysis of Algorithms",
    "CS204": "Database Systems",
    "CS205": "Paradigms of Programming Language",
    "CS202": "Computer Organization and Architecture",
    "HS201": "Indian Culture, Ethics and Moral Values",
    "DS_TUTORIAL": "Discrete Structures Tutorial",
    "CS203_LAB": "Design and Analysis of Algorithms Lab",
    "CS204_LAB": "Database Systems Lab",
    "CS205_LAB": "Paradigms of Programming Language Lab",
    "CS202_LAB": "Computer Organization and Architecture Lab",
    "G": "Lunch Time",
    "Z": "This Time is already Alloted"
}

function readTextFile(file, rollno) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allData = rawFile.responseText;
                let args = allData.split("\n");
                let found = false;
                for (let i = 0; i < args.length; i++) {
                    let breaked = args[i].split(" ");
                    if (breaked[0] == rollno) {
                        localStorage.setItem("lastroll", rollno);
                        let le = breaked.length;
                        let nalias = breaked.splice(1, le - 1);
                        var alias = nalias.join(" ");
                        const mydate = new Date();
                        let day = mydate.getDay();
                        let enElement = document.getElementById("en");

                        if (enElement) {
                            enElement.innerHTML = "";
                            let chosenCustomDay = document.getElementById("customday").value;
                            if (chosenCustomDay == "0") {
                                if (day == 0) { // Sunday
                                    enElement.innerHTML = "Today's free.<br>Tomorrow's Time Table:";
                                    day = 1;
                                } else if (day == 6) { // Saturday
                                    enElement.innerHTML = "Today and Tomorrow are free.<br>Monday Time Table:";
                                    day = 1;
                                } else {
                                    enElement.innerHTML = "Today's Time Table:";
                                }
                            } else {
                                day = Number(chosenCustomDay);
                                enElement.innerHTML += "Custom Day<br>";
                            }

                            enElement.innerHTML += "<br>";
                            if (day == 1) enElement.innerHTML += "(Monday)";
                            else if (day == 2) enElement.innerHTML += "(Tuesday)";
                            else if (day == 3) enElement.innerHTML += "(Wednesday)";
                            else if (day == 4) enElement.innerHTML += "(Thursday)";
                            else if (day == 5) enElement.innerHTML += "(Friday)";

                            // Display data based on the current day
                            let slots = ["dslot1", "dslot2", "dslot3", "dslot4", "dslot5", "dslot6", "dslot7", "dslot8", "dslot9", "dslot10", "dslot11"];
                            let m_slots = ["mslot1", "mslot2", "mslot3", "mslot4", "mslot5", "mslot6", "mslot7", "mslot8", "mslot9", "mslot10", "mslot11"];

                            // Clear existing slots
                            clearSlots(slots);

                            if (day == 1) { // Monday
                                displaySchedule(slots, m_slots, timetable, labtime, day);
                            } else if (day == 2) { // Tuesday
                                displaySchedule(slots, m_slots, timetable, labtime, day);
                            } else if (day == 3) { // Wednesday
                                displaySchedule(slots, m_slots, timetable, labtime, day);
                            } else if (day == 4) { // Thursday
                                displaySchedule(slots, m_slots, timetable, labtime, day);
                            } else if (day == 5) { // Friday
                                displaySchedule(slots, m_slots, timetable, labtime, day);
                            } else {
                                enElement.innerHTML = "Today is a free day!";
                            }

                            let aliasElement = document.getElementById("alias");
                            if (aliasElement) {
                                aliasElement.innerHTML = alias + "<br>" + "Today's Time-Table";
                            }

                            show();
                            found = true;
                        }
                        break;
                    }
                }
                if (!found) {
                    alert("Entered roll number is incorrect.");
                }
            } else {
                console.error("Failed to load file:", rawFile.statusText);
            }
        }
    };
    rawFile.send(null);
}

function displaySchedule(slots, m_slots, timetable, labtime, day) {
    for (let i = 0; i < timetable[day].length; i++) {
        let ClassCode = timetable[day][i];
        let slotElement = document.getElementById(slots[i]);
        let mslotElement = document.getElementById(m_slots[i]);

        if (slotElement && mslotElement) {
            if (ClassCode !== "K" && ClassCode !== "Z" && ClassCode != "G") {
                // Display class details
                slotElement.innerHTML = "Lecture Class -- " + codeToCourse[alphaToCode[ClassCode]] || "Unknown";
                slotElement.style.display = "block";
                mslotElement.innerHTML = "Venue:- LT2-207";
            } else if (ClassCode == "K" && ClassCode != "Z" && ClassCode != "G") {
                slotElement.innerHTML = "Free Time!!";
                mslotElement.innerHTML = "";
            }
            else if (ClassCode == "Z" && ClassCode != "G") {
                slotElement.innerHTML = codeToCourse[alphaToCode[ClassCode]];
                mslotElement.innerHTML = "";
            }
            else {
                slotElement.innerHTML = codeToCourse[alphaToCode[ClassCode]];
                mslotElement.innerHTML = "Venue:- BH2 Hostel";
            }
        }
    }
    for (let i = 0; i < labtime[day].length; i++) {
        let ClassCode = labtime[day][i];
        let slotElement = document.getElementById(slots[i + 7]);
        let mslotElement = document.getElementById(m_slots[i + 7]);

        if (ClassCode !== "K" && ClassCode !== "Z" && ClassCode != "G") {
            // Display class details
            slotElement.innerHTML = "Lab Lecture -- " + codeToCourse[alphaToCode[ClassCode]] || "Unknown";
            slotElement.style.display = "block";
            mslotElement.innerHTML = "Venue:- LT1-205";
        } else if (ClassCode == "K" && ClassCode != "Z" && ClassCode != "G") {
            slotElement.innerHTML = "Free Time!!";
            mslotElement.innerHTML = "";
        }
        else if (ClassCode == "Z" && ClassCode != "G") {
            slotElement.innerHTML = codeToCourse[alphaToCode[ClassCode]];
            mslotElement.innerHTML = "";
        }
        else {
            slotElement.innerHTML = codeToCourse[alphaToCode[ClassCode]];
            mslotElement.innerHTML = "Venue:- BH2 Hostel";
        }
    }
}



function clearSlots(slots) {
    for (let i = 0; i < slots.length; i++) {
        let slotElement = document.getElementById(slots[i]);
        if (slotElement) slotElement.innerHTML = "";
    }
}

function func() {
    var inp = document.getElementById("in");
    var tinp = inp.value;
    if (tinp === "") {
        alert("You think I am a fool?! I mean, enter your roll no already~");
    } else {
        readTextFile("groupings.txt", tinp);
    }
}

function show() {
    var res = document.getElementById("result");
    if (res) {
        res.style.display = "block";
        setTimeout(() => {
            res.style.transform = "scale(1)";
        }, 100);
    }
    var my = document.getElementById("myself");
    if (my) {
        my.style.transform = "scale(0)";
        my.style.display = "none";
    }
}

function hide() {
    var res = document.getElementById("result");
    res.style.transform = "scale(0)";
    setTimeout(() => {
        res.style.display = "none";
    }, 1005);
    var my = document.getElementById("myself");
    my.style.transform = "scale(1)";
    my.style.display = "block";
}

window.onload = function () {
    let lastrn = localStorage.getItem("lastroll");
    if (lastrn) {
        let inp = document.getElementById("in");
        if (inp) {
            inp.value = lastrn;
        }
    }
};
