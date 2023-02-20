import { IsNotEmpty } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty() //@notNull decorator in springBoot -> needs classValidator and classTransformer packages 
    title: string;
    @IsNotEmpty()
    description: string;
}

//pipe-> validation