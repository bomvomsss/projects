// pages/SettingsPage.jsx

const settingsItems = [
  {
    group: "계정",
    items: [
      {
        label: "포인트 충전",
        desc: "포인트를 충전하여 유료 작품을 이용하세요.",
        icon: "💳",
        action: "charge",
      },
      {
        label: "계정 설정",
        desc: "프로필, 비밀번호, 이메일 등 계정 정보를 관리합니다.",
        icon: "⚙️",
        action: "account",
      },
    ],
  },
  {
    group: "지원",
    items: [
      {
        label: "고객센터",
        desc: "문의사항이나 불편 사항을 접수합니다.",
        icon: "💬",
        action: "support",
      },
    ],
  },
  {
    group: "기타",
    items: [
      {
        label: "로그아웃",
        desc: "현재 계정에서 로그아웃합니다.",
        icon: "🚪",
        action: "logout",
        danger: true,
      },
    ],
  },
];

function SettingsPage() {
  const handleAction = (action) => {
    if (action === "logout") {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        alert("로그아웃 기능은 추후 구현 예정입니다.");
      }
    } else {
      alert("해당 기능은 추후 구현 예정입니다.");
    }
  };

  return (
    <div className="settings-page">
      <h2 className="page-title">설정</h2>
      {settingsItems.map((group) => (
        <section key={group.group} className="settings-group">
          <h3 className="settings-group-title">{group.group}</h3>
          <div className="settings-list">
            {group.items.map((item) => (
              <button
                key={item.action}
                className={`settings-item ${item.danger ? "danger" : ""}`}
                onClick={() => handleAction(item.action)}
              >
                <span className="settings-item-icon">{item.icon}</span>
                <div className="settings-item-text">
                  <span className="settings-item-label">{item.label}</span>
                  <span className="settings-item-desc">{item.desc}</span>
                </div>
                <span className="settings-item-arrow">›</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default SettingsPage;
