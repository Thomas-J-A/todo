let projects = {
    default: [
        {
            title: 'Rubbish',
            description: 'Empty bins',
            dueDate: '2021-04-03',
            priority: 'high',
            isComplete: false,
            showDescription: false
        },
        { 
            title: 'Jogging',
            description: '3k run around the block',
            dueDate: '2021-04-09',
            priority: 'low',
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

    const sidebarHome = document.getElementById('sidebar_home');
    const sidebarChevron = document.getElementById('sidebar_chevron');
    const projectList = document.getElementById('sidebar_project-list');
    const mainDisplay = document.querySelector('.main');
    const addProjectBtn = document.getElementById('sidebar_add-project');
    const modalAddProject = document.getElementById('modal_add-project');
    const modalAddTask = document.getElementById('modal_add-task');
    const modalAddProjectClose = document.getElementById('modal_add-project-close');
    const modalAddTaskClose = document.getElementById('modal_add-task-close');
    const modalAddTaskProjectSelect = document.getElementById('modal_add-task-project-select');
    const projectForm = document.getElementById('form-project');
    const taskForm = document.getElementById('form-task');

    return {
        sidebarHome,
        sidebarChevron,
        projectList,
        mainDisplay,
        addProjectBtn,
        modalAddProject,
        modalAddTask,
        modalAddProjectClose,
        modalAddTaskClose,
        modalAddTaskProjectSelect,
        projectForm,
        taskForm
    };
})();


// stores listener functions
const DOMEvents = (() => {

    function renderHome() {
        DOMController.clearElement(DOMElements.mainDisplay);

        const hero = document.createElement('div');
        const title = document.createElement('h1');
        const about = document.createElement('p');
        const image = document.createElement('img');

        hero.classList.add('hero');

        title.textContent = 'TODO';
        about.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat lacus et ex ornare sodales. Quisque non eros quis purus malesuada ornare. Donec lobortis rutrum dignissim. Morbi placerat sollicitudin mauris a posuere. Nullam placerat fringilla justo, vel consequat nisi scelerisque ac. Maecenas et cursus nisl.';

        image.classList.add('hero-image');
        image.src = './images/hero-img.svg';

        hero.appendChild(title);
        hero.appendChild(about);
        hero.appendChild(image);

        DOMElements.mainDisplay.appendChild(hero);
    }


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
        // clear main display
        DOMController.clearElement(DOMElements.mainDisplay);

        // render title bar and add task button
        const mainTitle = document.createElement('h1');
        const mainAddTask = document.createElement('div');
        const plusIcon = document.createElement('i');
        const addTaskText = document.createElement('span');

        mainTitle.setAttribute('id', 'main_title');
        mainTitle.textContent = e.target.textContent;
        mainAddTask.setAttribute('id', 'main_add-task');
        mainAddTask.addEventListener('click', DOMEvents.displayModal);
        plusIcon.classList.add('fas');
        plusIcon.classList.add('fa-plus');
        addTaskText.textContent = 'Add Task';

        mainAddTask.appendChild(plusIcon);
        mainAddTask.appendChild(addTaskText);

        DOMElements.mainDisplay.appendChild(mainTitle);
        DOMElements.mainDisplay.appendChild(mainAddTask);

        // render task list
        renderTaskList();
    }


    function removeProject(e) {
        const projectToRemove = e.target.previousSibling.textContent;
        const mainTitle = document.getElementById('main_title');
        const taskList = document.getElementById('main_task-list');

        // if removing a project while on home tab, skip to end
        if (mainTitle !== null) 

            if (projectToRemove === mainTitle.textContent) {  
                // remove task list or 'no tasks' message
                if (taskList) DOMController.removeElement(taskList);
                else DOMController.removeElement(document.getElementById('msg-no-tasks'));

                // render another project/home
                if (e.target.parentNode.nextSibling) {
                    // render tasks for next project
                    mainTitle.textContent = e.target.parentNode.nextSibling.textContent;
                    renderTaskList();

                } else if (e.target.parentNode.previousSibling) {
                    // render tasks for previous project
                    mainTitle.textContent = e.target.parentNode.previousSibling.textContent;
                    renderTaskList();

                } else {
                    // no more projects - render home
                    renderHome();
                }
            }

        // remove project from projects object
        delete projects[projectToRemove];

        // re-render projectList
        DOMController.clearElement(DOMElements.projectList);
        renderProjectList();

        DOMController.updateLocalStorage();
    }


    function displayModal(e) {
        if (e.currentTarget.id === 'sidebar_add-project') {
            // open add project modal
            DOMElements.modalAddProject.classList.add('show');
        } else {
            // dynamically add project options and open task modal
            const selectMenu = DOMElements.modalAddTaskProjectSelect;
            const projectsArr = Object.keys(projects);

            DOMController.clearElement(selectMenu);  
            
            for (let i = 0; i < projectsArr.length; i++) {
                const option = document.createElement('option');
                option.value = projectsArr[i];
                option.textContent = projectsArr[i];
                selectMenu.appendChild(option);
            }

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

        // reset form and hide modal
        DOMController.resetForm(DOMElements.projectForm);
        DOMElements.modalAddProject.classList.remove('show');
        
        DOMController.updateLocalStorage();
    }


    function updateTaskList(e) {
        e.preventDefault();

        // push new task to projects object
        const title = e.target.elements[0].value;
        const description = e.target.elements[1].value;
        const dueDate = e.target.elements[2].value;
        const priority = e.target.elements[4].value;
        const isComplete = false;
        const showDescription = false;

        const project = e.target.elements[3].value;
        
        projects[project].push(Task(title, description, dueDate, priority, isComplete, showDescription));

        // re-render current task list if task is 
        // added to currently displayed project
        const currentProject = document.getElementById('main_title').textContent;

        if (project === currentProject) {
            // remove current list/'no tasks' message
            const taskList = document.getElementById('main_task-list');

            if(taskList) {
                DOMController.removeElement(taskList);
            } else {
                const msg = document.getElementById('msg-no-tasks');
                DOMController.removeElement(msg);
            }
            
            renderTaskList();
        }

        // reset form and hide modal
        DOMController.resetForm(DOMElements.taskForm);
        DOMElements.modalAddTask.classList.remove('show');

        DOMController.updateLocalStorage();
    }


    function renderTaskList() {
        // cache list of tasks for currently displayed project
        const currentProject = document.getElementById('main_title').textContent;
        const tasks = projects[currentProject];

        // check if tasks exist for currently displayed project
        if (tasks.length > 0) {

            // create list element
            const taskList = document.createElement('ul');
            taskList.setAttribute('id', 'main_task-list');

            // append each task to list
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

                checkBtn.classList.add('task-checkbox');

                if (tasks[i].isComplete) {
                    checkBtn.classList.add('checked');
                } else {
                    checkBtn.classList.add('unchecked');
                }

                checkBtn.addEventListener('click', toggleCheckbox);

                title.classList.add('task-title');
                title.textContent = tasks[i].title;

                dueDate.classList.add('task-due-date')
                dueDate.textContent = tasks[i].dueDate;

                removeBtn.classList.add('task-remove');
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

                taskList.appendChild(taskItem);
            }    

            // append list to main display
            DOMElements.mainDisplay.appendChild(taskList);
        } else {
            // display 'no tasks' message
            const noTasksMsg = document.createElement('p');
            noTasksMsg.setAttribute('id', 'msg-no-tasks');
            noTasksMsg.textContent = 'No Tasks To Display';
            DOMElements.mainDisplay.appendChild(noTasksMsg);
        }      
    }


    function toggleCheckbox(e) {
        // cache current project name and index of checked/unchecked task
        const currentProject = document.getElementById('main_title').textContent;
        const index = e.target.parentNode.parentNode.dataset.index;

        const checkbox = e.target;

        if (checkbox.classList.contains('unchecked')) {
            // check box and update projects object
            checkbox.classList.remove('unchecked');
            checkbox.classList.add('checked')

            projects[currentProject][index].isComplete = true;
        } else {
            // uncheck box and update projects object
            checkbox.classList.remove('checked');
            checkbox.classList.add('unchecked');

            projects[currentProject][index].isComplete = false;
        }

        DOMController.updateLocalStorage();
    }


    function toggleDescription(e) {
        // cache current project name and index of toggled task
        const currentProject = document.getElementById('main_title').textContent;
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

        DOMController.updateLocalStorage();
    }


    function removeTask(e) {
        // cache current project name and index of deleted task
        const currentProject = document.getElementById('main_title').textContent;
        const index = e.target.parentNode.parentNode.dataset.index;

        // remove from associated project array
        projects[currentProject].splice(index, 1);
        
        // re-render task list
        DOMController.removeElement(document.getElementById('main_task-list'));
        renderTaskList();

        DOMController.updateLocalStorage();
    }


    function closeModal(e) {
        if (e.target.classList.contains('modal')) {
            // clicked outside modal box
            if (e.target.id === 'modal_add-project') {
                DOMController.resetForm(DOMElements.projectForm);
            } else {
                DOMController.resetForm(DOMElements.taskForm);
            }
            e.target.classList.remove('show');

        } else if (e.target.id == 'modal_add-project-close') {
            // closed add project modal box
            DOMController.resetForm(DOMElements.projectForm);
            DOMElements.modalAddProject.classList.remove('show');

        } else if (e.target.id == 'modal_add-task-close') {
            // closed add task modal box
            DOMController.resetForm(DOMElements.taskForm);
            DOMElements.modalAddTask.classList.remove('show');
        }
    }
    
    return {
        renderHome,
        toggleProjectList,
        displayModal,
        updateProjectList,
        updateTaskList,
        closeModal
    }
})();


// sets event listeners
const DOMListeners = (() => {

    DOMElements.sidebarHome.addEventListener('click', DOMEvents.renderHome);
    DOMElements.sidebarChevron.addEventListener('click', DOMEvents.toggleProjectList);
    DOMElements.addProjectBtn.addEventListener('click', DOMEvents.displayModal);
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

    
    function removeElement(element) {
        element.remove();
    }

    function resetForm(element) {
        element.reset();
    }


    function updateLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }


    function init() {
        // set projects object to localStorage object if it exists
        const existing = localStorage.getItem('projects');

        if (existing) {
            projects = JSON.parse(existing);
        }

        DOMEvents.renderHome();
    }


    return {
        clearElement,
        removeElement,
        resetForm,
        updateLocalStorage,
        init
    }
})();

DOMController.init();