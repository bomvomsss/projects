// pages/CollectionPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import PostListItem from "../components/PostListItem";
import { formatDate } from "../utils/date";
import { getAuthor } from "../data/authors";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function formatNum(n) {
  if (!n) return 0;
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  return n;
}

function BookmarkCard({ post }) {
  const navigate = useNavigate();
  const preview = stripHtml(post.content);
  const author = getAuthor(post.author);

  return (
    <div className="bk-card" onClick={() => navigate(`/post/${post.id}`)}>
      <div className="bk-meta">
        <img src={author.avatar} alt={post.author} className="bk-avatar" />
        {post.author} · {formatDate(post.date)}
      </div>
      <h3 className="bk-title">{post.title}</h3>
      <p className="bk-preview">{preview}</p>
      <div className="bk-stats">
        <span>조회 {formatNum(post.views)}</span>
        <span>♡ {post.likes ?? 0}</span>
        <span>💬 {post.comments ?? 0}</span>
      </div>
    </div>
  );
}

function CollectionPage({
  posts, collections, toggleCollection,
  subscriptions, toggleSubscription,
  collectionGroups, createCollectionGroup, deleteCollectionGroup,
  renameCollectionGroup, addPostToGroup, removePostFromGroup,
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("bookmarks");         // "bookmarks" | "groups"
  const [view, setView] = useState("list");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const bookmarkedPosts = posts.filter((p) => collections.has(p.id));
  const selectedGroup = collectionGroups.find((g) => g.id === selectedGroupId);
  const groupPosts = selectedGroup ? posts.filter((p) => selectedGroup.postIds.includes(p.id)) : [];
  const addablePosts = bookmarkedPosts.filter((p) => !selectedGroup?.postIds.includes(p.id));

  const handleCreateGroup = () => {
    const name = newGroupName.trim();
    if (!name) return;
    createCollectionGroup(name);
    setNewGroupName("");
    setShowNewGroupInput(false);
  };

  const handleRenameConfirm = (id) => {
    const name = editingName.trim();
    if (name) renameCollectionGroup(id, name);
    setEditingGroupId(null);
  };

  const ViewToggle = () => (
    <div className="view-toggle">
      <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="리스트 보기">☰</button>
      <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="격자 보기">⊞</button>
    </div>
  );

  return (
    <div>
      {/* 탭 헤더 */}
      <div className="cg-tab-header">
        <div className="cg-tabs">
          <button className={`cg-tab ${tab === "bookmarks" ? "active" : ""}`} onClick={() => { setTab("bookmarks"); setSelectedGroupId(null); }}>
            전체 북마크 <span className="cg-tab-count">{bookmarkedPosts.length}</span>
          </button>
          <button className={`cg-tab ${tab === "groups" ? "active" : ""}`} onClick={() => { setTab("groups"); setSelectedGroupId(null); }}>
            컬렉션 <span className="cg-tab-count">{collectionGroups.length}</span>
          </button>
        </div>
        {tab === "bookmarks" && <ViewToggle />}
      </div>

      {/* ── 전체 북마크 탭 ── */}
      {tab === "bookmarks" && (
        bookmarkedPosts.length === 0 ? (
          <p>아직 북마크한 작품이 없습니다. 작품 상세 페이지에서 ☆ 버튼을 눌러 추가해보세요.</p>
        ) : view === "grid" ? (
          <div className="post-grid">
            {bookmarkedPosts.map((post) => (
              <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
                <img src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"} alt="cover" className="post-cover" />
                <h3>{post.title}</h3>
                <AuthorLink authorName={post.author} />
                <button className="btn-collection-remove" onClick={(e) => { e.stopPropagation(); toggleCollection(post.id); }}>
                  북마크 제거
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {bookmarkedPosts.map((post) => (
              <BookmarkCard key={post.id} post={post} />
            ))}
          </div>
        )
      )}

      {/* ── 컬렉션 탭 ── */}
      {tab === "groups" && !selectedGroupId && (
        <div>
          {/* 새 컬렉션 만들기 */}
          {showNewGroupInput ? (
            <div className="cg-new-input-row">
              <input
                className="cg-new-input"
                placeholder="컬렉션 이름"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateGroup()}
                autoFocus
              />
              <button className="btn-black" onClick={handleCreateGroup}>만들기</button>
              <button className="btn-secondary" onClick={() => { setShowNewGroupInput(false); setNewGroupName(""); }}>취소</button>
            </div>
          ) : (
            <button className="cg-new-btn" onClick={() => setShowNewGroupInput(true)}>+ 새 컬렉션 만들기</button>
          )}

          {/* 컬렉션 그룹 그리드 */}
          {collectionGroups.length === 0 ? (
            <p>아직 컬렉션이 없습니다. 새 컬렉션을 만들어보세요.</p>
          ) : (
            <div className="cg-grid">
              {collectionGroups.map((group) => {
                const cover = posts.find((p) => group.postIds.includes(p.id))?.coverUrl;
                return (
                  <div key={group.id} className="cg-card" onClick={() => setSelectedGroupId(group.id)}>
                    <div className="cg-card-cover" style={cover ? { backgroundImage: `url(${cover})` } : {}}>
                      {!cover && <span className="cg-card-empty">☆</span>}
                    </div>
                    <div className="cg-card-info">
                      {editingGroupId === group.id ? (
                        <input
                          className="cg-rename-input"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleRenameConfirm(group.id); if (e.key === "Escape") setEditingGroupId(null); }}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      ) : (
                        <span className="cg-card-name">{group.name}</span>
                      )}
                      <span className="cg-card-count">작품 {group.postIds.length}개</span>
                    </div>
                    <div className="cg-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button className="cg-icon-btn" title="이름 변경" onClick={() => { setEditingGroupId(group.id); setEditingName(group.name); }}>✏️</button>
                      <button className="cg-icon-btn" title="삭제" onClick={() => deleteCollectionGroup(group.id)}>🗑️</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── 그룹 상세 ── */}
      {tab === "groups" && selectedGroupId && selectedGroup && (
        <div>
          <div className="cg-group-header">
            <button className="btn-back" onClick={() => setSelectedGroupId(null)}>←</button>
            <h3 className="cg-group-title">{selectedGroup.name}</h3>
            <button className="cg-add-btn" onClick={() => setShowAddModal(true)}>+ 북마크에서 추가</button>
          </div>

          {groupPosts.length === 0 ? (
            <p>이 컬렉션에 작품이 없습니다. 북마크에서 추가해보세요.</p>
          ) : (
            <div className="post-grid">
              {groupPosts.map((post) => (
                <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
                  <img src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"} alt="cover" className="post-cover" />
                  <h3>{post.title}</h3>
                  <AuthorLink authorName={post.author} />
                  <button className="btn-collection-remove" onClick={(e) => { e.stopPropagation(); removePostFromGroup(selectedGroupId, post.id); }}>
                    제거
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 북마크에서 추가 모달 */}
          {showAddModal && (
            <div className="preview-overlay" onClick={() => setShowAddModal(false)}>
              <div className="cg-add-modal" onClick={(e) => e.stopPropagation()}>
                <div className="preview-modal-header">
                  <span>북마크에서 추가</span>
                  <button className="preview-close" onClick={() => setShowAddModal(false)}>✕</button>
                </div>
                {addablePosts.length === 0 ? (
                  <p className="cg-add-modal-empty">추가할 수 있는 북마크가 없습니다.</p>
                ) : (
                  <ul className="cg-add-list">
                    {addablePosts.map((post) => (
                      <li key={post.id} className="cg-add-item">
                        <img src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"} alt="cover" className="cg-add-cover" />
                        <div className="cg-add-info">
                          <span className="cg-add-title">{post.title}</span>
                          <span className="cg-add-author">{post.author}</span>
                        </div>
                        <button className="btn-black cg-add-btn-sm" onClick={() => { addPostToGroup(selectedGroupId, post.id); }}>
                          추가
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
