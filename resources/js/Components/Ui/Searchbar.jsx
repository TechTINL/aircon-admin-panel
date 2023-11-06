import TextInput from '@/Components/TextInput';
import { BiSearch } from 'react-icons/bi';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function Searchbar({ url }) {
  let { search: searchedKeyword } = usePage().props;
  if (!searchedKeyword) {
    searchedKeyword = '';
  }

  const [keyword, setKeyword] = useState(searchedKeyword);

  const handleInputChange = event => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    router.get(route(url), { search: keyword });
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center relative">
      <TextInput
        className="w-full h-full pl-8 rounded-xl"
        placeholder="Search"
        required
        onChange={handleInputChange}
        value={keyword}
        onKeyDown={handleKeyDown}
      />
      <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
    </div>
  );
}

export default Searchbar;
