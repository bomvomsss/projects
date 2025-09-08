import { useState, useEffect } from "react";

type MenuData = {
  korean: string[];
  chinese: string[];
  japanese: string[];
};

function Main() {
  const [text, setText] = useState("뭘 먹을까");
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);

  const getMenus = () => {
    if (!menuData) return [];
    if (category === "korean") return menuData.korean;
    if (category === "chinese") return menuData.chinese;
    if (category === "japanese") return menuData.japanese;
    // 전체 메뉴
    return [...menuData.korean, ...menuData.chinese, ...menuData.japanese];
  };

  const clickEvent = () => {
    const menus = getMenus();
    if (menus.length === 0) return;
    const randomIdx = Math.floor(Math.random() * menus.length);
    setText(menus[randomIdx]);
  };

  return (
    <>
      <div className='wrap'>
        <div className='btn-group'>
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
        </div>
        <div className='setting-box'>
          <p className='menuTxt'>{text}</p>
          <button type='button' className='choice' onClick={clickEvent}>
            골라
          </button>
        </div>
      </div>
    </>
  );
}

export default Main;
