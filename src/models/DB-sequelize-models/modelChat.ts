import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./modelUser";

@Table({tableName: "chats", createdAt: false, updatedAt: false })
export class ChatModel extends Model<ChatModel>{

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true,unique: true})
    chat_id:number;

    @Column({type: DataType.STRING(1000)})
    chat_message:string;

    @Column({type: DataType.DATEONLY})
    chat_date:string;

    @Column({type: DataType.TIME})
    chat_time:string;

    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER})
    user_id_from:number;

    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER})
    user_id_to:number;
}