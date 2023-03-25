

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/common/repository/custom-repository";
import { DataSource, Repository } from "typeorm";
import { UserUpdateDto } from "../dto/user-update.dto";
import { UserEntity } from "../entity/user.entity";


@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    // constructor(private dataSource: DataSource) {
    //     super(UserEntity, dataSource.manager)
    // }
    
    findByEmail(email: string){
        return this.findOneBy({
            email: email
        });
    }

    updateUser(dto: UserUpdateDto){
        this.update(dto.userId, {
            ...(dto.userName && { userName: dto.userName }),
            ...(dto.verificationToken && { verificationToken: dto.verificationToken }),
            ...(dto.certifiedYn && { certifiedYn: dto.certifiedYn }),
            ...(dto.address && { address: dto.address }),
        });
    }
}
