console.log("this is my app.js");
shownotes();
// when a user add a note
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addtxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  shownotes();
});

// function to show element from local storage
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
              <div class="cardnote mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text"> ${element}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>`;
  });
  let noteselm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteselm.innerHTML = html;
  } else {
    noteselm.innerHTML = `We have nothing to show you, please use add note above`;
  }
}

// function tol delete note
function deleteNote(index) {
  // console.log("i'm deleting this note " + index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}
// Searching text in the notes
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value.toLowerCase();
  let noteCard = document.getElementsByClassName("cardnote");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    console.log(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
