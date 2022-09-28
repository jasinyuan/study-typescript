function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const origin = descriptor.value;
    const adj: PropertyDescriptor = {
        configurable: true,
        get() {
            const boun = origin.bind(this)
            return boun;
        }
    };
    return adj;
}

interface Draggable {
    dragstar(event:DragEvent):void;
    dragend(event:DragEvent):void;
}

interface DragTarget {
    dragover(event:DragEvent):void;
    drop(event:DragEvent):void;
    dragleave(event:DragEvent):void;
}

enum ProjectStatus { Active, Finished }
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus) {
    }
}

type Listener<T> = (items: T[]) => void

class State<T>{
    protected listeners: Listener<T>[] = []

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static acc: ProjectState;

    private constructor(){
        super();
    }

    addProjext(title: string, descriptor: string, numOfPeople: number) {
        const list = new Project(Math.random().toString(),
            title,
            descriptor,
            numOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(list);
        this.updatelist();
    }

    moveProjrct(projectId:string,newStatus:ProjectStatus){
        const project = this.projects.find(prj => prj.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updatelist();
        }
    }
    private updatelist(){
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
    static getInstance() {
        if (this.acc) {
            return this.acc
        } else {
            this.acc = new ProjectState();
            return this.acc
        }
    }
}
const projectState = ProjectState.getInstance();

interface validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
}

function validate(validatableinput: validatable) {
    let isvali = true;
    if (validatableinput.required) {
        isvali = isvali && validatableinput.value.toString().trim().length !== 0
    }
    if (validatableinput.minLength != null && typeof validatableinput.value === 'string') {
        isvali = isvali && validatableinput.value.length >= validatableinput.minLength
    }
    if (validatableinput.maxLength != null && typeof validatableinput.value === 'string') {
        isvali = isvali && validatableinput.value.length <= validatableinput.maxLength
    }
    if (validatableinput.min != null && typeof validatableinput.value === 'number') {
        isvali = isvali && validatableinput.value >= validatableinput.min
    }
    if (validatableinput.max != null && typeof validatableinput.value === 'number') {
        isvali = isvali && validatableinput.value <= validatableinput.max
    }
    return isvali
}

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElenmet: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, inserAtStart:boolean ,newElementId?: string | undefined ){
        this.templateElenmet = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importNode = document.importNode(this.templateElenmet.content, true);
        //把一个节点从另一个文档复制到该文档，第二个值设置为 true，那么还要复制该节点的所有子孙节点。
        this.element = importNode.firstElementChild as U;
        //firstElementChild属性返回指定元素的第一个子元素。
        if (newElementId) {
            this.element.id = newElementId;   
        }

        this.attach(inserAtStart)
    }
    private attach(insertAtBeginning:boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
    }

    abstract configure():void;
    abstract renderContent():void
}

class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
    private project:Project;
    
    get persons(){
        if (this.project.people === 1) {
            return '1 Person'
        }else{
            return `${this.project.people} Person`
        }
    }
    constructor(hostId:string, project:Project){
        super('single-project',hostId,false,project.id);
        this.project = project

        this.configure();
        this.renderContent();
    }
    @autobind
    dragstar(event: DragEvent) {
        event.dataTransfer!.setData('text/plain',this.project.id)
        event.dataTransfer!.effectAllowed = 'move';
    }
    dragend(event: DragEvent) {
        console.log('DragEnd'); 
    }

    configure(){
        this.element.addEventListener('dragstart',this.dragstar);
        this.element.addEventListener('dragend',this.dragend);
        this.element.addEventListener('dragstart',this.dragstar)
    }
    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + 'assigned';
        this.element.querySelector('p')!.textContent = this.project.description;

    }
}

class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{
    assignedProject: Project[];
    constructor(private type: 'active' | 'finished') {
        super('project-list','app', false ,`${type}-projects`);
        this.assignedProject = []

        this.configure();
        this.renderContent();
    }
    @autobind
    dragleave(_: DragEvent){
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable')
    }
    @autobind
    dragover(event: DragEvent){
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable')
        }
    }
    @autobind
    drop(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProjrct(prjId,this.type === 'active'? ProjectStatus.Active : ProjectStatus.Finished)
        
    }
    configure(){
        this.element.addEventListener('dragover',this.dragover);
        this.element.addEventListener('dragleave',this.dragleave);
        this.element.addEventListener('drop',this.drop);
        projectState.addListener((projects: Project[]) => {
            const relebant = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finished
            })
            this.assignedProject = relebant
            this.renderProjects()
        })
    }

    renderContent() {
        const listid = `${this.type}-prokects-list`
        this.element.querySelector('ul')!.id = listid;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + 'PROJECTS'
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-prokects-list`)! as HTMLUListElement;
        // listEl.innerHTML = ''
        for (const prjItem of this.assignedProject) {
            new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
        }
    }
}

class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInpuntElenmet: HTMLInputElement;

    constructor() {
        super('project-input','app',true,'user-input')
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInpuntElenmet = this.element.querySelector('#people') as HTMLInputElement
        this.configure()
    }
    configure() {
        this.element.addEventListener('submit', this.submHandle.bind(this))
    }

    renderContent(){
        
    }

    private gattherinput(): [string, string, number] | void {
        const enttitle = this.titleInputElement.value
        const entdescription = this.descriptionInputElement.value
        const entpeople = this.peopleInpuntElenmet.value

        const intitle: validatable = {
            value: enttitle,
            required: true
        }
        const indescription: validatable = {
            value: entdescription,
            required: true,
            minLength: 1,
            maxLength: 10
        }
        const inpeople: validatable = {
            value: entpeople,
            required: true,
            min: 1,
            max: 10
        }
        if (
            !validate(intitle) ||
            !validate(indescription) ||
            !validate(inpeople)
        ) {
            alert('请重新输入')
            return
        } else {
            return [enttitle, entdescription, +entpeople]
        }
    }


    private removeimpunt() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInpuntElenmet.value = '';
    }

    @autobind
    private submHandle(event: Event) {
        event.preventDefault();
        const userinpunt = this.gattherinput();
        if (Array.isArray(userinpunt)) {
            const [title, desc, people] = userinpunt
            projectState.addProjext(title, desc, people)
        }
        this.removeimpunt()

    }
}
const prjInput = new ProjectInput()


const prjList = new ProjectList('active')
const prjList2 = new ProjectList('finished')