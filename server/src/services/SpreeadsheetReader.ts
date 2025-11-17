import readline from "readline";
import fs from "fs";
import { promises as fsP } from "fs";

export abstract class SpreadsheetReader{
  filepath: string;

  constructor(
    filepath: string,
  ) {
    this.filepath = filepath;
  }

   /** Leitura genérica do arquivo */
   protected async loadFile(): Promise<string> {
     // O encoding faz o readFile retornar string em vez de Buffer
     const content = await fsP.readFile(this.filepath, { encoding: "utf-8" });
     return content;
   }
    /** Deve ser implementado por subclasses */
    abstract process(): Promise<any[]>;
    abstract getColumns(): Promise<string[]>;
}


export class CSVReader extends SpreadsheetReader {
  async process(): Promise<any[]> {
    throw new Error("Method not implemented yet");
  }
  // le apenas a primeira linha, se
  getColumns(): Promise<string[]> {
    const fsStream = fs.createReadStream(this.filepath);
    const rl = readline.createInterface({ input: fsStream, crlfDelay: Infinity });

    // le apenas a primeira linha de forma async
    return new Promise((resolve, reject) => {
      rl.on("line", (line) => {
        rl.close();
        resolve(line.split(",").map(c => c.trim()));
      });

      rl.on("error", (err) => {
        reject(err);
      });
    });

  }
}

export class XLSXReader extends SpreadsheetReader {
  async process(): Promise<any[]> {
    throw new Error("Method not implemented yet");
  }
  getColumns(): Promisse<string[]> {
    throw new Error("Not implemented");
  }
}
