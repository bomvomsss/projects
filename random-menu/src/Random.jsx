import { useState, useEffect } from "react";

function Random() {
  const [text, setText] = useState("뭘 먹을까");
  const [menuData, setMenuData] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);

  const getMenus = () => {
    if (!menuData || menuData.length === 0) return [];
    if (category === "all") return menuData;
    // 카테고리별로 필터링 (영문 그대로 사용)
    return menuData.filter((item) => item.category === category);
  };

  const clickEvent = () => {
    const menus = getMenus();
    if (menus.length === 0) return;
    const randomIdx = Math.floor(Math.random() * menus.length);
    setText(menus[randomIdx].name);
  };

  return (
    <>
      <div className='wrap'>
        <div className='button-wrap'>
          <button
            className={category === "all" ? "on" : ""}
            onClick={() => setCategory("all")}
          >
            전체
          </button>
          <button
            className={category === "korean" ? "on" : ""}
            onClick={() => setCategory("korean")}
          >
            한식
          </button>
          <button
            className={category === "chinese" ? "on" : ""}
            onClick={() => setCategory("chinese")}
          >
            중식
          </button>
          <button
            className={category === "japanese" ? "on" : ""}
            onClick={() => setCategory("japanese")}
          >
            일식
          </button>
          <button
            className={category === "western" ? "on" : ""}
            onClick={() => setCategory("western")}
          >
            양식
          </button>
          <button
            className={category === "etc" ? "on" : ""}
            onClick={() => setCategory("etc")}
          >
            기타
          </button>
        </div>
        <div className='result'>
          <p>{text}</p>
          <button type='button' onClick={clickEvent}>
            골라
          </button>
        </div>
      </div>
    </>
  );
}

export default Random;
