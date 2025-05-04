import { useRef } from "react";

const SearchInput = ({ data, setData }) => {
  const searchRef = useRef(null);

  const handleSearch = () => {
    const value = searchRef.current.value; // Get input value directly
    const filteredData = data.filter((el) =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );

    setData(filteredData); // Pass filtered results to parent component
  };

  return (
    <div>
      <input
        ref={searchRef} // Attach useRef
        className="w-full text-center md:text-start p-2 bg-gray-100 dark:bg-gray-800 shadow text-[#171e2e] dark:text-white rounded"
        type="search"
        name="search"
        placeholder="ابحث بالاسم"
        onChange={handleSearch} // Trigger filtering when typing
      />
    </div>
  );
};

export default SearchInput;
