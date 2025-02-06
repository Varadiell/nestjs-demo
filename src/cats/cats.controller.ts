import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HostParam,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UseFilters,
  UsePipes,
} from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { HttpExceptionFilter } from "src/common/filter/http-exception.filter";
import { ParseIntPipe } from "src/common/pipes/parse-int-pipe";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { createCatSchema } from "./dto/create-cat-zod.dto";

@Controller("cats")
export class CatsController {
  // Dependency injection
  constructor(private catsService: CatsService) {}

  @Post()
  async create_1(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll_1(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // Routing
  @Get()
  findAll(): string {
    return "This action returns all cats";
  }

  // Request object
  @Get()
  findAll_Request(@Req() request: Request): string {
    return "This action returns all cats";
  }

  // Resources
  @Post()
  create(): string {
    return "This action adds a new cat";
  }

  // Route wildcards
  @Get("abcd/*")
  findAll_Wildcard() {
    return "This route uses a wildcard";
  }

  // Status code
  @Post()
  @HttpCode(204)
  create_StatusCode() {
    return "This action adds a new cat";
  }

  // Response headers
  @Post()
  @Header("Cache-Control", "no-store")
  create_ResponseHeaders() {
    return "This action adds a new cat";
  }

  // Redirection
  @Get("docs")
  @Redirect("https://docs.nestjs.com", 302)
  getDocs(@Query("version") version) {
    if (version && version === "5") {
      return { url: "https://docs.nestjs.com/v5/" };
    }
  }

  // Route parameters - part 1
  @Get(":id")
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  // Route parameters - part 2
  @Get(":id")
  findOne_RouteParamsP2(@Param("id") id: string): string {
    return `This action returns a #${id} cat`;
  }

  // Asynchronicity
  @Get()
  async findAll_Async(): Promise<any[]> {
    return [];
  }

  // Request payloads
  @Post()
  async create_Req_Payload(@Body() createCatDto: CreateCatDto) {
    return "This action adds a new cat";
  }

  // Query parameters
  @Get()
  async findAll_Query_Params(
    @Query("age") age: number,
    @Query("breed") breed: string
  ) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  // Exception - part 1
  @Get()
  async findAll_Exception() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: "This is a custom message",
      },
      HttpStatus.FORBIDDEN,
      {
        cause: "the error",
      }
    );
  }

  // Exception - Custom - part 2
  @Get()
  async findAll_Exception2() {
    throw new ForbiddenException();
  }

  // Exception - part 3
  @Get()
  async findAll_Exception3() {
    throw new BadRequestException("Something bad happened", {
      cause: new Error(),
      description: "Some error description",
    });
  }

  // Filter
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create_Filter(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  // Pipes
  @Get(":id")
  async findOne_Pipe(@Param("id", new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }

  // Pipes - part 2 - zod
  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create_pipe_zod(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}

// Sub-domain routing - part 1
@Controller({ host: "admin.example.com" })
export class AdminController {
  @Get()
  index(): string {
    return "Admin page";
  }
}

// Sub-domain routing - part 2
@Controller({ host: ":account.example.com" })
export class AccountController {
  @Get()
  getInfo(@HostParam("account") account: string) {
    return account;
  }
}
