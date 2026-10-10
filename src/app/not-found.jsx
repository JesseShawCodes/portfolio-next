import Link from 'next/link';
import { getLocale } from '../config/locale';

export default function NotFound() {
  const { notFound } = getLocale();

  return (
    <div className="container my-5 py-4">
      <p className="display-1 fw-bold text-muted mb-0" aria-hidden="true">
        404
      </p>
      <h1 className="mb-3">{notFound.heading}</h1>
      <p className="lead mb-4">{notFound.lead}</p>
      <Link href="/" className="btn btn-primary mb-5">
        {notFound.backHome}
      </Link>

    </div>
  );
}
