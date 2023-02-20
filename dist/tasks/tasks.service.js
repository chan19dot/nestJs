"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("./task.status.enum");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async getTaskById(id) {
        const found = await this.tasksRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Task with ${id} not found`);
        }
        return found;
    }
    async createTask(createTaskDto) {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title: title,
            description: description,
            status: task_status_enum_1.TaskStatus.OPEN,
        });
        await this.tasksRepository.save(task);
        return task;
    }
    async getAllTasks() {
        const tasks = await this.tasksRepository
            .createQueryBuilder('task')
            .getMany();
        return tasks;
    }
    async deleteTaskById(id) {
        await this.tasksRepository.delete({
            id: id,
        });
    }
    async updateTaskStatusById(id, updateTaskDto) {
        const status = updateTaskDto.status;
        this.tasksRepository.update(id, {
            status: status,
        });
        return this.getAllTasks();
    }
    async getTasksWithFilter(filterDto) {
        const { status, search } = filterDto;
        const query = this.tasksRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status =:status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map