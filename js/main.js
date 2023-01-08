// Tạo danh sách việc cần làm
let workList = [];

// thêm việc cần làm vào mảng
document.querySelector("#addItem").onclick = function (event) {
  // chặn sự kiện reload brower
  event.preventDefault();
  // Dom imput
  let work = document.getElementById("newTask").value;
  if (work == "") {
    alert("Bạn sẽ làm gì hôm nay!!!");
  } else {
    workList.push(work);
    
    document.getElementById("newTask").innerHTML = "";
    saveWorkList();
    renderWorkList();
  }
 
};

// lưu vào local

let saveWorkList = () => {
  const workListJS = JSON.stringify(workList);
  localStorage.setItem("WL", workListJS);
};

// // lấy dữ liệu dươi local

let getLocal = () => {
  let workListJS = localStorage.getItem("WL");
  if (!workListJS) return;
  let workListLocal = JSON.parse(workListJS);
  return workListLocal;
};

//  in dữ liêu ra html

let renderWorkList = () => {
  let html = "";
  for (let index in workList) {
    html += `<li>
    <p>${workList[index]}</p>
    <div>
     <i class=" delete fa fa-trash-alt" onclick="deleteWork (${index})"></i>
    <i class=" completed fa fa-check-circle" onclick="completedWork (${index})"></i>
    </div>
    </li>`;
    document.getElementById("todo").innerHTML = html;
  }
};

// xóa việc cần làm

let deleteWork = (values) => {
  for (let index in workList) {
    if (index == values) {
      workList.splice(index, 1);
    }
  }
  
  renderWorkList();
  saveWorkList();
};

// ddash dấu việc đã hoàn thành
// tạo 1 mảng mới
// kiểm tra việc nào đã làm thì push vào mảng mới
// sau đó in ra màn hình
let workCompleteList = [];

let completedWork = (value) => {
  for (let index in workList) {
    if (index == value) {
      workCompleteList.push(workList[index]);
      deleteWork(value);
    }
  }

  saveWorkListComplete();
  renderWorkListComplete();
};

// Lưu việc đã làm vào local
let saveWorkListComplete = () => {
  const workListCompleteJS = JSON.stringify(workCompleteList);
  localStorage.setItem("WLC", workListCompleteJS);
};

// // lấy viêc cần làm và in ra màn hình

let getLocalComplete = () => {
  let workListCompleteJS = localStorage.getItem("WLC");
  if (!workListCompleteJS) return;
  let workListCompleteLocal = JSON.parse(workListCompleteJS);
  return workListCompleteLocal;
};

let renderWorkListComplete = () => {
  let html = "";
  for (let index in workCompleteList) {
    html += `<li>
      <p>${workCompleteList[index]}</p>
      <div>
       <i class=" delete fa fa-trash-alt" onclick="deleteWorkComplete (${index})"></i>
     
      </div>
      </li>`;
    document.getElementById("completed").innerHTML = html;
  }
};
// xóa việc đã làm
let deleteWorkComplete = (values) => {
  for (let index in workCompleteList) {
    if (index == values) {
      workCompleteList.splice(index, 1);
    }
  }
  renderWorkListComplete();
  saveWorkListComplete();
};

window.onload = function () {
  workCompleteList = getLocalComplete();
  workList = getLocal();
  renderWorkList();
  renderWorkListComplete();
};
// săp xếp việc theo thứ tự từ a - z

 document.querySelector("#three").onclick = () =>{
    workList.sort(function(a,b){
        return a.localeCompare(b)
    })
    console.log(workList)

    renderWorkList()
}
// săp xếp việc theo thứ tự nguoijc lại\

 document.querySelector("#two").onclick =() =>{
    workList.sort(function(a,b){
        return b.localeCompare(a)
    })
    renderWorkList()
}
