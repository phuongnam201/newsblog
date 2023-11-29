// import { generateHTML } from "@tiptap/html";
// import parse from "html-react-parser";
// import { extensions } from "../constants/tiptapExtensions";

// const parseJsonToHtml = (json) => {
//   return parse(generateHTML(json, extensions));
// };

// export default parseJsonToHtml;

import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "../constants/tiptapExtensions";

const parseJsonToHtml = (json) => {
  try {
    if (!json) {
      return null; // hoặc một giá trị mặc định khác tùy thuộc vào trường hợp của bạn
    }

    const htmlString = generateHTML(json, extensions);
    const parsedHtml = parse(htmlString);

    return parsedHtml;
  } catch (error) {
    console.error("Error parsing JSON to HTML:", error);
    return null; // hoặc xử lý lỗi theo cách bạn muốn
  }
};

export default parseJsonToHtml;
