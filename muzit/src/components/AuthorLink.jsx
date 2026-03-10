// components/AuthorLink.jsx
import { Link } from "react-router-dom";
import { getAuthor } from "../data/authors";

function AuthorLink({ authorName }) {
  const author = getAuthor(authorName);
  return (
    <Link
      to={`/author/${encodeURIComponent(authorName)}`}
      className='author-link'
      onClick={(e) => e.stopPropagation()}
    >
      <img src={author.avatar} alt={authorName} className='author-avatar' />
      <span>{authorName}</span>
    </Link>
  );
}

export default AuthorLink;
