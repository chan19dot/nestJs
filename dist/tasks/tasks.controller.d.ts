import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskWithFilter } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(filterDto: GetTaskWithFilter): Promise<Task[]>;
    addTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(param: any): Promise<Task>;
    deleteTaskById(param: any): Promise<void>;
    updateTaskById(param: any, task: UpdateTaskDto): Promise<Task[]>;
}
