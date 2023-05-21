import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CONFIG } from "src/common/configs/config";
import { UserEntity } from "src/common/entities/user.entity";
import { DataSource, SelectQueryBuilder } from "typeorm";
import _ from "lodash";
import { CONSTANT } from "src/common/untils/constant";
import { SystemError } from "src/common/errors/system.error";
import { IUser } from "src/modules/user/interfaces/IUser.interface";

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async login(
    password: string,
    username?: string,
    email?: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!username && !email) {
          throw new SystemError(CONSTANT.ERROR.E0001);
        }

        const userFilter: any = {};

        if (username) {
          userFilter["username"] = username;
        } else if (email) {
          userFilter["email"] = email;
        }

        const userQueryBuilder: SelectQueryBuilder<UserEntity> =
          await this.dataSource.manager
            .getRepository(UserEntity)
            .createQueryBuilder("user")
            .select("user")
            .addSelect("user.password")
            .leftJoinAndSelect("user.role", "role");

        if (userFilter["username"]) {
          userQueryBuilder.andWhere("user.username = :username", {
            username: userFilter["username"],
          });
        } else if (userFilter["email"]) {
          userQueryBuilder.andWhere("user.email = :email", {
            email: userFilter["email"],
          });
        }

        const userFound: IUser = await userQueryBuilder.getOne();

        if (!userFound) {
          throw new SystemError(CONSTANT.ERROR.E0002);
        }

        const comparePasswordResult = await bcrypt.compare(
          password,
          userFound.password
        );

        if (comparePasswordResult) {
          const accessTokenPayload = _.pick(userFound, [
            "id",
            "username",
            "email",
            "personalEmail",
            "role",
          ]);

          const refreshToken = this.refreshToken(accessTokenPayload);
          const accessToken = await this.accessToken(refreshToken);

          return resolve({
            payload: accessTokenPayload,
            accessToken,
            refreshToken,
          });
        } else {
          throw new SystemError(CONSTANT.ERROR.E0003);
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  generateToken(payload: any, expiresIn?: number) {
    return jsonwebtoken.sign(payload, CONFIG["JWT_SECRET_KEY"], {
      expiresIn: expiresIn,
    });
  }

  async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        jsonwebtoken.verify(
          token,
          CONFIG["JWT_SECRET_KEY"],
          function (error, decoded) {
            if (error) {
              return reject(error);
            }

            return resolve(decoded);
          }
        );
      } catch (error) {
        return reject(error);
      }
    });
  }

  async accessToken(refreshToken: string) {
    const decoded: any = await this.verifyToken(refreshToken)
      .then((decoded: object) => {
        return decoded;
      })
      .catch((error) => {
        throw error;
      });

    return this.generateToken(
      _.omit(decoded, ["exp", "iat"]),
      Number(CONFIG["JWT_ACCESS_TOKEN_EXPIRES_IN"] || 60 * 60)
    );
  }

  refreshToken(payload: any) {
    return jsonwebtoken.sign(payload, CONFIG["JWT_SECRET_KEY"], {
      expiresIn: Number(
        CONFIG["JWT_REFRESH_TOKEN_EXPIRES_IN"] || 60 * 60 * 24 * 365
      ),
    });
  }

  async getAccessToken(refreshToken: string) {
    const accessToken = await this.accessToken(refreshToken);

    return {
      accessToken,
    };
  }
}
