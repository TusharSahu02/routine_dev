import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (q) => {
    setSearchQuery(q);
    try {
      const res = await fetch(`/api/search/${q}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q }),
      });
      const data = await res.json();
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className="flex space-x-3 items-center cursor-pointer "
          onClick={() => setOpen(true)}
        >
          <Search className="w-5 h-5" />
          <p>Search</p>
        </div>
      </DialogTrigger>
      <DialogContent className="dark text-white overflow-y-scroll max-h-screen">
        <Command>
          <CommandInput
            placeholder="Search..."
            onChange={(<Command>
              <CommandInput
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <CommandList>
                {searchResults.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {loading ? (
                  <CommandItem>searching...</CommandItem>
                ) : (
                  <>
                    {searchResults.map((result) => (
                      <CommandItem key={result.id}>{result.title}</CommandItem>
                    ))}
                  </>
                )}
              </CommandList>
            </Command>e) => setSearchQuery(e.target.value)}
          />
          <CommandList>
            {searchResults.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {loading ? (
              <CommandItem>searching...</CommandItem>
            ) : (
              <>
                {searchResults.map((result) => (
                  <CommandItem key={result.id}>{result.title}</CommandItem>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
