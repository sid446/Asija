"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Image as ImageIcon,
  Loader2,
  Trash2,
  Pencil,
  X,
  Menu
} from 'lucide-react';

type TeamItem = {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  qualifications?: string;
  specialization?: string;
  experience?: string;
  membership?: string;
  associationYears?: string;
  mobile?: string;
  email?: string;
  description?: string;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('team');
  const [items, setItems] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedin: '',
    qualifications: '',
    specialization: '',
    experience: '',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: TeamItem) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      linkedin: item.linkedin || '',
      qualifications: item.qualifications || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      membership: item.membership || '',
      associationYears: item.associationYears || '',
      mobile: item.mobile || '',
      email: item.email || '',
      description: item.description || ''
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '', role: '', linkedin: '', qualifications: '', 
      specialization: '', experience: '', membership: '', 
      associationYears: '', mobile: '', email: '', description: ''
    });
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Member deleted successfully');
      fetchItems();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete member');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      let avatar = '';

      if (imageFile) {
        const form = new FormData();
        form.append('file', imageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: form,
        });

        if (!uploadRes.ok) {
          throw new Error('Image upload failed');
        }

        const uploadData = await uploadRes.json();
        avatar = uploadData.secure_url;
      }

      const url = editingId ? `/api/admin/team/${editingId}` : '/api/admin/team';
      const method = editingId ? 'PUT' : 'POST';
      
      const body: any = { ...formData };
      if (avatar) body.avatar = avatar;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      setMessage(editingId ? 'Team member updated successfully' : 'Team member created successfully');
      handleCancelEdit(); // Reset form
      fetchItems();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 shadow-sm">
        <span className="text-lg font-bold text-blue-600">Asija Admin</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-blue-600">Asija Admin</h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <button 
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button 
              onClick={() => { setActiveTab('team'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'team' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Users className="w-5 h-5 mr-3" />
              Team Management
            </button>
            <button 
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <Link href="/" className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200">
              <LogOut className="w-5 h-5 mr-3" />
              Exit to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0 transition-all duration-300">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Team Members</h2>
                  <p className="text-gray-500 mt-1 text-sm">Manage your team profiles and details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-6 sticky top-24 transition-all duration-300 hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-5 flex items-center justify-between text-gray-800">
                      <span className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${editingId ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        {editingId ? 'Edit Member' : 'Add New Member'}
                      </span>
                      {editingId && (
                        <button onClick={handleCancelEdit} className="text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                          <X className="w-3 h-3" /> Cancel
                        </button>
                      )}
                    </h3>
                    
                    {message && (
                      <div className={`p-4 rounded-xl text-sm mb-6 flex items-center gap-3 ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        <div className={`w-2 h-2 rounded-full ${message.includes('success') ? 'bg-green-500' : 'bg-red-500'}`} />
                        {message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                          <input 
                            name="name"
                            value={formData.name} 
                            onChange={handleInputChange} 
                            placeholder="e.g. John Doe" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Role / Title</label>
                          <input 
                            name="role"
                            value={formData.role} 
                            onChange={handleInputChange} 
                            placeholder="e.g. Senior Partner" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Profile Image</label>
                          <div className="flex items-center justify-center w-full group">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all duration-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                  <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{imageFile ? <span className="text-blue-600">{imageFile.name}</span> : 'Click to upload image'}</p>
                              </div>
                              <input type="file" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mobile</label>
                            <input name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                            <input name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                          <input name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Qualifications</label>
                          <input name="qualifications" value={formData.qualifications} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Specialization</label>
                          <input name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Experience</label>
                            <input name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Assoc. Years</label>
                            <input name="associationYears" value={formData.associationYears} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Membership No.</label>
                          <input name="membership" value={formData.membership} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description / Bio</label>
                          <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            rows={4} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:ring-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] ${editingId ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-200' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'}`}
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? 'Update Member' : 'Add Member')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 order-1 xl:order-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center backdrop-blur-sm">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        Current Team <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{items.length}</span>
                      </h3>
                    </div>
                    
                    {loading ? (
                      <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p>Loading team members...</p>
                      </div>
                    ) : items.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 bg-gray-50/30">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-900">No team members yet</p>
                        <p className="text-sm mt-1">Add your first team member using the form.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {items.map((item) => (
                          <div key={item._id} className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors group">
                            <div className="flex items-start gap-4 sm:gap-6">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-100 shrink-0 overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                                {item.avatar ? (
                                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                    <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                    <p className="text-sm text-blue-600 font-medium mt-0.5">{item.role}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => handleEdit(item)}
                                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(item._id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item.email && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                      {item.email}
                                    </span>
                                  )}
                                  {item.mobile && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                      {item.mobile}
                                    </span>
                                  )}
                                  {item.linkedin && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                      LinkedIn
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-gray-400">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <LayoutDashboard className="w-10 h-10 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Overview</h3>
              <p className="text-gray-500">Analytics and stats coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}