import React from "react";
import {
  FaFacebookSquare,
  FaRedditSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButton = ({ uri, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=970588107370283&display=popup&href=${uri}`}
      >
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${uri}`}
      >
        <FaTwitterSquare className="text-[#00acee] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://reddit.com/submit?url=${uri}&tittle=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${title}`}
      >
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButton;
