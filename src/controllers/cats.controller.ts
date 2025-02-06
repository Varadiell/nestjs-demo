import {
  Body,
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from "@nestjs/common";

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Controller("cats")
export class CatsController {
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
