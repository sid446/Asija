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
  Menu,
  Briefcase
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

type IndustryItem = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
};

type ServiceItem = {
  _id: string;
  title: string;
  translationKey: string;
  items: string[];
  insights?: boolean;
  imgSrc: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  subItems?: any;
  deepSubItems?: any;
};

type HierarchySubItem = {
  id: string;
  name: string;
  deepSubItems: { id: string; name: string }[];
};

type HierarchyItem = {
  id: string;
  name: string;
  subItems: HierarchySubItem[];
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('team');
  const [items, setItems] = useState<TeamItem[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
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

  const [industryFormData, setIndustryFormData] = useState({
    title: '',
    description: '',
    details: ''
  });

  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    translationKey: '',
    items: '', // comma separated
    insights: false,
    description: '',
    detailedDescription: '',
    benefits: '', // comma separated
    subItems: '', // JSON string
    deepSubItems: '' // JSON string
  });

  const [serviceHierarchy, setServiceHierarchy] = useState<HierarchyItem[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addHierarchyItem = () => {
    setServiceHierarchy([...serviceHierarchy, { id: generateId(), name: '', subItems: [] }]);
  };

  const updateHierarchyItem = (id: string, name: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => item.id === id ? { ...item, name } : item));
  };

  const removeHierarchyItem = (id: string) => {
    setServiceHierarchy(serviceHierarchy.filter(item => item.id !== id));
  };

  const addSubItem = (itemId: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: [...item.subItems, { id: generateId(), name: '', deepSubItems: [] }]
        };
      }
      return item;
    }));
  };

  const updateSubItem = (itemId: string, subItemId: string, name: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map(sub => sub.id === subItemId ? { ...sub, name } : sub)
        };
      }
      return item;
    }));
  };

  const removeSubItem = (itemId: string, subItemId: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.filter(sub => sub.id !== subItemId)
        };
      }
      return item;
    }));
  };

  const addDeepSubItem = (itemId: string, subItemId: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map(sub => {
            if (sub.id === subItemId) {
              return {
                ...sub,
                deepSubItems: [...sub.deepSubItems, { id: generateId(), name: '' }]
              };
            }
            return sub;
          })
        };
      }
      return item;
    }));
  };

  const updateDeepSubItem = (itemId: string, subItemId: string, deepId: string, name: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map(sub => {
            if (sub.id === subItemId) {
              return {
                ...sub,
                deepSubItems: sub.deepSubItems.map(deep => deep.id === deepId ? { ...deep, name } : deep)
              };
            }
            return sub;
          })
        };
      }
      return item;
    }));
  };

  const removeDeepSubItem = (itemId: string, subItemId: string, deepId: string) => {
    setServiceHierarchy(serviceHierarchy.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          subItems: item.subItems.map(sub => {
            if (sub.id === subItemId) {
              return {
                ...sub,
                deepSubItems: sub.deepSubItems.filter(deep => deep.id !== deepId)
              };
            }
            return sub;
          })
        };
      }
      return item;
    }));
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [industryImageFile, setIndustryImageFile] = useState<File | null>(null);
  const [serviceImageFile, setServiceImageFile] = useState<File | null>(null);

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

  const fetchIndustries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/industries');
      const data = await res.json();
      setIndustries(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'team') fetchItems();
    if (activeTab === 'industries') fetchIndustries();
    if (activeTab === 'services') fetchServices();
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIndustryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIndustryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({ ...prev, [name]: value }));
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

  const handleIndustryEdit = (item: IndustryItem) => {
    setEditingIndustryId(item._id);
    setIndustryFormData({
      title: item.title,
      description: item.description,
      details: item.details
    });
    setIndustryImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceEdit = (item: ServiceItem) => {
    setEditingServiceId(item._id);
    
    // Build hierarchy
    const hierarchy: HierarchyItem[] = (item.items || []).map(itemName => {
      const subItemsList = item.subItems?.[itemName] || [];
      
      const subItems: HierarchySubItem[] = subItemsList.map((subItemName: string) => {
        const deepList = item.deepSubItems?.[item.title]?.[itemName]?.[subItemName] || [];
        
        return {
          id: generateId(),
          name: subItemName,
          deepSubItems: deepList.map((deepName: string) => ({
            id: generateId(),
            name: deepName
          }))
        };
      });

      return {
        id: generateId(),
        name: itemName,
        subItems
      };
    });

    setServiceHierarchy(hierarchy);

    setServiceFormData({
      title: item.title || '',
      translationKey: item.translationKey || '',
      items: '', 
      insights: item.insights || false,
      description: item.description || '',
      detailedDescription: item.detailedDescription || '',
      benefits: item.benefits ? item.benefits.join(', ') : '',
      subItems: '',
      deepSubItems: ''
    });
    setServiceImageFile(null);
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

  const handleCancelIndustryEdit = () => {
    setEditingIndustryId(null);
    setIndustryFormData({
      title: '', description: '', details: ''
    });
    setIndustryImageFile(null);
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceFormData({
      title: '', translationKey: '', items: '', insights: false,
      description: '', detailedDescription: '', benefits: '',
      subItems: '', deepSubItems: ''
    });
    setServiceHierarchy([]);
    setServiceImageFile(null);
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

  const handleIndustryDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;
    
    try {
      const res = await fetch(`/api/admin/industries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Industry deleted successfully');
      fetchIndustries();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete industry');
    }
  };

  const handleServiceDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Service deleted successfully');
      fetchServices();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete service');
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

  const handleIndustrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      let image = '';

      if (industryImageFile) {
        const form = new FormData();
        form.append('file', industryImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: form,
        });

        if (!uploadRes.ok) {
          throw new Error('Image upload failed');
        }

        const uploadData = await uploadRes.json();
        image = uploadData.secure_url;
      }

      const url = editingIndustryId ? `/api/admin/industries/${editingIndustryId}` : '/api/admin/industries';
      const method = editingIndustryId ? 'PUT' : 'POST';
      
      const body: any = { ...industryFormData };
      if (image) body.image = image;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      setMessage(editingIndustryId ? 'Industry updated successfully' : 'Industry created successfully');
      handleCancelIndustryEdit(); // Reset form
      fetchIndustries();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      let imgSrc = '';

      if (serviceImageFile) {
        const form = new FormData();
        form.append('file', serviceImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: form,
        });

        if (!uploadRes.ok) {
          throw new Error('Image upload failed');
        }

        const uploadData = await uploadRes.json();
        imgSrc = uploadData.secure_url;
      }

      const url = editingServiceId ? `/api/admin/services/${editingServiceId}` : '/api/admin/services';
      const method = editingServiceId ? 'PUT' : 'POST';
      
      // Construct data from hierarchy
      const items = serviceHierarchy.map(h => h.name).filter(n => n.trim());
      const subItems: Record<string, string[]> = {};
      const deepSubItems: Record<string, Record<string, Record<string, string[]>>> = {};
      
      // Initialize deepSubItems with title key
      if (serviceFormData.title) {
          deepSubItems[serviceFormData.title] = {};
      }

      serviceHierarchy.forEach(h => {
        if (!h.name.trim()) return;
        
        // Sub Items
        const validSubItems = h.subItems.map(s => s.name).filter(n => n.trim());
        if (validSubItems.length > 0) {
          subItems[h.name] = validSubItems;
        }

        // Deep Sub Items
        h.subItems.forEach(s => {
          if (!s.name.trim()) return;
          const validDeep = s.deepSubItems.map(d => d.name).filter(n => n.trim());
          
          if (validDeep.length > 0) {
             if (!deepSubItems[serviceFormData.title]) deepSubItems[serviceFormData.title] = {};
             if (!deepSubItems[serviceFormData.title][h.name]) deepSubItems[serviceFormData.title][h.name] = {};
             deepSubItems[serviceFormData.title][h.name][s.name] = validDeep;
          }
        });
      });

      const body: any = {
        title: serviceFormData.title,
        translationKey: serviceFormData.translationKey,
        items: items,
        insights: serviceFormData.insights,
        description: serviceFormData.description,
        detailedDescription: serviceFormData.detailedDescription,
        benefits: serviceFormData.benefits.split(',').map(b => b.trim()).filter(b => b),
        subItems: subItems,
        deepSubItems: deepSubItems
      };

      if (imgSrc) body.imgSrc = imgSrc;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      setMessage(editingServiceId ? 'Service updated successfully' : 'Service created successfully');
      handleCancelServiceEdit(); // Reset form
      fetchServices();
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
              onClick={() => { setActiveTab('industries'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'industries' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Industries
            </button>
            <button 
              onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'services' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Services
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

          {activeTab === 'industries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Industries</h2>
                  <p className="text-gray-500 mt-1 text-sm">Manage industry sectors and content.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-6 sticky top-24 transition-all duration-300 hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-5 flex items-center justify-between text-gray-800">
                      <span className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${editingIndustryId ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {editingIndustryId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        {editingIndustryId ? 'Edit Industry' : 'Add New Industry'}
                      </span>
                      {editingIndustryId && (
                        <button onClick={handleCancelIndustryEdit} className="text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
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

                    <form onSubmit={handleIndustrySubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
                          <input 
                            name="title"
                            value={industryFormData.title} 
                            onChange={handleIndustryInputChange} 
                            placeholder="e.g. Banking and Finance" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Cover Image</label>
                          <div className="flex items-center justify-center w-full group">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all duration-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                  <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{industryImageFile ? <span className="text-blue-600">{industryImageFile.name}</span> : 'Click to upload image'}</p>
                              </div>
                              <input type="file" className="hidden" onChange={(e) => setIndustryImageFile(e.target.files?.[0] || null)} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Short Description</label>
                          <textarea 
                            name="description" 
                            value={industryFormData.description} 
                            onChange={handleIndustryInputChange} 
                            rows={3} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Detailed Content</label>
                          <textarea 
                            name="details" 
                            value={industryFormData.details} 
                            onChange={handleIndustryInputChange} 
                            rows={6} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:ring-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] ${editingIndustryId ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-200' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'}`}
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingIndustryId ? 'Update Industry' : 'Add Industry')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 order-1 xl:order-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center backdrop-blur-sm">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        Current Industries <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{industries.length}</span>
                      </h3>
                    </div>
                    
                    {loading ? (
                      <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p>Loading industries...</p>
                      </div>
                    ) : industries.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 bg-gray-50/30">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-900">No industries yet</p>
                        <p className="text-sm mt-1">Add your first industry using the form.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {industries.map((item) => (
                          <div key={item._id} className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors group">
                            <div className="flex items-start gap-4 sm:gap-6">
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-100 shrink-0 overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                                {item.image ? (
                                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                    <Briefcase className="w-8 h-8 opacity-50" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => handleIndustryEdit(item)}
                                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleIndustryDelete(item._id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="mt-3">
                                  <p className="text-xs text-gray-400 line-clamp-2">{item.details}</p>
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

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Services</h2>
                  <p className="text-gray-500 mt-1 text-sm">Manage service offerings and details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-6 sticky top-24 transition-all duration-300 hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-5 flex items-center justify-between text-gray-800">
                      <span className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${editingServiceId ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {editingServiceId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        {editingServiceId ? 'Edit Service' : 'Add New Service'}
                      </span>
                      {editingServiceId && (
                        <button onClick={handleCancelServiceEdit} className="text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
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

                    <form onSubmit={handleServiceSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
                          <input 
                            name="title"
                            value={serviceFormData.title} 
                            onChange={handleServiceInputChange} 
                            placeholder="e.g. Audit and Assurance" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Translation Key</label>
                          <input 
                            name="translationKey"
                            value={serviceFormData.translationKey} 
                            onChange={handleServiceInputChange} 
                            placeholder="e.g. services.auditAssurance" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Cover Image</label>
                          <div className="flex items-center justify-center w-full group">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all duration-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                  <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{serviceImageFile ? <span className="text-blue-600">{serviceImageFile.name}</span> : 'Click to upload image'}</p>
                              </div>
                              <input type="file" className="hidden" onChange={(e) => setServiceImageFile(e.target.files?.[0] || null)} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Short Description</label>
                          <textarea 
                            name="description" 
                            value={serviceFormData.description} 
                            onChange={handleServiceInputChange} 
                            rows={3} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Detailed Description</label>
                          <textarea 
                            name="detailedDescription" 
                            value={serviceFormData.detailedDescription} 
                            onChange={handleServiceInputChange} 
                            rows={4} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Service Hierarchy</label>
                          <div className="space-y-4">
                            {serviceHierarchy.map((item) => (
                              <div key={item.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateHierarchyItem(item.id, e.target.value)}
                                    placeholder="Item Name"
                                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <button type="button" onClick={() => removeHierarchyItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <div className="pl-6 space-y-3 border-l-2 border-gray-200 ml-2">
                                  {item.subItems.map((subItem) => (
                                    <div key={subItem.id} className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={subItem.name}
                                          onChange={(e) => updateSubItem(item.id, subItem.id, e.target.value)}
                                          placeholder="Sub Item Name"
                                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        />
                                        <button type="button" onClick={() => removeSubItem(item.id, subItem.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>

                                      <div className="pl-6 space-y-2 border-l-2 border-gray-200 ml-2">
                                        {subItem.deepSubItems.map((deepItem) => (
                                          <div key={deepItem.id} className="flex items-center gap-2">
                                            <input
                                              type="text"
                                              value={deepItem.name}
                                              onChange={(e) => updateDeepSubItem(item.id, subItem.id, deepItem.id, e.target.value)}
                                              placeholder="Deep Sub Item Name"
                                              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                            />
                                            <button type="button" onClick={() => removeDeepSubItem(item.id, subItem.id, deepItem.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => addDeepSubItem(item.id, subItem.id)}
                                          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" /> Add Deep Sub Item
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => addSubItem(item.id)}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                  >
                                    <Plus className="w-3 h-3" /> Add Sub Item
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={addHierarchyItem}
                              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                            >
                              <Plus className="w-4 h-4" /> Add Item
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Benefits (Comma Separated)</label>
                          <textarea 
                            name="benefits" 
                            value={serviceFormData.benefits} 
                            onChange={handleServiceInputChange} 
                            rows={3} 
                            placeholder="Benefit 1, Benefit 2, Benefit 3"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:ring-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] ${editingServiceId ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-200' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'}`}
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingServiceId ? 'Update Service' : 'Add Service')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 order-1 xl:order-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center backdrop-blur-sm">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        Current Services <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{services.length}</span>
                      </h3>
                    </div>
                    
                    {loading ? (
                      <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p>Loading services...</p>
                      </div>
                    ) : services.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 bg-gray-50/30">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-900">No services yet</p>
                        <p className="text-sm mt-1">Add your first service using the form.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {services.map((item) => (
                          <div key={item._id} className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors group">
                            <div className="flex items-start gap-4 sm:gap-6">
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-100 shrink-0 overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                                {item.imgSrc ? (
                                  <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                    <Briefcase className="w-8 h-8 opacity-50" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => handleServiceEdit(item)}
                                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleServiceDelete(item._id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="mt-3">
                                  <div className="flex flex-wrap gap-2">
                                    {item.items.slice(0, 3).map((sub, i) => (
                                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                        {sub}
                                      </span>
                                    ))}
                                    {item.items.length > 3 && (
                                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                                        +{item.items.length - 3} more
                                      </span>
                                    )}
                                  </div>
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