let projects = ['default', 'programming'];

let tasks = [];

function Task(title, project, description, dueDate, priority, isComplete) {
    return {
        title,
        project,
        description,
        dueDate,
        priority,
        isComplete
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
        for (let i = 0; i < projects.length; i++) {
            const li = document.createElement('li');
            const projectName = document.createElement('span');
            const removeBtn = document.createElement('i');

            li.setAttribute('data-index', i);

            projectName.textContent = projects[i];
            projectName.addEventListener('click', updateMain);

            removeBtn.classList.add('fas')
            removeBtn.classList.add('fa-times');
            removeBtn.addEventListener('click', removeProject);

            li.appendChild(projectName);
            li.appendChild(removeBtn);

            DOMElements.projectList.appendChild(li);
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
        // also remove related tasks
        projects.splice(e.target.parentNode.dataset.index, 1);
        DOMController.clearElement(DOMElements.projectList);
        renderProjectList();
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

        const newProject = e.target.elements[0].value;
        projects.push(newProject);

        if (DOMElements.sidebarChevron.classList.contains('open')) {
            DOMController.clearElement(DOMElements.projectList);
            renderProjectList();
        }

        DOMElements.modalAddProject.classList.remove('show');            
    }

    function updateTaskList(e) {
        e.preventDefault();

        const title = e.target.elements[0].value;
        const project = DOMElements.mainTitle.textContent;
        const description = e.target.elements[1].value;
        const dueDate = e.target.elements[2].value;
        const priority = e.target.elements[3].value;
        const isComplete = false;
        
        tasks.push(Task(title, project, description, dueDate, priority, isComplete));

        DOMController.clearElement(DOMElements.taskList);

        renderTaskList();

        DOMElements.modalAddTask.classList.remove('show');

        //tasks.forEach((task) => {console.log(task)});
    }

    function renderTaskList() {
        // cache currently displayed project name
        const title = DOMElements.mainTitle.textContent;

        for (let i = 0; i < tasks.length; i++) {

            // render tasks for currently displayed project
            if (tasks[i].project === title) {   
                const taskItem = document.createElement('li');
                const wrapper = document.createElement('div');
                const checkBtn = document.createElement('div');
                const title = document.createElement('span');
                const dueDate = document.createElement('span');
                const removeBtn = document.createElement('i');
                const expandBtn = document.createElement('i');
                const description = document.createElement('p');

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

                expandBtn.classList.add('fas');
                expandBtn.classList.add('fa-chevron-down');
                expandBtn.addEventListener('click', toggleDescription);

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
        }    
    }

    function toggleDescription(e) {
        const element = e.target;

        if (element.classList.contains('open')) {
            // hide description
            element.classList.remove('open');
            element.parentNode.nextSibling.classList.remove('show');
        } else {
            // show description
            element.classList.add('open');
            element.parentNode.nextSibling.classList.add('show');
        }
    }

    function removeTask(e) {
        const element = e.target;
        console.log(element);

        /*
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].title === element.)
        }*/
    }

    /*
    function removeProject(e) {
        // also remove related tasks
        projects.splice(e.target.parentNode.dataset.index, 1);
        DOMController.clearElement(DOMElements.projectList);
        renderProjectList();
    }*/

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
