"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(_, _2, descriptor) {
    const origin = descriptor.value;
    const adj = {
        configurable: true,
        get() {
            const boun = origin.bind(this);
            return boun;
        }
    };
    return adj;
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    addProjext(title, descriptor, numOfPeople) {
        const list = new Project(Math.random().toString(), title, descriptor, numOfPeople, ProjectStatus.Active);
        this.projects.push(list);
        this.updatelist();
    }
    moveProjrct(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updatelist();
        }
    }
    updatelist() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    static getInstance() {
        if (this.acc) {
            return this.acc;
        }
        else {
            this.acc = new ProjectState();
            return this.acc;
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validatableinput) {
    let isvali = true;
    if (validatableinput.required) {
        isvali = isvali && validatableinput.value.toString().trim().length !== 0;
    }
    if (validatableinput.minLength != null && typeof validatableinput.value === 'string') {
        isvali = isvali && validatableinput.value.length >= validatableinput.minLength;
    }
    if (validatableinput.maxLength != null && typeof validatableinput.value === 'string') {
        isvali = isvali && validatableinput.value.length <= validatableinput.maxLength;
    }
    if (validatableinput.min != null && typeof validatableinput.value === 'number') {
        isvali = isvali && validatableinput.value >= validatableinput.min;
    }
    if (validatableinput.max != null && typeof validatableinput.value === 'number') {
        isvali = isvali && validatableinput.value <= validatableinput.max;
    }
    return isvali;
}
class Component {
    constructor(templateId, hostElementId, inserAtStart, newElementId) {
        this.templateElenmet = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importNode = document.importNode(this.templateElenmet.content, true);
        this.element = importNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(inserAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 Person';
        }
        else {
            return `${this.project.people} Person`;
        }
    }
    dragstar(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragend(event) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragstar);
        this.element.addEventListener('dragend', this.dragend);
        this.element.addEventListener('dragstart', this.dragstar);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + 'assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragstar", null);
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProject = [];
        this.configure();
        this.renderContent();
    }
    dragleave(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    dragover(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    drop(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProjrct(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    configure() {
        this.element.addEventListener('dragover', this.dragover);
        this.element.addEventListener('dragleave', this.dragleave);
        this.element.addEventListener('drop', this.drop);
        projectState.addListener((projects) => {
            const relebant = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProject = relebant;
            this.renderProjects();
        });
    }
    renderContent() {
        const listid = `${this.type}-prokects-list`;
        this.element.querySelector('ul').id = listid;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + 'PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-prokects-list`);
        for (const prjItem of this.assignedProject) {
            new ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragleave", null);
__decorate([
    autobind
], ProjectList.prototype, "dragover", null);
__decorate([
    autobind
], ProjectList.prototype, "drop", null);
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInpuntElenmet = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submHandle.bind(this));
    }
    renderContent() {
    }
    gattherinput() {
        const enttitle = this.titleInputElement.value;
        const entdescription = this.descriptionInputElement.value;
        const entpeople = this.peopleInpuntElenmet.value;
        const intitle = {
            value: enttitle,
            required: true
        };
        const indescription = {
            value: entdescription,
            required: true,
            minLength: 1,
            maxLength: 10
        };
        const inpeople = {
            value: entpeople,
            required: true,
            min: 1,
            max: 10
        };
        if (!validate(intitle) ||
            !validate(indescription) ||
            !validate(inpeople)) {
            alert('请重新输入');
            return;
        }
        else {
            return [enttitle, entdescription, +entpeople];
        }
    }
    removeimpunt() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInpuntElenmet.value = '';
    }
    submHandle(event) {
        event.preventDefault();
        const userinpunt = this.gattherinput();
        if (Array.isArray(userinpunt)) {
            const [title, desc, people] = userinpunt;
            projectState.addProjext(title, desc, people);
        }
        this.removeimpunt();
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submHandle", null);
const prjInput = new ProjectInput();
const prjList = new ProjectList('active');
const prjList2 = new ProjectList('finished');
