'use client';

import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  doc: DocumentData;
};

const SidebarRow = ({ doc }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(doc.id));
  }, [pathName]);

  return (
    <li
      onClick={() => router.push(`/search/${doc.id}`)}
      className={`flex justify-between p-4 cursor-pointer hover:bg-white hover:shadow-md rounded-lg ${
        active && 'bg-white shadow-md'
      }`}
    >
      <div>
        <p className="text-xs md:text-base font-bold">{doc.data().search}</p>
        {doc.data().status === 'pending' && (
          <p className="text-xs animate-pulse text-indigo-400">
            Scraping information...
          </p>
        )}
      </div>
    </li>
  );
};

export default SidebarRow;
