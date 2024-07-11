import { getBookById } from "@/app/lib/actions";
import { notFound } from "next/navigation";

interface IProps {
  params: { id: string };
}

export default async function Page(props: IProps) {
  const bookId = parseInt(props.params.id);
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="single_book_page">
      <h1>Book Title: {book.title}</h1>
      <h2>Book Author: {book.author}</h2>
      <h2>Book Price: {book.price}$</h2>

      <img style={{ width: "500px" }} src={book.photo} alt={book.title} />
    </div>
  );
}
