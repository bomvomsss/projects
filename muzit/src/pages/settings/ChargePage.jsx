// pages/settings/ChargePage.jsx
import { useNavigate } from "react-router-dom";

function ChargePage() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn-back" onClick={() => navigate("/settings")}>←</button>
      <h2 className="page-title">포인트 충전</h2>
      <p>포인트 충전 기능은 추후 구현 예정입니다.</p>
    </div>
  );
}

export default ChargePage;
