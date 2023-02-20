import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskWithFilter } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  //@Autowired functions like this
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskWithFilter): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  addTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param() param): Promise<Task> {
    return this.tasksService.getTaskById(param.id);
  }
  @Delete('/:id')
  deleteTaskById(@Param() param): Promise<void> {
    return this.tasksService.deleteTaskById(param.id);
  }

  @Patch('/:id/status')
  updateTaskById(@Param() param, @Body() task: UpdateTaskDto): Promise<Task[]> {
    return this.tasksService.updateTaskStatusById(param.id, task);
  }
}
