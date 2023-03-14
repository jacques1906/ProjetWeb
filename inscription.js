document.addEventListener("DOMContentLoaded", function() {

var nxt_btn=document.querySelectorAll(".next_button");
var prev_btn=document.querySelectorAll(".previous_button");
var submit_btn=document.querySelectorAll(".submit_button");
var main_form=document.querySelectorAll(".main");
var main_signin_form=document.querySelectorAll(".main_signin");
var sign_in_submit=document.querySelector(".signin_submit_button")
var progressbar = document.querySelectorAll(".steps li");
var steps = document.querySelector(".steps");
var vide = document.querySelector(".vide");
let forumnumber=0;



const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const format = '&format=json';
let zipcode = $('#zipcode'); 
let city = $('#city');


$(zipcode).on('blur', function(){
    let code = $(this).val();
    let url = apiUrl+code+format;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        // Mettre à jour le champ de ville avec la première ville trouvée dans la réponse API
        city.val(data[0].nom);
      },
      error: function(error) {
        // Log the error message
        console.log(error.responseText);
      }
    });
  });



nxt_btn.forEach(function(butn){
   butn.addEventListener('click',function(){
       if(!validateform()){
           return false;
       }
       forumnumber++;
       progress('color');
       update_form(); 
   });
});  


prev_btn.forEach(function(prev_button){
    prev_button.addEventListener('click',function(){ 
       forumnumber--;
       progress('nocolor');
       update_form();
    });
}); 

submit_btn.forEach(function(submit_button){
    submit_button.addEventListener('click',function(){
        if(!validateform()){
            return false;
        }
    var f_name=document.querySelector("#user_name");
    var shown_name = document.querySelector("#shown_name");
    shown_name.innerHTML=f_name.value;
        forumnumber++;
        update_form();
        steps.classList.add("d-none");
    });
});


 function progress(state){ 
     if(state=='color'){
          progressbar[forumnumber].classList.add('li-active'); 
     }else{
         
         progressbar[forumnumber+1].classList.remove('li-active');
     }
    
 }

function update_form(){ 
    main_form.forEach(function(main){
       main.classList.remove('active');
    }); 
      main_form[forumnumber].classList.add('active');   
}




var verifyMDP = 0;
var verifyMail = 0;
var verifyPhone = 0;

function validateform(){  
    validate=true;
    
var validate_inputs = document.querySelectorAll(".main.active input");

validate_inputs.forEach(function(input_valid){
    input_valid.classList.remove('warning'); 
    if(input_valid.hasAttribute('require')){ 
        if(input_valid.value.length==0 ){
            validate=false;
            input_valid.classList.add('warning');
                }
        if (verifyMDP == 0 || verifyMail == 0 ||verifyPhone == 0 ){
            validate=false;
        }

    }
});
return validate;
}


$('#password, #confirmPassword').on('keyup', function () {
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    if (password.length >= 8 && password == confirmPassword) {
      $('#invalideMDP').html('Matching').css('color', 'green');
      return verifyMDP = 1;
    } else if (password.length < 8) {
      $('#invalideMDP').html('mot de passe trop court (minimum 8 caratères )').css('color', 'red');
      return verifyMDP = 0;
    } else {
      $('#invalideMDP').html('le mot de passe ne corresponds').css('color', 'red');
      return verifyMDP = 0;
    }
});


$('#adressemail').on('keyup', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test($('#adressemail').val())) {
        $('#invalideMail').html('Adresse e-mail valide').css('color', 'green');
        return verifyMail = 1;
    } else {
        $('#invalideMail').html('Adresse e-mail invalide').css('color', 'red');
        return verifyMail = 0;
    }
});


$('#phone').on('blur', function() {
    const phoneRegex = /^((\+)33|0)[1-9](\d{2}){4}$/;
    if (phoneRegex.test($('#phone').val())) {
        $('#invalideTel').html('téléphone valide').css('color', 'green');
        return verifyPhone = 1;
    } else {
        $('#invalideTel').html('téléphone invalide').css('color', 'red');
        return verifyPhone = 0;
    }
});




});