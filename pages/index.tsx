import type { NextPage } from "next";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { motion, AnimatePresence } from "framer-motion";
import { CharsArray, randomString } from "../libs";
import Head from "next/head";

const Home: NextPage = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(20);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setPassword(randomString(length));
  }, [length]);

  const renderChars = () => {
    return CharsArray.map((ch) => {
      const isExist = password.includes(ch);
      return (
        <li
          style={isExist ? { transform: "scale(var(--scale))" } : {}}
          key={uniqid()}
          className={[
            "char text-sm text-gray-700 font-medium",
            isExist ? "char-active" : "",
          ].join(" ")}
        >
          {ch}
        </li>
      );
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Password Generator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col justify-center items-center space-y-5 py-10 h-screen">
        <div className="flex flex-row items-center justify-center space-x-2 w-1/2">
          <button
            className="btn-alternative w-full"
            onClick={() => setPassword(randomString(length))}
          >
            Generate New
          </button>
          <input
            type="number"
            className="w-16"
            defaultValue={length}
            min="8"
            max="40"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
        </div>

        <motion.ul
          initial={{ "--scale": 0.8 } as any}
          animate={{ "--scale": 1.1 } as any}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-wrap w-1/2 justify-center border-[1px] py-1 rounded-lg bg-gray-50"
        >
          {renderChars()}
        </motion.ul>

        <div
          className="w-1/2 flex justify-center items-center relative"
          onClick={() => copyToClipboard()}
        >
          <AnimatePresence>
            {copy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="absolute right-2 -bottom-1 text-green-500 text-xs">
                  Copied
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="absolute right-1 top-3 text-white text-xs bg-gray-500 font-bold py-0.5 px-1 rounded-md cursor-pointer">
            <strong>&#9760;</strong>
            Copy
          </span>

          <span className="password">{password}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
