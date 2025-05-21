const input = document.querySelector("#a001");
const button = document.querySelector("#a002");
const ul = document.querySelector("#a004");
const all = document.querySelector("#a005");
const Completed = document.querySelector("#a006");
const Incompleted = document.querySelector("#a007");
const date = document.querySelector("#a008");
function cr_task(p, ready, deadline, time) {
  const inp = input.value.trim() || p;
  if (inp == "" || inp == undefined) {
    alert("пожалуйста введите Task");
    0;
    return;
  }
  deadline = deadline || date.value;
  time = time || Date.now();
  const list = document.createElement("li");
  const del = document.createElement("button");
  const done = document.createElement("button");
  const redact = document.createElement("button");
  const text = document.createElement("p");
  const date_1 = document.createElement("p");
  redact.innerText = "Edit";
  del.innerText = "Delete";
  done.innerText = "Complete";
  done.setAttribute("class", "done");
  del.setAttribute("class", "del");
  redact.setAttribute("class", "edit");
  date_1.innerText = deadline ? deadline : "бессрочно";
  if (ready) {
    list.classList.add("ready");
  }
  done.onclick = () => {
    list.classList.toggle("ready");
    save_task();
  };
  del.onclick = () => {
    ul.removeChild(list);
    save_task();
  };
  text.innerText = inp;
  list.setAttribute("deadline", deadline);
  list.setAttribute("Time", time);
  list.append(done, del, redact, text, date_1);
  ul.append(list);
  input.value = "";

  redact.onclick = () => {
    edition(list, text);
  };
}
button.onclick = () => {
  cr_task();
  save_task();
};
function edition(Task, tasktekst) {
  const input_1 = document.createElement("input");
  input_1.setAttribute("class", "editinp");
  input_1.setAttribute("type", "text");
  Task.replaceChild(input_1, tasktekst);
  const save = document.createElement("button");
  save.setAttribute("class", "save");
  save.innerText = "Save";
  Task.append(save);
  save.onclick = () => {
    tasktekst.innerText = input_1.value.trim() || "empty task";
    Task.replaceChild(tasktekst, input_1);
    Task.removeChild(save);
    save_task();
  };
}
function save_task() {
  const tasks = [];
  const ulala = document.querySelectorAll("li");
  ulala.forEach((task) => {
    tasks.push({
      task_t: task.querySelector("p").innerText,
      task_c: task.classList.contains("ready"),
      task_d: task.getAttribute("deadline"),
      task_ti: task.getAttribute("Time"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function load_tasks() {
  const loading = JSON.parse(localStorage.getItem("tasks"))|| [];
  loading.forEach((task) => 
    cr_task(task.task_t, task.task_c, task.task_d, task.task_ti)
  );
}
load_tasks();
function filter_task(filter) {
  const ulala = document.querySelectorAll("li");
  ulala.forEach((task) => {
    switch (filter) {
      case "all":
        task.style.display = "block";
        break;
      case "completed":
        if (task.classList.contains("ready") == true) {
          task.style.display = "block";
        } else {
          task.style.display = "none";
        }
        break;
      case "incompleted":
        task.style.display = task.classList.contains("ready")
          ? "none"
          : "block";
        break;
    }
  });
}
all.onclick = () => {
  filter_task("all");
};
Completed.onclick = () => {
  filter_task("completed");
};
Incompleted.onclick = () => {
  filter_task("incompleted");
};

function checkDL() {
  const data = new Date().toISOString().split("T")[0];
  const ulala = document.querySelectorAll("li");
  ulala.forEach((task) => {
    const opop = task.getAttribute("deadline");
    if (data > opop && !task.classList.contains("ready") && opop) {
      task.style.backgroundColor = "red";
    } else {
      task.style.backgroundColor = "None";
    }
  });
}
checkDL();
const vibori = document.getElementById("bbb");
function viborii(SMISL) {
  const tasssk = [...document.getElementsByTagName("li")];
  let massive = [];
  switch (SMISL) {
    case "smisl":
      massive = tasssk.sort((a, b) => {
        a.querySelector("p").innerText.localeCompare(
          b.querySelector("p").innerText
        );
      });
      break;
    case "smisl1":
      massive = tasssk.sort((a, b) => {
        b.querySelector("p").innerText.localeCompare(
          a.querySelector("p").innerText
        );
      });
      break;
    case "smisl2":
      massive = tasssk.sort((a, b) => {
        parseInt(b.getAttribute("Time")) - parseInt(a.getAttribute("Time"));
      });
      break;
    case "smisl3":
      massive = tasssk.sort((a, b) => {
        parseInt(a.getAttribute("Time")) - parseInt(b.getAttribute("Time"));
      });
      break;
    case "smisl4":
      massive = tasssk.sort((a, b) => {
        parseInt(b.getAttribute("Time")) - parseInt(a.getAttribute("Time"));
        b.classList.contains('ready')-a.classList.contains('ready');
      });
      break;
    case "smisl5":
      massive = tasssk.sort((a, b) => {
        a.classList.contains('ready')-b.classList.contains('ready');
      });
      break;
  }
  console.log(massive)
  return massive
}

vibori.addEventListener('change',(event)=>{
  const smisl = event.target.value
  const mass = vibori(smisl)
})

viborii('smisl5')
