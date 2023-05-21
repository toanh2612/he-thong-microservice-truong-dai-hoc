import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import UserService from "../user.service";
import { CONSTANT } from "src/common/untils/constant";
import { AuthService } from "src/modules/auth/auth.service";

@Controller()
export class userEventHandler {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @MessagePattern({ command: CONSTANT.EVENT.USER.GET_USER_BY_ID })
  async getUserById(id: string) {
    return await this.userService.getOne(id);
  }

  @MessagePattern({ command: CONSTANT.EVENT.USER.GET_USER_LIST_BY_IDS })
  async getUserListByIds(params: any) {
    const ids: string[] = params.ids || [];
    return await this.userService.getListByIds(ids);
  }

  @MessagePattern({ command: CONSTANT.EVENT.USER.AUTH })
  async auth(params: any) {
    try {
      const { accessToken } = params;

      const decoded = await this.authService
        .verifyToken(accessToken)
        .then((_decoded) => _decoded);

      return {
        result: {
          decoded,
        },
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
