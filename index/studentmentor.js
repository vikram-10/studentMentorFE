var tableContainer=document.createElement('div');
tableContainer.setAttribute('class','container');


var table=document.createElement('table');
table.setAttribute('class','table table-dark');
table.innerHTML=`  <thead>
<tr>
  <th scope="col">#</th>
  <th scope="col">Name</th>
  <th scope="col">Status</th>
  <th scope="col">ASSIGN</th>
</tr>
</thead>`

async function getStudents(){
    try{
        let count=1;
    var studData=await fetch('https://student-mentor.herokuapp.com//showStudents');
    var finalStudData=await studData.json();
    finalStudData.forEach(element => {
        if(element.status!="assigned"){
            var tableRow=document.createElement('tr');
            var tableHeader=document.createElement('th');
            tableHeader.setAttribute('scope','row');
            tableHeader.innerHTML=`${count}`
            var tableData1=document.createElement('td');
            tableData1.innerText=`${element.name}`;
            var tableData2=document.createElement('td');
            tableData2.innerText=`${element.status}`;
            var tableData3=document.createElement('button');
            tableData3.setAttribute('class','btn btn-primary');
            tableData3.setAttribute('id',`button${count}`);
            tableData3.innerText=`ASSIGN!`;
            count++;
            tableBody.append(tableRow);
            tableRow.append(tableHeader)
            tableRow.append(tableData1);
            tableRow.append(tableData2);
            tableRow.append(tableData3);
            tableData3.addEventListener('click',function(){
                localStorage.setItem('name',`${element.name}`);
                window.location.href=`../mentorassign/mentorAssign.html`;
            })
        }
    });
    }
    catch(error){
        console.log(error);
    }
}

var tableBody=document.createElement('tbody');

document.body.append(tableContainer)
tableContainer.append(table);
table.append(tableBody);
getStudents();