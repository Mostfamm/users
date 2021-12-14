const dataModel = new DataModel()
const renderer = new Renderer()
let jobId

loadPage =async function(){
    renderer.viewLogIn();
} 
$('.logIn-Register').on('click','.registerPage' , function() {
    renderer.emptyView();
    renderer.viewRegister();
})

$('.logIn-Register').on('click','.LogInbtn' , function() {
    renderer.emptyView();
    renderer.viewLogIn();
})


$('.logIn-Register').on('click','#Login' , async function() {
    const email = $(this).closest(".logInFormat").find("div").find("#email").val()
    const password = $(this).closest(".logInFormat").find("div").find("#password").val()
    await dataModel.userIsExist(email , password)
    if(dataModel.userData.length){
        alert("the user is exist")
//      window.location.href= "user.html";
        await dataModel.getJob();
        await dataModel.getInterview();
        renderer.emptyView();
        renderer.viewUser(dataModel.jobs); 
    }else{
        alert("the user is not exist")
    }    
})


$('.logIn-Register').on('click','#registerbtn' , async function() {
   
    const firstName = $(this).closest(".RegisterFormat").find("div").find("#firstName").val()
    const lastName = $(this).closest(".RegisterFormat").find("div").find("#lastName").val()
    const status = $(this).closest(".RegisterFormat").find("div").find("select")[0].value
    const cycle = $(this).closest(".RegisterFormat").find("div").find("select")[1].value
    const email = $(this).closest(".RegisterFormat").find("div").find("#email").val()
    const mobile = $(this).closest(".RegisterFormat").find("div").find("#mobile").val()
    const password = $(this).closest(".RegisterFormat").find("div").find("#password").val()
    
    if( firstName =="" ||lastName == "" ||  email =="" || mobile == "" || password ==""){
        alert("the inputs is require ")
    }
    else{
        await dataModel.emailIsExist(email);
        if(dataModel.userData.length){
            alert("the user is exist , pleace select different email")
        }else{
            await dataModel.saveUser(firstName , lastName , email , status , cycle , mobile , password)
            alert(" welcome to App !!!")
            renderer.emptyView();
            renderer.viewLogIn();    
        }
    }
})


$('.userInterview').on('click','#Apply' , async function() {
   
    const CompanyName = $(this).closest(".Popup").find("div").find("#CompanyName").val()
    const JobTitle = $(this).closest(".Popup").find("div").find("#JobTitle").val()
    const Location = $(this).closest(".Popup").find("div").find("#Location").val()
    const gotJob = $(this).closest(".Popup").find("div").find("select")[0].value
    if( CompanyName =="" ||JobTitle == "" ||  Location =="" || gotJob == "" ){
        alert("the inputs is require ")
    }
    else{
        await dataModel.saveJob(CompanyName , JobTitle , Location , gotJob);
        renderer.emptyView();
        
        renderer.viewUser(dataModel.jobs); 
    }
})
$('.userInterview').on('click','#ApplyInterview' , async function() {
   
    const interviewType = $(this).closest(".Popup").find("div").find("#interviewType").val()
    console.log(interviewType);
    const interviewDate = $(this).closest(".Popup").find("div").find("#interviewDate").val()
    const interviewerName = $(this).closest(".Popup").find("div").find("#interviewerName").val()
    if( interviewType =="" ||interviewDate == "" ||  interviewerName ==""){
        alert("the inputs is require ")
    }
    else{
        await dataModel.saveInterview(jobId , interviewType , interviewDate , interviewerName);
        await dataModel.getInterview();
        renderer.emptyView();
        renderer.viewUser(dataModel.jobs); 
    }
    
})

$('.userInterview').on('click','.addNewInterview' , async function() {
    jobId=$(this).parent().attr('id'); 
    console.log(jobId);
    document.getElementById("popupForm2").style.display = "block";
       
 })
 $('.userInterview').on('click','#cancel2' , async function() {
    document.getElementById("popupForm2").style.display = "none";
       
 })
 $('.userInterview').on('click','.addNewJob' , async function() {
    
    document.getElementById("popupForm").style.display = "block";
       
 })
 $('.userInterview').on('click','#cancel' , async function() {
    document.getElementById("popupForm").style.display = "none";
       
 })
 

loadPage();