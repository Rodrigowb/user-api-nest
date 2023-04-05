import { CreationOptional, Model } from "sequelize";
import { Column, PrimaryKey, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: 'Users',
  paranoid: true
})

export class User extends Model{
  @PrimaryKey
  @Column({ type: DataType.UUID })
  public declare id: string;

  @Column({ type: DataType.STRING })
  public declare name: string;

  @Column({ type: DataType.STRING })
  public declare email: string;

  @Column({ type: DataType.STRING })
  public declare revenueRecord: string;

  @Column({ type: DataType.STRING })
  public declare role: string;

  @Column({ type: DataType.STRING })
  public declare phone: string;

  @Column({ type: DataType.STRING })
  public declare password: string;

  @Column({ type: DataType.DATE })
  public declare loginDate: Date;

  @Column({ type: DataType.DATE })
  public declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  public declare updatedAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  public declare deletedAt: CreationOptional<Date>;
  
}