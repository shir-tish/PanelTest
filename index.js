var fab = document.getElementById("fab");

var infoPannel = document.getElementById("infoPannel");
var infoCancelBtn = document.getElementById("infoCancelBtn");
var infoRefreshBtn = document.getElementById("infoRefreshBtn");

var contactUsPannel = document.getElementById("contactUsPannel");
var contactUsCancelBtn = document.getElementById("contactUsCancelBtn");
var contactUsBackBtn = document.getElementById("contactUsBackBtn");

var contactUsBtn = document.getElementById("contactUsBtn");

var numOfFixed = document.getElementById("numOfFixed");
var numOfImages = document.getElementById("numOfImages");

var emailNotValid = document.getElementById("emailNotValid");
var nameNotValid = document.getElementById("nameNotValid");

var form = document.forms['contactUsForm'];

var submitBtn = document.getElementById("submitBtn");

var progress = document.getElementById("progress");

const scriptURL = 'https://script.google.com/macros/s/AKfycbyodzc16S-DKRs-k9H7-QU2q2mkDSkZktPvgBqPZb_x8GvnRV6TnLIYSN_3CnyE05VgrA/exec'

infoPannel.style.display = 'none';
contactUsPannel.style.display = 'none';

$(window).click(function() {
    document.onclick = function(div){
        if(div.target.id != "content"){
            setInfoPannel('none');
            setContactUsPannel('none');
            setFab('block');
            $("#formAlert").html("<div class=''></div>")
        }
    }
});

$('#fab').click(function(event){
    event.stopPropagation();
});

$('#infoPannel').click(function(event){
    event.stopPropagation();
});

$('#contactUsPannel').click(function(event){
    event.stopPropagation();
});

fab.addEventListener('click', ()=>{
    setInfoPannel('block');
    setFab('none');
});

infoCancelBtn.addEventListener('click', ()=>{
    setInfoPannel('none');
    setFab('block');
});

infoRefreshBtn.addEventListener('click', ()=>{
    setInfo();
});

contactUsCancelBtn.addEventListener('click', ()=>{
    setContactUsPannel('none');
    setFab('block');
    $("#formAlert").html("<div class=''></div>")
});

contactUsBackBtn.addEventListener('click', ()=>{
    setContactUsPannel('none');
    setInfoPannel('block');
    $("#formAlert").html("<div class=''></div>")
});

contactUsBtn.addEventListener('click', ()=>{
    setInfoPannel('none');
    setContactUsPannel('block');
});

form.addEventListener('submit', e=>{
    setProgress('block');
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        $("#formAlert").html("<div class='form-alert-success'>Message sent successfully.</div>"),
        setProgress('none')
    })
    .catch(error => {
        $("#formAlert").html("<div class='form-alert-failed'>Message failed.</div>"),
        setProgress('none')
    })
});

submitBtn.addEventListener('click', ()=>{
    clearNotValid();
    validateForm();
});

function setInfoPannel(mode){
    infoPannel.style.display = mode;
    setInfo();
}

function setContactUsPannel(mode){
    contactUsPannel.style.display = mode;
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    clearNotValid();
}

function setFab(mode){
    fab.style.display = mode;
}

function setProgress(mode){
    progress.style.display = mode;
}

function getNumOfFixed(){
    var countFixed = 0;
    var elems = document.body.getElementsByTagName("*");
    
    for (var i=0;i<elems.length;i++) {
        if (window.getComputedStyle(elems[i],null).getPropertyValue('position') == 'fixed') {
            countFixed++;
        }
    }

    return countFixed;
}

function setInfo(){
    numOfFixed.innerHTML = getNumOfFixed();
    numOfImages.innerHTML = document.images.length;
}

function clearNotValid(){
    emailNotValid.innerHTML = "";
    nameNotValid.innerHTML = "";

    document.getElementById("email").className = "";
    document.getElementById("name").className = "";
    document.getElementById("message").className = "";
}

function validateForm(){
    var email = document.getElementById("email");
    var name = document.getElementById("name");
    var result = true;

    if(email == "" || !validateEmail(email)){
        emailNotValid.innerHTML = " - not valid";
        email.className = "input-not-valid";
        result = false;
    }
    if(name.value == ""){
        nameNotValid.innerHTML = " - not valid";
        name.className = "input-not-valid";
        result = false;
    }

    return result;
}

function validateEmail(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
}
