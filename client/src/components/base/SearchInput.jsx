import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput = () => {
  const [show, setShow] = useState(true);

  const handleInputChange = (e) => {
    setShow(false);
    if (!e.target.value) {
      setShow(true);
    }


  };

  return (
    <div className="hidden lg:block lg:w-[550px]">
      <div className=" bg-muted  flex px-3 items-center justify-center rounded-2xl h-12">
        <Search className=" left-[10px] h-6 w-6 " />
        <input
          type="text"
          className=" lg:w-[500px]  py-2 outline-none bg-muted  px-2"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        {show && (
          <div className="flex items-center justify-center gap-[6px]">
            <kbd className="border-[2px] px-2 py-[3px] rounded-xl border-gray-500">
              ctrl
            </kbd>
            <p>+</p>
            <kbd className="border-[2px] px-2 py-[3px] rounded-xl border-gray-500">
              k
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
