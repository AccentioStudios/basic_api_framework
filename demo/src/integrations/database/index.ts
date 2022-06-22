import { connect } from 'mongoose';
export class Database {
  async init(): Promise<void> {
    await connect(process.env.MONGOURL || '');
    console.log("📁 - DB Connected");
  }
}