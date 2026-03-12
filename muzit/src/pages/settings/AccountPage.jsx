// pages/settings/AccountPage.jsx
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn-back" onClick={() => navigate("/settings")}>←</button>
      <h2 className="page-title">계정 설정</h2>
      <p>계정 설정 기능은 추후 구현 예정입니다.</p>
    </div>
  );
}

export default AccountPage;
