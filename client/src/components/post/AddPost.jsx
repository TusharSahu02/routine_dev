import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";

const AddPost = () => {
  const user = useRecoilValue(userAtom);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [postState, setPostState] = useState({
    author: user?._id,
    url: "",
    title: "",
    description: "",
    image: "",
  });

  const loadPreview = async () => {
    if (isValidUrl(postState?.url)) {
      setLoading(true);
      try {
        const res = await fetch("/api/urls/image-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: postState?.url }),
        });
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }
        setPostState({
          ...postState,
          title: data?.title,
          description: data?.description,
          image: data?.images?.[0],
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handelSubmit = async () => {
    setLoading(true);
    console.log(postState, "postState");
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postState),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }

      toast.success("Post created successfully", {
        duration: 2000,
      });
      setPostState({
        ...postState,
        url: "",
        title: "",
        description: "",
        image: "",
      });

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onBlur={() =>
        setPostState({
          ...postState,
          url: "",
          title: "",
          description: "",
          image: "",
        })
      }
    >
      <DialogTrigger>
        <div
          className="flex space-x-3 items-center "
          onClick={() => setOpen(true)}
        >
          <LinkIcon className="w-5 h-5" />
          <p>Submit Artical</p>
        </div>
      </DialogTrigger>
      <DialogContent className="dark text-white overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Add Post | Submit Artical</DialogTitle>
        </DialogHeader>
        {loading ? (
          <>
            <div className="w-full h-[200px]  bg-gray-600 rounded-xl animate-pulse flex items-center justify-center">
              <h1>loading image..</h1>
            </div>
          </>
        ) : (
          <>
            {postState?.image && (
              <img
                src={postState?.image}
                alt="image"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            )}
          </>
        )}

        <form>
          <div className="mb-4">
            <Label htmlFor="url">Url</Label>
            <Input
              type="text"
              id="url"
              placeholder="Place your url here..."
              value={postState.url}
              onChange={(e) =>
                setPostState({ ...postState, url: e.target.value })
              }
              onBlur={loadPreview}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter your title here"
              value={postState.title}
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              rows={5}
              id="description"
              placeholder="description"
              value={postState.description}
              onChange={(e) =>
                setPostState({ ...postState, description: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Button
              onClick={handelSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "loading.." : "Submit Artical"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
