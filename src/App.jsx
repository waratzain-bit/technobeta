import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, BarChart2, MessageSquare, DollarSign, FileText, 
  Layout, Palette, Settings, Plus, ArrowUp, ArrowDown, X, Save, Edit, Trash2,
  ShieldCheck, Globe, ExternalLink, RefreshCw, Layers, ChevronLeft, Menu, Eye, AlertCircle
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'posts', label: 'Postingan', icon: BookOpen },
  { id: 'stats', label: 'Statistik', icon: BarChart2 },
  { id: 'comments', label: 'Komentar', icon: MessageSquare },
  { id: 'earnings', label: 'Penghasilan', icon: DollarSign },
  { id: 'pages', label: 'Halaman', icon: FileText },
  { id: 'layout', label: 'Tata Letak', icon: Layout },
  { id: 'theme', label: 'Tema', icon: Palette },
  { id: 'settings', label: 'Setelan', icon: Settings },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [blogs, setBlogs] = useState(['Blog Teknologi Saya', 'Blog Kuliner']);
  const [selectedBlog, setSelectedBlog] = useState('Blog Teknologi Saya');
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAddress, setNewBlogAddress] = useState('');
  const [formError, setFormError] = useState('');

  // State untuk pembuatan postingan baru
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Web App');
  const [postContent, setPostContent] = useState('');

  // State Postingan Dinamis
  const [posts, setPosts] = useState([
    { id: 1, title: 'Tutorial Google Apps Script Lanjutan', excerpt: 'Pelajari cara mengoptimalkan runtime eksekusi skrip spreadsheet Anda agar berjalan 2x lebih cepat.', category: 'Apps Script', readTime: '5 min read' },
    { id: 2, title: 'Optimasi Rumus VLOOKUP dan INDEX MATCH', excerpt: 'Gunakan alternatif formula pencarian data dinamis untuk menghemat beban RAM pada lembar kerja spreadsheet berukuran besar.', category: 'Spreadsheet', readTime: '4 min read' }
  ]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // State Halaman Statis (About, Contact, Disclaimer, Privacy Policy)
  const [pages, setPages] = useState([
    { id: 1, title: 'About', content: 'Halo, ini adalah halaman tentang saya. Saya seorang narablog...' }, 
    { id: 2, title: 'Contact', content: 'Silakan hubungi saya melalui email di admin@blog.com' }, 
    { id: 3, title: 'Disclaimer', content: 'Semua informasi di blog ini diterbitkan dengan itikad baik...' }, 
    { id: 4, title: 'Privacy Policy', content: 'Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan data...' }
  ]);

  // State Tata Letak Gadget
  const [widgets, setWidgets] = useState([
    { id: 100, name: 'Judul Blog (Header)', code: '<h1>Blog Teknologi Saya</h1>', zone: 'header' },
    { id: 101, name: 'Postingan Blog', code: '<!-- Main Postings Widget -->', zone: 'main' },
    { id: 102, name: 'Popular Posts', code: '<ul><li>Post 1</li><li>Post 2</li></ul>', zone: 'sidebar' },
    { id: 103, name: 'About Me', code: '<p>Selamat datang di blog saya!</p>', zone: 'sidebar' },
    { id: 104, name: 'Atribusi', code: '<p>© 2026 AdminRhimas</p>', zone: 'footer' }
  ]);

  // State untuk Modal Tambah/Edit Widget
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [widgetModalData, setWidgetModalData] = useState({ id: null, name: '', code: '', zone: '' });

  // URL Web App Google Apps Script API yang terintegrasi secara dinamis
  const API_URL = 'https://script.google.com/macros/s/AKfycbycJgM-1CGDqWX1ngwtdBwzAiHOGHjVJzyd2VoAL0zyxMHUYjhjozqa5JpFoxYFQDW1/exec';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (error) {
        console.log("Menggunakan data mockup lokal karena koneksi API belum terpasang.");
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [selectedBlog]);

  const handleBlogChange = (e) => {
    const value = e.target.value;
    if (value === 'CREATE_NEW') {
      setShowCreateBlogModal(true);
      e.target.value = selectedBlog;
    } else {
      setSelectedBlog(value);
    }
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) {
      setFormError('Judul blog tidak boleh kosong.');
      return;
    }
    if (!newBlogAddress.trim()) {
      setFormError('Alamat blog tidak boleh kosong.');
      return;
    }
    
    const formattedTitle = newBlogTitle.trim();
    setBlogs([...blogs, formattedTitle]);
    setSelectedBlog(formattedTitle);
    
    setNewBlogTitle('');
    setNewBlogAddress('');
    setFormError('');
    setShowCreateBlogModal(false);
  };

  const openAddWidget = (zone) => {
    setWidgetModalData({ id: null, name: '', code: '', zone });
    setShowWidgetModal(true);
  };

  const openEditWidget = (widget) => {
    setWidgetModalData({ ...widget });
    setShowWidgetModal(true);
  };

  const saveWidget = () => {
    if (!widgetModalData.name.trim()) return;

    if (widgetModalData.id) {
      // Edit Mode
      setWidgets(widgets.map(w => w.id === widgetModalData.id ? widgetModalData : w));
    } else {
      // Add Mode
      const newWidget = {
        ...widgetModalData,
        id: Date.now()
      };
      setWidgets([...widgets, newWidget]);
    }
    setShowWidgetModal(false);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const moveWidget = (id, direction) => {
    const index = widgets.findIndex(w => w.id === id);
    if (index === -1) return;
    const zoneWidgets = widgets.filter(w => w.zone === widgets[index].zone);
    const zoneIndex = zoneWidgets.findIndex(w => w.id === id);
    
    if (direction === 'up' && zoneIndex > 0) {
      const prevWidget = zoneWidgets[zoneIndex - 1];
      const newWidgets = widgets.map(w => {
        if (w.id === id) return prevWidget;
        if (w.id === prevWidget.id) return widgets[index];
        return w;
      });
      setWidgets(newWidgets);
    } else if (direction === 'down' && zoneIndex < zoneWidgets.length - 1) {
      const nextWidget = zoneWidgets[zoneIndex + 1];
      const newWidgets = widgets.map(w => {
        if (w.id === id) return nextWidget;
        if (w.id === nextWidget.id) return widgets[index];
        return w;
      });
      setWidgets(newWidgets);
    }
  };

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      title: postTitle.trim(),
      excerpt: postContent.substring(0, 150) + (postContent.length > 150 ? '...' : ''),
      category: postCategory,
      readTime: `${Math.max(1, Math.ceil(postContent.split(' ').length / 200))} min read`
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setIsCreatingPost(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts': 
        return (
          <PostsView 
            posts={posts} 
            setPosts={setPosts}
            loading={loadingPosts} 
            blogName={selectedBlog} 
            isCreatingPost={isCreatingPost}
            setIsCreatingPost={setIsCreatingPost}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postCategory={postCategory}
            setPostCategory={setPostCategory}
            postContent={postContent}
            setPostContent={setPostContent}
            handlePublishPost={handlePublishPost}
          />
        );
      case 'stats': return <StatsView />;
      case 'comments': return <CommentsView />;
      case 'earnings': return <EarningsView />;
      case 'pages': return <PagesView pages={pages} setPages={setPages} />;
      case 'layout': 
        return (
          <LayoutView 
            widgets={widgets} 
            openAddWidget={openAddWidget} 
            openEditWidget={openEditWidget}
            removeWidget={removeWidget} 
            moveWidget={moveWidget} 
          />
        );
      case 'theme': return <ThemeView />;
      case 'settings': return <SettingsView blogName={selectedBlog} />;
      default: return <div className="p-8 bg-white border rounded-xl shadow-sm">Fitur {activeTab} sedang dalam pengembangan.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* SIDEBAR NAVIGASI UTAMA */}
      <aside className="w-64 bg-white border-r flex flex-col h-screen sticky top-0 z-50">
        <div className="p-4 border-b flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer relative">
          <div className="w-8 h-8 bg-orange-600 min-w-[2rem] text-white flex items-center justify-center rounded text-xl font-bold shadow-sm">B</div>
          <select 
            value={selectedBlog}
            onChange={handleBlogChange}
            className="w-full bg-transparent font-bold text-gray-700 outline-none cursor-pointer text-sm appearance-none pr-4"
          >
            {blogs.map((b, idx) => (
              <option key={idx} value={b}>{b}</option>
            ))}
            <option disabled>──────────</option>
            <option value="CREATE_NEW" className="text-orange-600 font-semibold">+ Buat blog baru...</option>
          </select>
          <div className="absolute right-6 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Tombol Postingan Baru */}
          <button 
            onClick={() => {
              setActiveTab('posts');
              setIsCreatingPost(true);
            }}
            className="w-full bg-orange-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-orange-700 mb-6 transition shadow"
          >
            <Plus size={20} /> Postingan Baru
          </button>
          <div className="space-y-1">
            {MENU_ITEMS.map(item => (
              <button 
                key={item.id} 
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'posts') setIsCreatingPost(false);
                }} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === item.id ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {isCreatingPost && activeTab === 'posts' ? 'Buat Postingan Baru' : MENU_ITEMS.find(m => m.id === activeTab)?.label}
        </h1>
        {renderContent()}
      </main>

      {/* MODAL PEMBUATAN BLOG BARU */}
      {showCreateBlogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Buat Blog Baru</h2>
              <button 
                onClick={() => { setShowCreateBlogModal(false); setFormError(''); }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateBlog} className="p-6 space-y-6">
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-200">
                  {formError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama / Judul Blog</label>
                <input 
                  type="text"
                  placeholder="Misal: Blog Kuliner Rhimas"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  className="w-full p-3 border rounded-xl outline-none focus:border-orange-600 transition bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Alamat URL Blog</label>
                <div className="flex items-center">
                  <input 
                    type="text"
                    placeholder="nama-blog-baru"
                    value={newBlogAddress}
                    onChange={(e) => setNewBlogAddress(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="flex-1 p-3 border border-r-0 rounded-l-xl outline-none focus:border-orange-600 transition bg-gray-50 focus:bg-white font-mono text-sm"
                    required
                  />
                  <span className="p-3 border bg-gray-100 rounded-r-xl font-mono text-sm text-gray-500">
                    .blogspot.com
                  </span>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => { setShowCreateBlogModal(false); setFormError(''); }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition text-sm border"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition text-sm shadow"
                >
                  Buat Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIGURASI GADGET TATA LETAK */}
      {showWidgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {widgetModalData.id ? 'Edit Gadget HTML/JavaScript' : 'Tambah Gadget Baru'}
              </h2>
              <button 
                onClick={() => setShowWidgetModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Gadget</label>
                <input 
                  type="text"
                  placeholder="Misal: HTML Sidebar Kustom"
                  value={widgetModalData.name}
                  onChange={(e) => setWidgetModalData({ ...widgetModalData, name: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:border-orange-600 transition bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Konten / Kode Script HTML</label>
                <textarea 
                  rows={8}
                  placeholder="<!-- Tulis skrip kustom, CSS, atau HTML widget Anda disini -->"
                  value={widgetModalData.code}
                  onChange={(e) => setWidgetModalData({ ...widgetModalData, code: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:border-orange-600 transition bg-gray-900 text-green-400 font-mono text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button 
                onClick={() => setShowWidgetModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition text-sm border"
              >
                Batal
              </button>
              <button 
                onClick={saveWidget}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition text-sm shadow"
              >
                Simpan Gadget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PostsView = ({ 
  posts, setPosts, loading, blogName, isCreatingPost, setIsCreatingPost,
  postTitle, setPostTitle, postCategory, setPostCategory, postContent, setPostContent, handlePublishPost
}) => {

  const handleDeletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const isWebOrScript = postCategory === 'Web App' || postCategory === 'Apps Script';

  if (isCreatingPost) {
    return (
      <div className="bg-white border rounded-xl shadow-sm p-6 max-w-4xl">
        <form onSubmit={handlePublishPost} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Postingan</label>
            <input 
              type="text"
              placeholder="Tuliskan judul artikel tutorial Anda..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:border-orange-600 transition bg-gray-50 focus:bg-white text-lg font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kategori / Label</label>
              <select 
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:border-orange-600 transition bg-gray-50 focus:bg-white"
              >
                <option value="Web App">Web App (HTML/Script Editor)</option>
                <option value="Apps Script">Apps Script (Code Editor)</option>
                <option value="Spreadsheet">Spreadsheet</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <span>Isi Postingan</span>
              {isWebOrScript && (
                <span className="bg-slate-900 text-green-400 text-xs px-2 py-0.5 rounded font-mono font-bold border border-slate-700 animate-pulse">
                  HTML & Code Editor Mode Active 🌐
                </span>
              )}
            </label>
            <textarea 
              rows={14}
              placeholder={isWebOrScript ? `<!-- Tulis skrip/kode HTML Anda di sini -->\n<div class="web-app">\n  <h1>Selamat Datang</h1>\n  <script>\n    console.log("Aplikasi web siap!");\n  </script>\n</div>` : "Mulai menulis konten artikel tutorial Anda di sini..."}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className={`w-full p-4 border rounded-xl outline-none transition duration-300 leading-relaxed ${
                isWebOrScript 
                  ? 'font-mono text-sm bg-slate-900 text-green-400 focus:bg-slate-950 border-slate-700 focus:border-orange-500' 
                  : 'font-sans text-base bg-gray-50 focus:bg-white border-slate-200 focus:border-orange-600 text-slate-800'
              }`}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button 
              type="button"
              onClick={() => {
                setIsCreatingPost(false);
                setPostTitle('');
                setPostContent('');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition text-sm border"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition text-sm shadow"
            >
              Publikasikan
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="font-bold text-gray-700">Daftar Postingan ({blogName})</h2>
        <button 
          onClick={() => setIsCreatingPost(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-orange-700 transition text-sm"
        >
          <Plus size={16} /> Postingan Baru
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Sedang sinkronisasi data dengan Google Sheets...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center">
          <BookOpen size={48} className="text-gray-300 mb-4" />
          <p>Belum ada postingan yang terdeteksi di Google Sheet Anda.</p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div key={post.id || idx} className="border border-slate-200 hover:border-orange-600 rounded-2xl p-6 bg-white hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-orange-50 text-orange-600 text-xs px-2.5 py-1 rounded-full font-bold mb-3">
                  {post.category || "General"}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
                <span>{post.readTime || "5 min read"}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatsView = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="font-bold mb-4 text-gray-700">Statistik Pengunjung (Diagram Batang)</h3>
      <div className="h-48 bg-gray-50 border rounded flex items-end p-4 gap-4">
         {[40, 70, 45, 90, 60, 85, 100].map((h, i) => (
           <div key={i} className="flex-1 flex flex-col justify-end group relative">
             <div style={{height: `${h}%`}} className="bg-orange-500 rounded-t-sm transition-all duration-300 hover:bg-orange-600 w-full"></div>
             <span className="text-xs text-center mt-2 text-gray-500 font-medium">Hari {i+1}</span>
           </div>
         ))}
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="font-bold mb-4 text-gray-700">Grafik Pertumbuhan (Kurva S)</h3>
      <div className="h-48 bg-gray-50 border rounded relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 500 150" className="w-full h-full absolute inset-0 opacity-80" preserveAspectRatio="none">
          <path d="M0,150 C100,150 200,10 500,10" fill="none" stroke="#ea580c" strokeWidth="4" />
          <path d="M0,150 C100,150 200,10 500,10 L500,150 L0,150 Z" fill="url(#grad)" opacity="0.2" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ea580c', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#ea580c', stopOpacity: 0}} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

const CommentsView = () => {
  const [commentFilter, setCommentFilter] = useState('all');
  const mockupComments = [
    { id: 1, author: 'Sandi Purwanto', content: 'Tutorial spreadsheet-nya sangat membantu mas!', post: 'Rumus VLOOKUP Lanjutan', status: 'approved' },
    { id: 2, author: 'Dewi Lestari', content: 'Apakah skrip Google Apps Script ini gratis?', post: 'Otomatisasi Laporan Spreadsheet', status: 'pending' },
    { id: 3, author: 'Spammer Bot', content: 'CLICK HERE TO WIN FREE IPHONE!!!', post: 'Optimasi Google Apps Script', status: 'spam' }
  ];

  const filteredComments = commentFilter === 'all' 
    ? mockupComments 
    : mockupComments.filter(c => c.status === commentFilter);

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
      <div className="flex gap-2 border-b pb-4">
        {['all', 'pending', 'spam'].map(filter => (
          <button 
            key={filter} 
            onClick={() => setCommentFilter(filter)} 
            className={`px-4 py-1.5 rounded-lg font-bold text-sm capitalize ${commentFilter === filter ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filteredComments.map(c => (
          <div key={c.id} className="p-4 border rounded-xl flex justify-between items-start bg-gray-50">
            <div>
              <span className="font-bold text-gray-800 text-sm block">{c.author}</span>
              <p className="text-gray-600 text-sm mt-1">{c.content}</p>
              <span className="text-xs text-gray-400 mt-2 block">Postingan: {c.post}</span>
            </div>
            <div className="flex gap-2">
              {c.status !== 'approved' && <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Setujui</button>}
              {c.status !== 'spam' && <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Spam</button>}
              <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EarningsView = () => {
  const [successMsg, setSuccessMsg] = useState('');

  const handleSaveEarnings = () => {
    setSuccessMsg('✅ Skrip Iklan berhasil disimpan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
      <p className="text-gray-600 mb-4">Kelola skrip iklan Anda untuk melakukan monetisasi pada blog.</p>
      
      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg transition-all">
          {successMsg}
        </div>
      )}

      <div>
          <h3 className="font-bold mb-2 text-gray-800">Penghasilan Google AdSense</h3>
          <textarea className="w-full p-4 border rounded font-mono text-sm bg-gray-50 outline-none focus:border-orange-600" rows={3} placeholder="Masukkan skrip AdSense Anda di sini..." />
      </div>
      <div>
          <h3 className="font-bold mb-2 text-gray-800">Iklan Adsterra</h3>
          <textarea className="w-full p-4 border rounded font-mono text-sm bg-gray-50 outline-none focus:border-orange-600" rows={3} placeholder="Masukkan skrip Popunder atau Banner Adsterra..." />
      </div>
      <div>
          <h3 className="font-bold mb-2 text-gray-800">Iklan Lainnya (MGID, PropellerAds, dll)</h3>
          <textarea className="w-full p-4 border rounded font-mono text-sm bg-gray-50 outline-none focus:border-orange-600" rows={3} placeholder="Masukkan skrip iklan lainnya..." />
      </div>
      <div className="pt-4 border-t">
          <button onClick={handleSaveEarnings} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
            <Save size={18} /> Simpan Semua Perubahan
          </button>
      </div>
    </div>
  );
};

const PagesView = ({ pages, setPages }) => {
    const [editingPage, setEditingPage] = useState(null);

    if (editingPage) {
        return (
            <div className="bg-white p-8 rounded-xl border shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-800">{editingPage.id === 'new' ? 'Halaman Baru' : `Edit Halaman: ${editingPage.title}`}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Judul Halaman</label>
                        <input 
                            className="w-full p-3 border rounded outline-none focus:border-orange-500" 
                            value={editingPage.title} 
                            placeholder="Contoh: About, Contact"
                            onChange={e => setEditingPage({...editingPage, title: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Konten</label>
                        <textarea 
                            className="w-full h-64 p-4 border rounded font-mono text-sm outline-none focus:border-orange-500 bg-gray-50" 
                            value={editingPage.content} 
                            placeholder="Mulai mengetik konten halaman Anda di sini..."
                            onChange={e => setEditingPage({...editingPage, content: e.target.value})} 
                        />
                    </div>
                </div>
                <div className="flex gap-3 mt-6 pt-4 border-t">
                    <button 
                        onClick={() => { 
                            if (editingPage.id === 'new') {
                                setPages([...pages, { ...editingPage, id: Date.now() }]);
                            } else {
                                setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
                            }
                            setEditingPage(null); 
                        }} 
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-bold transition flex items-center gap-2"
                    >
                        <Save size={18} /> Simpan Halaman
                    </button>
                    <button onClick={() => setEditingPage(null)} className="bg-gray-200 hover:bg-gray-350 text-gray-800 px-6 py-2 rounded font-bold transition">Batal</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Kelola halaman statis blog Anda.</p>
                <button onClick={() => setEditingPage({ id: 'new', title: '', content: '' })} className="bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-200">
                    <Plus size={16}/> Halaman Baru
                </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
                {pages.length === 0 && <div className="p-4 text-center text-gray-500">Belum ada halaman.</div>}
                {pages.map((p, index) => (
                    <div key={p.id} className={`p-4 flex justify-between items-center hover:bg-gray-50 transition ${index !== pages.length - 1 ? 'border-b' : ''}`}>
                        <div>
                            <span className="font-semibold text-gray-800 text-lg">{p.title}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingPage(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1 font-medium text-sm">
                                <Edit size={16} /> Edit
                            </button>
                            <button onClick={() => setPages(pages.filter(item => item.id !== p.id))} className="p-2 text-red-500 hover:bg-red-50 rounded flex items-center gap-1 font-medium text-sm">
                                <Trash2 size={16} /> Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LayoutView = ({ widgets, openAddWidget, openEditWidget, removeWidget, moveWidget }) => {
    const renderZone = (zoneName, title, desc = '') => {
        const zoneWidgets = widgets.filter(w => w.zone === zoneName);
        return (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-lg relative">
                <div className="mb-4">
                    <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
                    {desc && <p className="text-xs text-gray-500">{desc}</p>}
                </div>
                
                <div className="space-y-2 mb-4">
                    {zoneWidgets.map(w => (
                        <div key={w.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 shadow-sm rounded">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-700">{w.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono truncate max-w-md" title={w.code}>
                                {w.code ? w.code.substring(0, 50) + (w.code.length > 50 ? '...' : '') : 'Empty content'}
                              </span>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => moveWidget(w.id, 'up')} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Naik"><ArrowUp size={16} /></button>
                                <button onClick={() => moveWidget(w.id, 'down')} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Turun"><ArrowDown size={16} /></button>
                                <button onClick={() => openEditWidget(w)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit Gadget"><Edit size={16} /></button>
                                <button onClick={() => removeWidget(w.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Hapus"><X size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => openAddWidget(zoneName)} className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:underline">
                    <Plus size={16}/> Tambah Gadget
                </button>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <p className="text-gray-600 mb-6 pb-4 border-b">Tambahkan, hapus, dan edit gadget di blog Anda. Klik dan tarik untuk menata ulang gadget. Untuk mengubah kolom dan lebar, gunakan Desainer Tema.</p>
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Zone */}
                {renderZone('header', 'Header', 'Tampilkan judul dan deskripsi blog')}

                {/* Grid Container for Main and Sidebar */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="col-span-2 space-y-4">
                        {renderZone('main', 'Main Content', 'Area postingan utama blog')}
                    </div>
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-4">
                        {renderZone('sidebar', 'Sidebar', 'Area samping blog (Popular Posts, Profil, dll)')}
                    </div>
                </div>

                {/* Footer Zone */}
                {renderZone('footer', 'Footer', 'Area bawah blog')}
            </div>
        </div>
    );
};

const ThemeView = () => {
  const [themeCode, setThemeCode] = useState(`<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <b:include data='blog' name='all-head-content'/>
    <title><data:blog.pageTitle/></title>
    <!-- Tambahkan CSS Kustom Anda di sini -->
    <b:skin><![CDATA[
      body { background: #f0f0f0; font-family: sans-serif; }
      /* ... css lainnya ... */
    ]]></b:skin>
  </head>
  <body>
    <!-- Template Body -->
    <div class='container'>
        <b:section class='header' id='header' maxwidgets='1' showaddelement='yes'>
            <b:widget id='Header1' locked='true' title='Judul Blog' type='Header' version='2' visible='true'/>
        </b:section>
    </div>
  </body>
</html>`);

  const fileInputRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleXmlUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.endsWith('.xml')) {
        setStatusMsg('❌ Error: File harus berformat .xml');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setThemeCode(e.target.result);
        setStatusMsg('🎉 Tema berhasil diunggah dan dimuat ke Editor!');
        setTimeout(() => setStatusMsg(''), 5000);
      };
      reader.readAsText(file);
    }
  };

  const handleBackup = () => {
    const blob = new Blob([themeCode], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blogger-custom-theme.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMsg('💾 File cadangan tema (.xml) berhasil diunduh.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-4 border-b">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Kustomisasi Tema</h2>
          <p className="text-sm text-gray-500">Edit HTML tema atau pulihkan dari cadangan (.xml).</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleXmlUpload} 
            accept=".xml" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current.click()} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold border flex items-center gap-2 transition text-sm"
          >
            <ArrowUp size={16}/> Upload Tema (.xml)
          </button>
          <button 
            onClick={handleBackup}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold border flex items-center gap-2 transition text-sm"
          >
            <ArrowDown size={16}/> Cadangkan Tema
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold rounded-lg transition-all">
          {statusMsg}
        </div>
      )}
      
      <div>
          <label className="block font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
              Edit HTML Tema (Peringatan Lanjutan)
          </label>
          <div className="border bg-gray-900 rounded-lg p-2">
              <textarea 
                  className="w-full h-80 p-4 bg-transparent text-green-400 font-mono text-sm outline-none resize-y" 
                  spellCheck="false"
                  value={themeCode}
                  onChange={(e) => setThemeCode(e.target.value)}
              />
          </div>
      </div>
      
      <div className="pt-4 border-t flex justify-end">
          <button 
            onClick={() => {
              setStatusMsg('✅ Perubahan HTML Tema berhasil disimpan ke server!');
              setTimeout(() => setStatusMsg(''), 4000);
            }} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow"
          >
              <Save size={18} /> Simpan Tema HTML
          </button>
      </div>
    </div>
  );
};

const SettingsView = ({ blogName }) => {
  const [switches, setSwitches] = useState({
    adultContent: false,
    searchVisible: true,
    redirectDomain: false,
    httpsRedirect: true,
    lightbox: true,
    lazyLoad: true,
    webpImages: true,
    captcha: true,
    metaTags: false,
    robotsTxt: false,
    robotsHeader: false,
    adsTxt: false,
    draftBlogger: false,
    enallink: true
  });

  const toggleSwitch = (key) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [savingSettings, setSavingSettings] = useState(false);

  const handleSaveSettings = () => {
    setSavingSettings(true);
    setTimeout(() => {
      setSavingSettings(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Setelan Blog</h2>
          <p className="text-sm text-gray-500">Konfigurasi mendetail sistem blog Anda layaknya Blogger.</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow text-sm"
        >
          <Save size={18}/> {savingSettings ? 'Menyimpan...' : 'Simpan Setelan'}
        </button>
      </div>

      <div className="space-y-8 divide-y divide-gray-100">
        
        {/* KATEGORI: DASAR */}
        <div className="pt-4 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Judul Blog</label>
              <input className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500" defaultValue={blogName} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Bahasa Blog</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Indonesia</option>
                  <option>English</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Blog</label>
              <textarea className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 h-24" defaultValue="Berbagi tutorial seputar pemrograman, spreadsheet, dan Google Apps Script secara terstruktur." />
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl col-span-2">
              <div>
                <p className="font-bold text-gray-700">Konten khusus dewasa</p>
                <p className="text-xs text-gray-500">Tampilkan peringatan konten khusus dewasa kepada pembaca blog</p>
              </div>
              <button 
                onClick={() => toggleSwitch('adultContent')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.adultContent ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.adultContent ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ID Pengukuran Google Analytics</label>
              <input className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 font-mono text-sm" placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Favicon</label>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl border text-sm font-semibold w-full text-left">
                Edit Favicon Blog
              </button>
            </div>
          </div>
        </div>

        {/* KATEGORI: PRIVASI */}
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-orange-600">Privasi</h3>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-700">Dapat diakses mesin telusur</p>
              <p className="text-xs text-gray-500">Izinkan mesin telusur (Google, Bing) untuk mengindeks dan menemukan blog Anda</p>
            </div>
            <button 
              onClick={() => { toggleSwitch('searchVisible'); }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.searchVisible ? 'bg-orange-600' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.searchVisible ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* KATEGORI: PUBLIKASI */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Publikasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Alamat blog</label>
              <input className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 font-mono text-sm" defaultValue={`${blogName.toLowerCase().replace(/\s+/g, '-')}.blogspot.com`} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Domain Kustom</label>
              <input className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 font-mono text-sm" placeholder="www.domainanda.com" />
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl col-span-2">
              <div>
                <p className="font-bold text-gray-700">Alihkan domain</p>
                <p className="text-xs text-gray-500">Alihkan subdomain www ke domain root kustom Anda</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('redirectDomain'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.redirectDomain ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.redirectDomain ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* KATEGORI: HTTPS */}
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-orange-600">HTTPS</h3>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-700">Pengalihan HTTPS</p>
              <p className="text-xs text-gray-500">Memastikan semua kunjungan ke HTTP dialihkan secara paksa ke HTTPS demi keamanan</p>
            </div>
            <button 
              onClick={() => { toggleSwitch('httpsRedirect'); }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.httpsRedirect ? 'bg-orange-600' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.httpsRedirect ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* KATEGORI: IZIN */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Izin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Admin dan penulis blog</label>
              <div className="p-3 border rounded-xl bg-gray-50 text-sm space-y-1">
                <p className="font-bold">admin@blog.com (Anda - Admin)</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Akses pembaca</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Publik</option>
                  <option>Khusus</option>
              </select>
            </div>
            <div className="col-span-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl border text-sm font-semibold">
                + Undang lebih banyak penulis
              </button>
            </div>
          </div>
        </div>

        {/* KATEGORI: POSTINGAN */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Postingan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jumlah maksimal postingan utama</label>
              <input type="number" className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none" defaultValue={20} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Frekuensi Arsip</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Bulanan</option>
                  <option>Mingguan</option>
                  <option>Harian</option>
              </select>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl col-span-2">
              <div>
                <p className="font-bold text-gray-700">Lightbox Gambar</p>
                <p className="text-xs text-gray-500">Menampilkan gambar dalam overlay elegan di atas postingan saat diklik</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('lightbox'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.lightbox ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.lightbox ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-bold text-gray-700">Gambar Pemuatan Lambat (Lazy Load)</p>
                <p className="text-xs text-gray-500">Optimalkan loading dengan memuat gambar saat pembaca scroll ke bawah</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('lazyLoad'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.lazyLoad ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.lazyLoad ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-bold text-gray-700">Penyajian Gambar WebP</p>
                <p className="text-xs text-gray-500">Menyajikan gambar format WebP yang terkompresi secara dinamis untuk kecepatan</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('webpImages'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.webpImages ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.webpImages ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* KATEGORI: KOMENTAR */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Komentar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Lokasi komentar</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Tersemat</option>
                  <option>Halaman Penuh</option>
                  <option>Jendela Pop-up</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Siapa yang dapat mengomentari?</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Siapa saja (termasuk anonim)</option>
                  <option>Hanya pengguna terdaftar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Moderasi Komentar</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Selalu</option>
                  <option>Kadang-kadang</option>
                  <option>Tidak Pernah</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Captcha komentar pembaca</label>
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border">
                <span className="text-xs text-gray-500">Tampilkan verifikasi kata untuk pembaca</span>
                <button 
                  type="button"
                  onClick={() => { toggleSwitch('captcha'); }}
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${switches.captcha ? 'bg-orange-600' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition duration-300 ${switches.captcha ? 'translate-x-5' : ''}`}></div>
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Pesan formulir komentar</label>
              <textarea className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 h-20" defaultValue="Tuliskan masukan atau komentar yang baik-baik saja, hindari menghujat sesama." />
            </div>
          </div>
        </div>

        {/* KATEGORI: EMAIL */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Email</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Posting menggunakan email</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Dinonaktifkan</option>
                  <option>Publikasikan segera</option>
                  <option>Simpan sebagai draf</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Notifikasi Komentar Penduduk</label>
              <input className="w-full p-3 border rounded bg-gray-50 outline-none" placeholder="Masukkan email tujuan..." />
            </div>
          </div>
        </div>

        {/* KATEGORI: PEMFORMATAN */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Pemformatan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Zona waktu</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none text-sm">
                  <option>(GMT+07:00) Waktu Indonesia Barat – Jakarta</option>
                  <option>(GMT+08:00) Waktu Indonesia Tengah – Makassar</option>
                  <option>(GMT+09:00) Waktu Indonesia Timur – Jayapura</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Format header tanggal</label>
              <select className="w-full p-3 border rounded bg-gray-50 outline-none">
                  <option>Sabtu, Juni 06, 2026</option>
                  <option>06 Juni 2026</option>
                  <option>2026-06-06</option>
              </select>
            </div>
          </div>
        </div>

        {/* KATEGORI: TAG META */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Tag Meta</h3>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl col-span-2">
            <div>
              <p className="font-bold text-gray-700">Aktifkan deskripsi penelusuran</p>
              <p className="text-xs text-gray-500">Mungkinkan meta deskripsi kustom untuk optimasi SEO di Google</p>
            </div>
            <button 
              onClick={() => { toggleSwitch('metaTags'); }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.metaTags ? 'bg-orange-600' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.metaTags ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
          {switches.metaTags && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi penelusuran</label>
              <textarea className="w-full p-3 border rounded bg-gray-50 focus:bg-white outline-none focus:border-orange-500 h-20" placeholder="Meta Deskripsi SEO blog..." />
            </div>
          )}
        </div>

        {/* KATEGORI: CRAWLER DAN PENGINDEKSAN */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Crawler dan Pengindeksan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-bold text-gray-700">Aktifkan robots.txt kustom</p>
                <p className="text-xs text-gray-500">Konfigurasikan instruksi file robots.txt manual Anda</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('robotsTxt'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.robotsTxt ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.robotsTxt ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            {switches.robotsTxt && (
              <div>
                <textarea className="w-full p-3 border rounded font-mono text-sm bg-gray-900 text-green-400 outline-none" rows={4} defaultValue={`User-agent: *\nDisallow: /search\nAllow: /`} />
              </div>
            )}
          </div>
        </div>

        {/* KATEGORI: MONETISASI */}
        <div className="pt-6 space-y-6">
          <h3 className="text-lg font-bold text-orange-600">Monetisasi</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-bold text-gray-700">Aktifkan ads.txt kustom</p>
                <p className="text-xs text-gray-500">Unggah file konfigurasi ads.txt publisher kustom Anda</p>
              </div>
              <button 
                onClick={() => { toggleSwitch('adsTxt'); }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.adsTxt ? 'bg-orange-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.adsTxt ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
            {switches.adsTxt && (
              <div>
                <textarea className="w-full p-3 border rounded font-mono text-sm bg-gray-50 outline-none" rows={2} defaultValue="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0" />
              </div>
            )}
          </div>
        </div>

        {/* KATEGORI: KELOLA BLOG */}
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-orange-600">Kelola Blog</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl font-bold border text-sm text-gray-700 transition">
              Impor Konten (.xml)
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl font-bold border text-sm text-gray-700 transition">
              Cadangkan Konten
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl font-bold border text-sm text-gray-700 transition">
              Video Dari Blog
            </button>
            <button className="bg-red-50 hover:bg-red-100 p-4 rounded-xl font-bold border border-red-200 text-sm text-red-600 transition">
              Hapus Blog Anda
            </button>
          </div>
        </div>

        {/* KATEGORI: UMUM */}
        <div className="pt-6 space-y-4 pb-8">
          <h3 className="text-lg font-bold text-orange-600">Umum</h3>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-gray-700">Gunakan draf Blogger</p>
              <p className="text-xs text-gray-500">Gunakan fitur pengujian platform beta Blogger</p>
            </div>
            <button 
              onClick={() => { toggleSwitch('draftBlogger'); }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${switches.draftBlogger ? 'bg-orange-600' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${switches.draftBlogger ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};