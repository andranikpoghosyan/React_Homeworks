import { IBook } from "./types";
import { promises as fs } from "fs";

export async function getAllBooks(): Promise<IBook[]> {
  const data = await fs.readFile("./src/app/books.json", "utf-8");
  return JSON.parse(data) as IBook[];
}

export async function getBookById(id: number): Promise<IBook | null> {
  const books = await getAllBooks();
  return books.find((book) => book.id == id) || null;
}
