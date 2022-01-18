showNode();

//add notes to localStorage

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {
    //Get value provided in text area
    let addTxt = document.getElementById("addTxt")
    getNotes();
    //push is used with array, hence notesObj becomes array
    notesObj.push(addTxt.value);
    //setting the key "notes" with the value in text area
    localStorage.setItem("notes", JSON.stringify(notesObj))
    //removing the value from text area
    addTxt.value = ' '
    showNode();
})

function showNode() {
    getNotes();

    let html = ""
    //iterating through each element of key "notes" which is an array of notes
    notesObj.forEach((element,index) => {
        //using html += since not using + will replace the created card with latest note
        //Giving the delete button id of index to remove the specific note only
    html += `
    <div class="noteCard mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note : ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div>
    ` 
    });

    let notesElement = document.getElementById("notes")
    if(notesObj.length!=0){
        notesElement.innerHTML = html
    }
    else{
        notesElement.innerHTML=`Nothing to show!`
    }
}

function deleteNode(index){
    getNotes();
    //Slice removes element from index position, the number of elements to remove is the 2nd parameter
    notesObj.splice(index,1)
    //Updating the local storage since we are just making changes in notesObj
    localStorage.setItem("notes", JSON.stringify(notesObj))
    //calling showNode to display latest changes
    showNode();
}

function getNotes(){
    //getting notes from local storage
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        //parsing the array into String 
        notesObj = JSON.parse(notes)
    }
}

let search = document.getElementById("searchTxt")
search.addEventListener('input',function(){
    let searchVal = search.value.toLowerCase()
    let noteCard = document.getElementsByClassName('noteCard')
    Array.from(noteCard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText
            if(cardTxt.includes(searchVal)){
                element.style.display = "block"
            }          
            else{
                element.style.display = "none"
            }
        });
    
})