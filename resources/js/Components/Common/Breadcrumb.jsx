import { Link } from '@inertiajs/react';

function Breadcrumb({ breadcrumbs }) {
  return (
    <div className="py-4 flex items-center">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <span
            key={index}
            className={
              isLast ? 'text-gray-500' : 'text-teal-600 hover:text-teal-800'
            }
          >
            <Link href={crumb.url} className="hover:underline">
              {crumb.name}
            </Link>
            {!isLast && <span className="mx-1 text-gray-500">{'>'}</span>}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
