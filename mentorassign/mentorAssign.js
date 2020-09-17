var container=document.createElement('div');
container.setAttribute('class','container');

var heading=document.createElement('h1');
let userName=localStorage.getItem('name');
heading.innerText=`Hello ${userName}`;

var heading2=document.createElement('h3');
heading2.innerText=`List of Mentors:`;

var Mentortable=document.createElement('table');
Mentortable.setAttribute('class','table table-dark');
Mentortable.innerHTML=`<thead>
<tr>
  <th scope="col">#</th>
  <th scope="col">Mentor Name</th>
  <th scope="col">Students Enrolled</th>
  <th scope="col">Enroll</th>
</tr>
</thead>`

let tableBody=document.createElement('tbody');

async function getMentors(){
    let count=1;
    var allMentors=await fetch('https://student-mentor.herokuapp.com//showMentors');
    var finalMentorData=await allMentors.json();
    console.log(finalMentorData);
    finalMentorData.forEach(element => {
    let tableRow=document.createElement('tr');
    let tableHeader=document.createElement('th');
    tableHeader.setAttribute('scope','row');
    tableHeader.innerText=`${count}`;
    let tableData1=document.createElement('td');
    tableData1.innerText=`${element.name}`
    tableBody.append(tableRow);
    tableRow.append(tableHeader);
    tableRow.append(tableData1);  
    let tableData2=document.createElement('td');
    if(element.studentName!=undefined){
    var enrolledStudents=(element.studentName);
    enrolledStudents.forEach(element1 => {
        tableData2.innerText+=`${element1} `;
    });
}
else{
    tableData2.innerText="None";
}
tableRow.append(tableData2);
    let tableData3=document.createElement('button');
    tableData3.setAttribute('class','btn btn-primary');
    tableData3.setAttribute('id',`enrollButton${count}`)
    tableData3.innerText=`Enroll`;
    tableRow.append(tableData3);
    count++;
    tableData3.addEventListener("click",async function(){
        let studentName1=localStorage.getItem('name');
        try{
        let enrolling=await fetch(`https://student-mentor.herokuapp.com//assignStudent/${element._id}/${studentName1}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
        });
    }
    catch(err){
        console.log(err);
    }
        alert("Enrolled!");
    })
    });
}

document.body.append(container);
container.append(heading);
container.append(heading2);
container.append(Mentortable);
Mentortable.append(tableBody);

getMentors();