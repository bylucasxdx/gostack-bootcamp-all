import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

import uploadConfig from '../config/upload';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  fileName: string;
}

interface Line {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  titleCategory: string;
}
class ImportTransactionsService {
  private createTransactionService: CreateTransactionService;

  constructor(createTransactionService: CreateTransactionService) {
    this.createTransactionService = createTransactionService;
  }

  async execute({ fileName }: Request): Promise<Transaction[]> {
    const transactions: Transaction[] = [];

    const filePath = path.join(uploadConfig.defaultDir, fileName);
    const lines = await this.loadCSV(filePath);

    // eslint-disable-next-line no-restricted-syntax
    for (const line of lines) {
      // eslint-disable-next-line no-await-in-loop
      const transaction = await this.createTransactionService.execute(line);
      transactions.push(transaction);
    }

    await fs.promises.unlink(filePath);

    return transactions;
  }

  async loadCSV(filePath: string): Promise<Line[]> {
    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Line[] = [];

    parseCSV.on('data', line => {
      const [title, type, value, titleCategory] = line;
      lines.push({
        title,
        value,
        type,
        titleCategory,
      });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }
}

export default ImportTransactionsService;
