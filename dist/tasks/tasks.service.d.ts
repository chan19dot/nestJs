import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskWithFilter } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    deleteTaskById(id: string): Promise<void>;
    updateTaskStatusById(id: string, updateTaskDto: UpdateTaskDto): Promise<Task[]>;
    getTasksWithFilter(filterDto: GetTaskWithFilter): Promise<Task[]>;
}
