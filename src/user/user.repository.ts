

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

export class UserRepository extends Repository<UserEntity> {
    constructor(@InjectRepository(UserEntity) private dataSource: DataSource) {
        super(UserEntity, dataSource.manager)
    }
}
