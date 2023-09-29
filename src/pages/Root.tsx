import { useNavigate } from 'react-router-dom';

export default function Root() {
  const router = useNavigate();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <button onClick={() => router('/contacts/1')}>your Name</button>
            </li>
            <li>
              <button onClick={() => router('/contacts/2')}>Your Friend</button>
            </li>
            <li>
              <button onClick={() => router('/goods')}>Goods</button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
