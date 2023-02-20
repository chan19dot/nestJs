import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskWithFilter } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .getMany();

    return tasks;
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.tasksRepository.delete({
      id: id,
    });
  }

  async updateTaskStatusById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task[]> {
    const status = updateTaskDto.status;
    this.tasksRepository.update(id, {
      status: status,
    });
    return this.getAllTasks();
  }
  async getTasksWithFilter(filterDto: GetTaskWithFilter): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  //   getTasks():Task[]{
  //       return this.tasks;
  //   }

  // getTaskById(id:string):Task{
  //     const found= this.tasks.find((task)=> task.id===id)
  //     if(!found){
  //         throw new NotFoundException(`Task with ${id} not found`)
  //     }
  //     return found;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task{
  //     const task: Task={
  //         id:uuid(),
  //         title: createTaskDto.title,
  //         description: createTaskDto.description,
  //         status: TaskStatus.OPEN,
  //     }
  //     this.tasks.push(task);
  //     return task
  // }
  // closeTask(id:string): Task{
  //     let closeTask:Task;
  //     for(let task of this.tasks){
  //         if(task.id === id){
  //             console.log(task);
  //             task.status= TaskStatus.DONE
  //             closeTask= task;
  //         }
  //     }
  //     return closeTask
  // }
  // deleteTask(id:string):Task[]{
  //     let tasks = this.getTasks();
  //     let result =[]
  //     for(let task of tasks){
  //         if(task.id !== id){
  //             result.push(task);
  //         }
  //     }
  //     this.tasks= result;
  //     return tasks;
  // }
  // setTaskToInProgress(id:string):Task{
  //     let inProgressTask: Task;
  //     let task = this.getTaskById(id);
  //     task.status=TaskStatus.IN_PROGRESS;
  //     inProgressTask = task;
  //     return inProgressTask
  // }
  // updateTaskTitleById(id:string, title:string):Task{
  //     let task = this.getTaskById(id);
  //     task.title = title;
  //     return task
  // }
  // updateTaskById(id:string, key:string, task:Object ): Task{
  //     if(key==='status'){
  //         if(task[key]==='DONE'){
  //             return this.closeTask(id);
  //         }
  //         else{
  //           return  this.setTaskToInProgress(id);
  //         }
  //     }
  //     else{
  //         return null;
  //     }
  // }
  // getTasksWithFilters(filterDto: GetTaskWithFilter): Task[]{
  //     const { status, search} = filterDto
  //     let tasks= this.getTasks();
  //     if(status){
  //         tasks = tasks.filter((task)=> task.status === status);
  //     }
  //     if(search){
  //         tasks = tasks.filter((task)=> {
  //             if(task.title.includes(search) || task.description.includes(search)){
  //                 return true;
  //             }
  //             return false;
  //         });
  //     }
  //     return tasks;
  // }
}
