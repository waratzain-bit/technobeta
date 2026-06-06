import { useState, useEffect } from 'react';
import PostCard from './PostCard';

export default function DashboardContent({ activeTab }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GANTI DENGAN URL WEB APP DARI GOOGLE APPS SCRIPT ANDA
    const API_URL = 'https://script.google.com/macros/s/AKfycbxtWwJ8ZKLpwHtFmbT9Qyp56akWHyT9byhJR4H9ovqigGM9a_h4j0NSWmOUWbz1FaEUQg/exec'; 

    if (activeTab === 'dashboard') {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setPosts(data);
          setLoading(false);
        })
        .catch(err => console.error("Error fetching data:", err));
    }
  }, [activeTab]);

  return (
    <div className="p-8">
      {activeTab === 'dashboard' && (
        <>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Tutorial Terbaru</h2>
          {loading ? (
            <p className="text-slate-500">Memuat data dari Google Sheets...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <PostCard key={idx} {...post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}