// pages/settings/SupportPage.jsx
import { useNavigate } from "react-router-dom";

function SupportPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn-back" onClick={() => navigate("/settings")}>←</button>
      <h2 className="page-title">고객센터</h2>
      <p>고객센터 기능은 추후 구현 예정입니다.</p>
    </div>
  );
}

export default SupportPage;
