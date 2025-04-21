import Link from "next/link";

export default function Nav(){
  return(
    <div id="nav">
      <Link href="/">메인</Link>
      <Link href="">구독</Link>
      <Link href="">검색</Link>
      <Link href="">프로필</Link>
    </div>
  )
}

