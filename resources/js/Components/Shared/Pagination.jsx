import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links, meta }) {
  function getClassName(active) {
    if (active) {
      return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 rounded-full focus:border-primary focus:text-primary hover:bg-primary hover:text-white border';
    }
    return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 rounded-full focus:border-primary focus:text-primary hover:bg-primary hover:text-white hover:bg-border';
  }

  function getUrl(url) {
    const params = new URLSearchParams(document.location.search);
    const sortBy = params.get('sort_by');
    const sortOrder = params.get('sort_order');
    const keyword = params.get('keyword');
    const types = params.get('types');

    const updatedUrl = new URL(url);

    if (sortBy !== null) {
      updatedUrl.searchParams.append('sort_by', sortBy);
    }

    if (sortOrder !== null) {
      updatedUrl.searchParams.append('sort_order', sortOrder);
    }

    if (keyword !== null) {
      updatedUrl.searchParams.append('keyword', keyword);
    }

    if (types !== null) {
      updatedUrl.searchParams.append('types', types);
    }

    return updatedUrl;
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Showing {meta.from} to {meta.to} of {meta.total} results
      </span>
      {links.length > 3 && (
        <div className="flex flex-wrap">
          {links.map((link, key) =>
            link.url === null ? (
              <div
                key={key}
                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <Link
                key={key}
                className={getClassName(link.active)}
                href={getUrl(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
