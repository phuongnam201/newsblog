import React from "react";
import {
  FaFacebookSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between rounded-lg outline-none">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=970588107370283&display=popup&href=${url}`}
      >
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaSquareXTwitter className=" w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
