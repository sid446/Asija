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
  X
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
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">Asija Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'team' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-4 h-4 mr-3" />
            Team Management
          </button>
          <button 
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4 mr-3" />
            Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {activeTab === 'team' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                <p className="text-gray-500 mt-1">Manage your team profiles and details.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                  <h3 className="font-semibold text-lg mb-4 flex items-center justify-between">
                    <span className="flex items-center">
                      {editingId ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      {editingId ? 'Edit Member' : 'Add New Member'}
                    </span>
                    {editingId && (
                      <button onClick={handleCancelEdit} className="text-xs text-red-500 hover:text-red-700 flex items-center">
                        <X className="w-3 h-3 mr-1" /> Cancel
                      </button>
                    )}
                  </h3>
                  
                  {message && (
                    <div className={`p-3 rounded-lg text-sm mb-4 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        name="name"
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="e.g. John Doe" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Role / Title</label>
                      <input 
                        name="role"
                        value={formData.role} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Senior Partner" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Profile Image</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500">{imageFile ? imageFile.name : 'Click to upload image'}</p>
                          </div>
                          <input type="file" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} accept="image/*" />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Mobile</label>
                        <input name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</label>
                      <input name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Qualifications</label>
                      <input name="qualifications" value={formData.qualifications} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Specialization</label>
                      <input name="specialization" value={formData.specialization} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
                        <input name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Assoc. Years</label>
                        <input name="associationYears" value={formData.associationYears} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Membership No.</label>
                      <input name="membership" value={formData.membership} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Description / Bio</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        rows={4} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className={`w-full flex items-center justify-center px-4 py-2.5 text-white font-medium rounded-lg focus:ring-4 transition-all disabled:opacity-70 ${editingId ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-200' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'}`}
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? 'Update Member' : 'Add Member')}
                    </button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Current Team ({items.length})</h3>
                  </div>
                  
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No team members found. Add one to get started.</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <div key={item._id} className="p-4 hover:bg-gray-50 transition-colors flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            {item.avatar ? (
                              <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Users className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.role}</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {item.email && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{item.email}</span>}
                              {item.mobile && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">{item.mobile}</span>}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="text-gray-400 hover:text-blue-500 transition-colors p-2"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
            <p>Dashboard Overview Coming Soon</p>
          </div>
        )}
      </main>
    </div>
  );
}