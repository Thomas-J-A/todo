(()=>{let e={programming:[{title:"Learn React",description:"Begin Youtube tutorials",dueDate:"2021-04-2",priority:"medium",isComplete:!1,showDescription:!0},{title:"Todo app",description:"Finish styles and storage functionality",dueDate:"2021-03-31",priority:"high",isComplete:!1,showDescription:!1}],housework:[{title:"Wash dishes",description:"Wash all dishes in kitchen sink",dueDate:"2021-03-30",priority:"high",isComplete:!1,showDescription:!1}]};const t={sidebarHome:document.getElementById("sidebar_home"),sidebarChevron:document.getElementById("sidebar_chevron"),projectList:document.getElementById("sidebar_project-list"),mainDisplay:document.querySelector(".main"),addProjectBtn:document.getElementById("sidebar_add-project"),modalAddProject:document.getElementById("modal_add-project"),modalAddTask:document.getElementById("modal_add-task"),modalAddProjectClose:document.getElementById("modal_add-project-close"),modalAddTaskClose:document.getElementById("modal_add-task-close"),modalAddTaskProjectSelect:document.getElementById("modal_add-task-project-select"),projectForm:document.getElementById("form-project"),taskForm:document.getElementById("form-task")},n=(()=>{function d(){a.clearElement(t.mainDisplay);const e=document.createElement("div"),n=document.createElement("h1"),d=document.createElement("p");n.textContent="TODO",d.textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat lacus et ex ornare sodales. Quisque non eros quis purus malesuada ornare. Donec lobortis rutrum dignissim. Morbi placerat sollicitudin mauris a posuere. Nullam placerat fringilla justo, vel consequat nisi scelerisque ac. Maecenas et cursus nisl.",e.appendChild(n),e.appendChild(d),t.mainDisplay.appendChild(e)}function s(){const n=Object.keys(e);if(n.length>0)for(let e=0;e<n.length;e++){const a=document.createElement("li"),d=document.createElement("span"),s=document.createElement("i");d.classList.add("sidebar_project-list-name"),d.textContent=n[e],d.addEventListener("click",o),s.classList.add("fas"),s.classList.add("fa-times"),s.addEventListener("click",i),a.appendChild(d),a.appendChild(s),t.projectList.appendChild(a)}else{const e=document.createElement("li");e.textContent="No Projects To Display",t.projectList.appendChild(e)}}function o(e){a.clearElement(t.mainDisplay);const d=document.createElement("div"),s=document.createElement("span"),o=document.createElement("div"),i=document.createElement("i"),c=document.createElement("span");d.setAttribute("id","main_title-wrapper"),s.setAttribute("id","main_title"),s.textContent=e.target.textContent,o.setAttribute("id","main_add-task"),o.addEventListener("click",n.displayModal),i.classList.add("fas"),i.classList.add("fa-plus"),c.textContent="Add Task",o.appendChild(i),o.appendChild(c),d.appendChild(s),d.appendChild(o),t.mainDisplay.appendChild(d),l()}function i(n){const o=n.target.previousSibling.textContent,i=document.getElementById("main_title"),c=document.getElementById("main_task-list");null!==i&&o===i.textContent&&(c?a.removeElement(c):a.removeElement(document.getElementById("msg-no-tasks")),n.target.parentNode.nextSibling?(i.textContent=n.target.parentNode.nextSibling.textContent,l()):n.target.parentNode.previousSibling?(i.textContent=n.target.parentNode.previousSibling.textContent,l()):d()),delete e[o],a.clearElement(t.projectList),s()}function l(){const n=document.getElementById("main_title").textContent,a=e[n];if(a.length>0){const e=document.createElement("ul");e.setAttribute("id","main_task-list");for(let t=0;t<a.length;t++){const n=document.createElement("li"),d=document.createElement("div"),s=document.createElement("div"),o=document.createElement("span"),i=document.createElement("span"),l=document.createElement("i"),m=document.createElement("i"),p=document.createElement("p");n.setAttribute("data-index",t),"low"===a[t].priority?d.classList.add("priority-low"):"medium"===a[t].priority?d.classList.add("priority-medium"):d.classList.add("priority-high"),a[t].isComplete?s.classList.add("checked"):s.classList.add("unchecked"),o.textContent=a[t].title,i.textContent=a[t].dueDate,l.classList.add("fas"),l.classList.add("fa-trash-alt"),l.addEventListener("click",r),!0===a[t].showDescription&&m.classList.add("open"),m.classList.add("fas"),m.classList.add("fa-chevron-down"),m.addEventListener("click",c),!0===a[t].showDescription&&p.classList.add("show"),p.classList.add("description"),p.textContent=a[t].description,d.appendChild(s),d.appendChild(o),d.appendChild(i),d.appendChild(l),d.appendChild(m),n.appendChild(d),n.appendChild(p),e.appendChild(n)}t.mainDisplay.appendChild(e)}else{const e=document.createElement("p");e.setAttribute("id","msg-no-tasks"),e.textContent="No Tasks To Display",t.mainDisplay.appendChild(e)}}function c(t){const n=document.getElementById("main_title").textContent,a=t.target.parentNode.parentNode.dataset.index;t.target.classList.contains("open")?(t.target.classList.remove("open"),t.target.parentNode.nextSibling.classList.remove("show"),e[n][a].showDescription=!1):(t.target.classList.add("open"),t.target.parentNode.nextSibling.classList.add("show"),e[n][a].showDescription=!0)}function r(t){const n=document.getElementById("main_title").textContent,d=t.target.parentNode.parentNode.dataset.index;e[n].splice(d,1),a.removeElement(document.getElementById("main_task-list")),l()}return{renderHome:d,toggleProjectList:function(){const e=t.sidebarChevron.classList;e.contains("open")?(e.remove("open"),a.clearElement(t.projectList)):(e.add("open"),s())},displayModal:function(n){if("sidebar_add-project"===n.currentTarget.id)t.modalAddProject.classList.add("show");else{const n=t.modalAddTaskProjectSelect,d=Object.keys(e);a.clearElement(n);for(let e=0;e<d.length;e++){const t=document.createElement("option");t.value=d[e],t.textContent=d[e],n.appendChild(t)}t.modalAddTask.classList.add("show")}},updateProjectList:function(n){n.preventDefault();const d=n.target.elements[0].value;e[d]=[],t.sidebarChevron.classList.contains("open")&&(a.clearElement(t.projectList),s()),t.modalAddProject.classList.remove("show")},updateTaskList:function(n){n.preventDefault();const d=n.target.elements[0].value,s=n.target.elements[1].value,o=n.target.elements[2].value,i=n.target.elements[4].value,c=n.target.elements[3].value;if(e[c].push(function(e,t,n,a,d,s){return{title:e,description:t,dueDate:n,priority:a,isComplete:!1,showDescription:!1}}(d,s,o,i)),c===document.getElementById("main_title").textContent){const e=document.getElementById("main_task-list");if(e)a.removeElement(e);else{const e=document.getElementById("msg-no-tasks");a.removeElement(e)}l()}t.modalAddTask.classList.remove("show")},closeModal:function(e){e.target.classList.contains("modal")?e.target.classList.remove("show"):"modal_add-project-close"==e.target.id?t.modalAddProject.classList.remove("show"):"modal_add-task-close"==e.target.id&&t.modalAddTask.classList.remove("show")}}})(),a=(t.sidebarHome.addEventListener("click",n.renderHome),t.sidebarChevron.addEventListener("click",n.toggleProjectList),t.addProjectBtn.addEventListener("click",n.displayModal),t.modalAddProjectClose.addEventListener("click",n.closeModal),t.modalAddTaskClose.addEventListener("click",n.closeModal),window.addEventListener("click",n.closeModal),t.projectForm.addEventListener("submit",n.updateProjectList),t.taskForm.addEventListener("submit",n.updateTaskList),{clearElement:function(e){e.textContent=""},removeElement:function(e){e.remove()}});n.renderHome()})();