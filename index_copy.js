let projects = {
    programming: [
        { 
            title: 'Learn React',
            description: 'Begin Youtube tutorials',
            dueDate: '2021-04-2',
            priority: 'medium',
            isComplete: false,
            showDescription: true
        },
        {
            title: 'Todo app',
            description: 'Finish styles and storage functionality',
            dueDate: '2021-03-31',
            priority: 'high',
            isComplete: false,
            showDescription: false
        }
    ],
    housework: [
        {
            title: 'Wash dishes',
            description: 'Wash all dishes in kitchen sink',
            dueDate: '2021-03-30',
            priority: 'high',
            isComplete: false,
            showDescription: false
        }
    ]
}


function Task(title, description, dueDate, priority, isComplete, showDescription) {
    return {
        title,
        description,
        dueDate,
        priority,
        isComplete,
        showDescription
    }
}


// caches DOM elements 
const DOMElements = (() => {

    const sidebarChevron = document.getElementById('sidebar_chevron');
    const projectList = document.getElementById('sidebar_project-list');
    const taskList = document.getElementById('main_task-list');
    const mainTitle = document.getElementById('main_title');
    const addProjectBtn = document.getElementById('sidebar_add-project');
    const addTaskBtn = document.getElementById('main_add-task');
    const modalAddProject = document.getElementById('modal_add-project');
    const modalAddTask = document.getElementById('modal_add-task');
    const modalAddProjectClose = document.getElementById('modal_add-project-close');
    const modalAddTaskClose = document.getElementById('modal_add-task-close');
    const projectForm = document.getElementById('form-project');
    const taskForm = document.getElementById('form-task');

    return {
        sidebarChevron,
        projectList,
        taskList,
        mainTitle,
        addProjectBtn,
        addTaskBtn,
        modalAddProject,
        modalAddTask,
        modalAddProjectClose,
        modalAddTaskClose,
        projectForm,
        taskForm
    };
})();


// stores listener functions
const DOMEvents = (() => {

    function toggleProjectList() {
        const classList = DOMElements.sidebarChevron.classList;

        if (classList.contains('open')) {
            // close list
            classList.remove('open')
            DOMController.clearElement(DOMElements.projectList);
        } else {
            // open list
            classList.add('open');
            renderProjectList();
        }
    }        


    function renderProjectList() {
        // cache project names
        const projectsArr = Object.keys(projects); 

        // check if any projects exist
        if (projectsArr.length > 0) {

            // render each project
            for (let i = 0; i < projectsArr.length; i++) {
                const li = document.createElement('li');
                const projectName = document.createElement('span');
                const removeBtn = document.createElement('i');
    
                projectName.classList.add('sidebar_project-list-name');
                projectName.textContent = projectsArr[i];
                projectName.addEventListener('click', updateMain);
    
                removeBtn.classList.add('fas')
                removeBtn.classList.add('fa-times');
                removeBtn.addEventListener('click', removeProject);
    
                li.appendChild(projectName);
                li.appendChild(removeBtn);
    
                DOMElements.projectList.appendChild(li);
            }
        } else {
            // display 'no projects' message
            const noProjectsMsg = document.createElement('li');
            noProjectsMsg.textContent = 'No Projects To Display';
            DOMElements.projectList.appendChild(noProjectsMsg);
        }       
    }

    
    function updateMain(e) {
        // change main title
        DOMElements.mainTitle.textContent = e.target.textContent;

        // re-render display
        DOMController.clearElement(DOMElements.taskList);
        renderTaskList();
    }


    function removeProject(e) {
        // remove project from projects object
        const projectName = e.target.previousSibling.textContent;
        delete projects[projectName];

        // re-render projectList
        DOMController.clearElement(DOMElements.projectList);
        renderProjectList();

        // since all related tasks are deleted too, set main
        // display to default 'ALL' tab
    }


    function displayModal(e) {
        if (e.currentTarget.id === 'sidebar_add-project') {
            // open add project modal
            DOMElements.modalAddProject.classList.add('show');
        } else {
            // open add task modal
            DOMElements.modalAddTask.classList.add('show');
        }
    }

    
    function updateProjectList(e) {
        e.preventDefault();

        const projectName = e.target.elements[0].value;
        projects[projectName] = [];

        if (DOMElements.sidebarChevron.classList.contains('open')) {
            DOMController.clearElement(DOMElements.projectList);
            renderProjectList();
        }

        DOMElements.modalAddProject.classList.remove('show');            
    }


    function updateTaskList(e) {
        e.preventDefault();

        // cache currently displayed project's name
        const currentProject = DOMElements.mainTitle.textContent;

        const title = e.target.elements[0].value;
        const description = e.target.elements[1].value;
        const dueDate = e.target.elements[2].value;
        const priority = e.target.elements[3].value;
        const isComplete = false;
        const showDescription = false;
        
        projects[currentProject].push(Task(title, description, dueDate, priority, isComplete, showDescription));

        DOMController.clearElement(DOMElements.taskList);

        renderTaskList();

        DOMElements.modalAddTask.classList.remove('show');
    }


    function renderTaskList() {
        // cache list of tasks for currently displayed project
        const currentProject = DOMElements.mainTitle.textContent;
        const tasks = projects[currentProject];

        // check if tasks exist for currently displayed project
        if (tasks.length > 0) {

            // render each task
            for (let i = 0; i < tasks.length; i++) {

                const taskItem = document.createElement('li');
                const wrapper = document.createElement('div');
                const checkBtn = document.createElement('div');
                const title = document.createElement('span');
                const dueDate = document.createElement('span');
                const removeBtn = document.createElement('i');
                const expandBtn = document.createElement('i');
                const description = document.createElement('p');

                taskItem.setAttribute('data-index', i);

                if (tasks[i].priority === 'low') {
                    wrapper.classList.add('priority-low');
                } else if (tasks[i].priority === 'medium') {
                    wrapper.classList.add('priority-medium');
                } else {
                    wrapper.classList.add('priority-high');
                }

                if (tasks[i].isComplete) {
                    checkBtn.classList.add('checked');
                } else {
                    checkBtn.classList.add('unchecked');
                }

                title.textContent = tasks[i].title;

                dueDate.textContent = tasks[i].dueDate;

                removeBtn.classList.add('fas');
                removeBtn.classList.add('fa-trash-alt');
                removeBtn.addEventListener('click', removeTask);

                if (tasks[i].showDescription === true) {
                    expandBtn.classList.add('open');
                }
                expandBtn.classList.add('fas');
                expandBtn.classList.add('fa-chevron-down');
                expandBtn.addEventListener('click', toggleDescription);

                if (tasks[i].showDescription === true) {
                    description.classList.add('show');
                }
                description.classList.add('description');
                description.textContent = tasks[i].description;
        
                wrapper.appendChild(checkBtn);
                wrapper.appendChild(title);
                wrapper.appendChild(dueDate);
                wrapper.appendChild(removeBtn);
                wrapper.appendChild(expandBtn);

                taskItem.appendChild(wrapper);
                taskItem.appendChild(description);

                DOMElements.taskList.appendChild(taskItem);
            }    
        } else {
            // display 'no tasks' message
            const noTasksMsg = document.createElement('li');
            noTasksMsg.textContent = 'No Tasks To Display';
            DOMElements.taskList.appendChild(noTasksMsg);
        }      
    }


    function toggleDescription(e) {
        // cache current project name and index of toggled task
        const currentProject = DOMElements.mainTitle.textContent;
        const index = e.target.parentNode.parentNode.dataset.index;

        if (e.target.classList.contains('open')) {
            // hide description
            e.target.classList.remove('open');
            e.target.parentNode.nextSibling.classList.remove('show');
            projects[currentProject][index].showDescription = false;
        } else {
            // show description
            e.target.classList.add('open');
            e.target.parentNode.nextSibling.classList.add('show');
            projects[currentProject][index].showDescription = true;
        }
    }


    function removeTask(e) {
        // cache current project name and index of deleted task
        const currentProject = DOMElements.mainTitle.textContent;
        const index = e.target.parentNode.parentNode.dataset.index;

        // remove from associated project array
        projects[currentProject].splice(index, 1);
        
        // re-render task list
        DOMController.clearElement(DOMElements.taskList);
        renderTaskList();
    }


    function closeModal(e) {
        // reset input fields before closing modal box
        if (e.target.classList.contains('modal')) {
            // clicked outside modal box
            e.target.classList.remove('show');
        } else if (e.target.id == 'modal_add-project-close') {
            // closed add project modal box
            DOMElements.modalAddProject.classList.remove('show');
        } else if (e.target.id == 'modal_add-task-close') {
            // closed add task modal box
            DOMElements.modalAddTask.classList.remove('show');
        }
    }
    
    return {
        toggleProjectList,
        displayModal,
        updateProjectList,
        updateTaskList,
        closeModal
    }
})();


// sets event listeners
const DOMListeners = (() => {

    DOMElements.sidebarChevron.addEventListener('click', DOMEvents.toggleProjectList);
    DOMElements.addProjectBtn.addEventListener('click', DOMEvents.displayModal);
    DOMElements.addTaskBtn.addEventListener('click', DOMEvents.displayModal);
    DOMElements.modalAddProjectClose.addEventListener('click', DOMEvents.closeModal);
    DOMElements.modalAddTaskClose.addEventListener('click', DOMEvents.closeModal);
    window.addEventListener('click', DOMEvents.closeModal);
    DOMElements.projectForm.addEventListener('submit', DOMEvents.updateProjectList);
    DOMElements.taskForm.addEventListener('submit', DOMEvents.updateTaskList);
})();


// 
const DOMController = (() => {

    function clearElement(element) {
        element.textContent = '';
    }


    return {
        clearElement
    }
})();


/*
<div id="main_title-wrapper">
    <span id="main_title"></span>
    <div id="main_add-task">
        <i class="fas fa-plus"></i>
        <span>Add Task</span>
    </div>
</div>
<ul id="main_task-list"></ul>
*/