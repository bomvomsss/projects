import Swal from "sweetalert2";
import { melon_songid, genie_songid, bugs_songid, vibe_songid, playlist_number } from "../data/songId";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListItems(site, theme){

  // one-click link
  let melon = "melonapp://play?ctype=1&menuid=0&cid="; // 1
  let melon_ipad = "melonipad://play/?ctype=1&menuid=0&cid="; // 2
  let melon_win = "melonapp://play?cType=1&cList="; // 3
  let melon_mac_1 = "melonplayer://play?ref=&cid="; // 4
  let melon_mac_2 = "&cflag=1"; // 5
  let genie_iphone = "ktolleh00167://landing/?landing_type=31&landing_target=";
  let genie_android = "cromegenie://scan/?landing_type=31&landing_target=";
  let genie_web = "https://www.genie.co.kr/player/shareProcessV2?xgnm=";
  let bugs = "bugs3://app/tracks/lists?title=전체듣기&miniplay=Y&track_ids=";
  let bugs_pc = "https://music.bugs.co.kr/newPlayer?trackId=";
  let vibe = "vibe://listen?version=3&trackIds=";
  // let music_site_url;
  // let songid_dump = "";
  // let i;

  // melon : 1 // genie : 2 // bugs : 3 // vibe : 4 // flo : 5
  // site = a / theme = b

  let ok = 0;
  let icon = ["error", "success"];
  let title = ["지원하지 않는 기기예요😥", "플레이리스트 생성 완료🎉"];

  if(site === 1 || site === 6)

  return(
    <>
      <h3>제목</h3>
      <div>
        <button type="button" >멜론</button>
        <button type="button" >지니</button>
        <button type="button" >벅스</button>
        <button type="button" >바이브</button>
        <button type="button" >플로</button>
      </div>
    </>
  )
}

export default ListItems;