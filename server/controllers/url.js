import { getLinkPreview } from "link-preview-js";

const imagePreView = async (req, res) => {
  try {
    const { url } = req.body;
    getLinkPreview(url, {
      imagesPropertyType: "og",
      headers: {
        "User-Agent": "googlebot",
      },
    }).then((data) => {
      //   console.log(data, "data-log");
      // console.debug(data, "data-debug");
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { imagePreView };
