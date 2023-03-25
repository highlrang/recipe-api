import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BasicEntity {

    @Column({ name: "delete_yn", default: 'N'})
    deleteYn: string;

    @Column({ name: "insert_operator", default: 'system' })
    insertOperator: string;

    @Column({ name: "update_operator", default: 'system' })
    updateOperator: string;

    @CreateDateColumn({ name: "insert_date" })
    insertDate: Date;

    @UpdateDateColumn({ name: "update_date" })
    updateDate: Date;
}