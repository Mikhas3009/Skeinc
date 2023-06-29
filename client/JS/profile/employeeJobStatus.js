let jobStatus = document.querySelector('.job-manager-status').innerHTML;
let customTask= document.querySelector('.job-manager-custom-task-status').innerHTML;
jobStatus = Boolean(jobStatus);



if(JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
    JobManagerTaskUnselectedBlock.children[1].style.display = "flex";
}
else {
    JobManagerTaskUnselectedBlock.children[1].style.display = "none";
}

if(JobManagerTaskInProgressBlock.children[2].children.length == 0) {
    JobManagerTaskInProgressBlock.children[1].style.display = "flex";
}
else {
    JobManagerTaskInProgressBlock.children[1].style.display = "none";
}
// Если тех и других задач нет
if(JobManagerTaskInProgressBlock.children[2].children.length == 0 && JobManagerTaskUnselectedBlock.children[2].children.length == 0) {
    JobManagerTaskPickBlock.style.display = "flex";
}
else {
    JobManagerTaskPickBlock.style.display = "none";
}

if(jobStatus==true){
    JobManagerEndDayButton.style.display = "flex";
    JobManagerStartDayButton.style.display = "none";
    JobManagerTaskInProgressBlock.style.display = "flex";
    JobManagerTaskUnselectedBlock.style.display = "flex";
}
else{
    JobManagerEndDayButton.style.display = "none";
    JobManagerStartDayButton.style.display = "flex";
    JobManagerTaskInProgressBlock.style.display = "none";
    JobManagerTaskUnselectedBlock.style.display = "none";
    JobManagerTaskPickBlock.style.display='none';
}

if(customTask){
    SelectJobManagerTaskPickField.children[0].innerHTML=customTask;
    JobManagerPickTaskButton.style.display='none';
    JobManagerFinishTaskButton.style.display='flex';
    SelectJobManagerTaskPickField.classList.add('select-field-validate');
    SelectJobManagerTaskPickField.classList.remove('select-field');
}