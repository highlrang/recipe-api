import { Column } from "typeorm";

export abstract class BasicEntity {

    @Column({ name: "delete_yn" })
    deleteYn: string;

    @Column({ name: "insert_operator" })
    insertOperator: string;

    @Column({ name: "update_operator" })
    updateOperator: string;

    @Column({ name: "insert_date" })
    insertDate: Date;

    @Column({ name: "update_date" })
    updateDate: Date;
}