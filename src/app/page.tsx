import Link from "next/link";
import { getAllBooks } from "./lib/actions";

export default async function Home() {
  const books = await getAllBooks();
  return (
    <main className="main">
      <h1 className="title_book">Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`./books/${book.id}`}>
              {book.id}. {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
