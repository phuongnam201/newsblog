import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { MdKeyboardArrowDown } from "react-icons/md";

const FaqPage = () => {
  const faqData = [
    {
      question: "How to register a new account?",
      answer: {
        steps: [
          {
            title: "Access the Login Page",
            description:
              "Navigate to the login page on our website. You can find the link to the registration page below the login form.",
          },
          {
            title: "Enter Your Information",
            description:
              "Fill in the required personal information. This includes your name, email address, password, and password confirmation.",
          },
          {
            title: "Complete the Registration",
            description:
              'Click the "Register" button or a similar option to complete the registration process. You may receive a confirmation message indicating successful registration.',
          },
        ],
      },
    },
    {
      question: "How to comment on a post?",
      answer: {
        steps: [
          {
            title: "Log In or Sign Up",
            description:
              "First, you need to log in to your account if you already have one, or sign up for a new account if you don't. This helps us maintain consistency and security within the community.",
          },
          {
            title: "Select an Article",
            description:
              "Choose the article you want to comment on. Each article will have a comment section at the bottom of the page.",
          },
          {
            title: "Write a Comment",
            description:
              "Click on the comment section and type your thoughts. You can enter plain text, use basic text formatting, or even use emoticons to express your feelings.",
          },
          {
            title: "Submit Your Comment",
            description:
              "After writing your comment, press the 'Submit' button or a similar option to complete the process. Your comment will be reviewed by an admin and will then be displayed in the article.",
          },
        ],
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto my-8">
        <h1 className="font-opensans text-3xl font-bold text-dark-soft text-center mb-5">
          Frequently asked questions
        </h1>
        <div>
          {faqData.map((item, index) => (
            <div
              key={index}
              className="mb-6 border border-blue-500 rounded-lg p-4 cursor-pointer"
            >
              <div
                className="flex felx-col items-center justify-between"
                onClick={() => toggleAnswer(index)}
              >
                <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
                <MdKeyboardArrowDown />
              </div>
              <div
                className={`text-gray-700 ${
                  activeIndex !== index && "max-h-0 overflow-hidden"
                } ${
                  activeIndex === index &&
                  "max-h-screen transition-max-height duration-300 ease-out"
                }`}
              >
                {item.answer.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="mb-3">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FaqPage;
