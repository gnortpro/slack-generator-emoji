import React, { useEffect, useState, useRef } from "react";

const Hello = () => {
  const [value, setValue] = useState("");
  const [listEmoji, setListEmoji] = useState<any>([]);
  const [result, setResult] = useState("");
  const [emojiType, setEmojiType] = useState("random");
  const resultRef = useRef(null);
  const genCharArray = (charA: string, charZ: string) => {
    const returnList = [];
    let i = charA.charCodeAt(0);
    let j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      returnList.push(String.fromCharCode(i));
    }
    return returnList.sort();
  };
  const alphabetArray = genCharArray("a", "z");

  useEffect(() => {
    const list = [
      {
        key: " ",
        value: " ",
        type: "",
      },
    ];
    alphabetArray.forEach((alphabet) => {
      list.push({
        key: alphabet,
        value: `:alphabet-white-${alphabet}:`,
        type: "white",
      });
      list.push({
        key: alphabet,
        value: `:alphabet-yellow-${alphabet}:`,
        type: "yellow",
      });
    });
    setListEmoji(list);
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value.trim().toLowerCase());
  };

  const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmojiType(value);
    if (result) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    setResult("");
    const listCharacter = value.split("");
    listCharacter.forEach((character) => {
      let findItem: any;
      if (emojiType === "random") {
        const items = listEmoji.filter((emoji: any) => emoji.key === character);
        findItem = items[Math.floor(Math.random() * items.length)];
      } else {
        findItem = listEmoji.find(
          (emoji: any) => emoji.key === character && emoji.type === emojiType
        );
      }
      if (findItem) {
        setResult((currentResult) => `${currentResult}${findItem.value}`);
      }
    });
  };
  return (
    <div style={{ maxWidth: "1280px" }}>
      <h1>Tool help generating new Slack Emoji!</h1>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ marginBottom: "8px" }}>
          <label>Input: </label>
          <input placeholder="Type Your Emoji" onChange={onChangeInput} />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Type Emoji: </label>
          <input
            id="random"
            type="radio"
            name="site_name"
            value="random"
            defaultChecked
            onChange={onChangeType}
          />
          <label htmlFor="random">Random</label>

          <input
            id="white"
            type="radio"
            name="site_name"
            value="white"
            onChange={onChangeType}
          />
          <label htmlFor="white">White</label>

          <input
            id="yellow"
            type="radio"
            name="site_name"
            value="yellow"
            onChange={onChangeType}
          />
          <label htmlFor="yellow">Yellow</label>
        </div>
        <button disabled={!value} onClick={onSubmit}>
          Submit
        </button>
      </div>

      <div>
        <p>Your Emoji Text:</p>
        {result && (
          <div
            style={{
              border: "1px solid #C1D3FF",
              background: "#F5F8FF",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            <span ref={resultRef}>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hello;
