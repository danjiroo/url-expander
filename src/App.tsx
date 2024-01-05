import { useState } from "react";
import axios from "axios";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const { ONE_SIMPLE_API_KEY = "fDiWZetbSUK2SuBcxxGJw3KFh4ESabSWpzl1WQtk" } =
  import.meta.env;

function App() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [outputOption, setOutputOption] = useState<string>("localhost");
  const [outputUrl, setOutputUrl] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputUrl(e.target.value);
  };

  const handleOutputOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputOption(e.target.value);
  };

  const handleUrlParsing = async () => {
    let parsedUrl: string;

    const { data: expandedUrl } = await axios.get(
      `https://onesimpleapi.com/api/unshorten?token=${ONE_SIMPLE_API_KEY}&url=${inputUrl}`
    );

    const extractedURL = expandedUrl.slice(
      "https://install.pandolink.com/?link=".length
    );

    const decodedURL = decodeURIComponent(extractedURL);

    if (outputOption === "integration") {
      parsedUrl = decodedURL.replace(
        "https://staging.pandolink.com/accord/app",
        "https://integration.pandolink.com/"
      );
    } else {
      parsedUrl = decodedURL.replace(
        "https://staging.pandolink.com/accord/app",
        "http://localhost:3000/"
      );
    }

    setOutputUrl(parsedUrl);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputUrl);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Survey Link Parser</h1>
      <div>
        <h2>Select an output URL:</h2>
        <div>
          <label>
            <input
              type="radio"
              value="localhost"
              checked={outputOption === "localhost"}
              onChange={handleOutputOptionChange}
            />
            Localhost (http://localhost:3000/)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="integration"
              checked={outputOption === "integration"}
              onChange={handleOutputOptionChange}
            />
            Integration (https://integration.pandolink.com/)
          </label>
        </div>
      </div>
      <div className="url-parser-container">
        <div>
          <h2>Enter a URL to parse:</h2>
          <textarea value={inputUrl} onChange={handleInputChange} />
        </div>
        <div className="flex-column">
          <h2>Parsed URL:</h2>
          <textarea value={outputUrl} readOnly />
          <button onClick={handleCopyOutput}>Copy to clipboard</button>
        </div>
      </div>
      <button onClick={handleUrlParsing}>Parse URL</button>
    </div>
  );
}

export default App;
