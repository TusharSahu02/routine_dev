import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Command, CommandEmpty, CommandList } from "@/components/ui/command";

const SearchInput = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    async (e) => {
      // console.log(e.target.value, "e");
      setLoading(true);
      setShow(true);
      if (!e.target.value) {
        setShow(true);
      }
      setSearchQuery(e.target.value);
      try {
        const res = await fetch(`/api/posts/search/q=${searchQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setSearchResults(data);
        // console.log(data, "data");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [handleSearch, searchQuery]);

  // console.log(searchQuery, "searchQuery");

  return (
    <div className="hidden relative lg:block lg:w-[550px]">
      <div className=" bg-muted  flex px-3 items-center justify-center rounded-2xl h-12">
        <Search className=" left-[10px] h-6 w-6 " />
        <input
          type="text"
          className=" lg:w-[500px]  py-2 outline-none bg-muted  px-2"
          placeholder="Search..."
          onChange={handleSearch}
          // onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />
        {/* {!show && (
          <div className="flex items-center justify-center gap-[6px]">
            <kbd className="border-[2px] px-2 py-[3px] rounded-xl border-gray-500">
              ctrl
            </kbd>
            <p>+</p>
            <kbd className="border-[2px] px-2 py-[3px] rounded-xl border-gray-500">
              k
            </kbd>
          </div>
        )} */}
      </div>
      {show && (
        <div className="absolute z-10 w-full mt-1 bg-[#1c1e26] rounded-lg ">
          <Command className="bg-[#1c1e26] rounded-lg">
            <CommandList className="p-3">
              {loading ? (
                <>{<CommandEmpty>No results found.</CommandEmpty>}</>
              ) : (
                <>
                  {searchResults.map((result) => (
                    <div
                      className=" cursor-pointer p-2 hover:bg-opacity-50 hover:bg-[#101219] transition-colors duration-300"
                      key={result.id}
                    >
                      {result.title}
                    </div>
                  ))}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
