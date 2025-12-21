"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Save, 
  Image as ImageIcon,
  Loader2,
  Trash2,
  Pencil,
  X,
  Menu,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Home,
  Phone,
  Globe,
  RefreshCw,
  FileText,
  PlusCircle,
  MinusCircle,
  Filter,
  Lightbulb
} from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

type SectionItem = {
  title: string;
  description?: string;
  subItems?: string[];
};

type TeamItem = {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  qualifications?: SectionItem[];
  specialization?: SectionItem[];
  experience?: SectionItem[];
  membership?: string;
  associationYears?: string;
  mobile?: string;
  email?: string;
  description?: string;
  order?: number; // <-- Add this line
};

// Helper Component for Section Editing
const SectionEditor = ({ 
  items = [], 
  onChange, 
  label,
  allowSubItems = true
}: { 
  items: SectionItem[], 
  onChange: (items: SectionItem[]) => void, 
  label: string,
  allowSubItems?: boolean
}) => {
  const addItem = () => {
    onChange([...items, { title: '', description: '', subItems: [] }]);
  };

  const updateItem = (index: number, field: keyof SectionItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addSubItem = (itemIndex: number) => {
    const newItems = [...items];
    const currentSubItems = newItems[itemIndex].subItems || [];
    newItems[itemIndex].subItems = [...currentSubItems, ''];
    onChange(newItems);
  };

  const updateSubItem = (itemIndex: number, subIndex: number, value: string) => {
    const newItems = [...items];
    const subItems = [...(newItems[itemIndex].subItems || [])];
    subItems[subIndex] = value;
    newItems[itemIndex].subItems = subItems;
    onChange(newItems);
  };

  const removeSubItem = (itemIndex: number, subIndex: number) => {
    const newItems = [...items];
    const subItems = [...(newItems[itemIndex].subItems || [])];
    newItems[itemIndex].subItems = subItems.filter((_, i) => i !== subIndex);
    onChange(newItems);
  };

  return (
    <div className="space-y-4 border border-gray-200 rounded-xl p-4 bg-gray-50/50">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        <button 
          type="button" 
          onClick={addItem}
          className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
        >
          <PlusCircle className="w-3 h-3" /> Add Item
        </button>
      </div>
      
      {items.length === 0 && (
        <p className="text-xs text-gray-400 italic text-center py-2">No items added yet.</p>
      )}

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative group">
            <button 
              type="button" 
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              <div>
                <input 
                  placeholder="Title (e.g. Taxation & Compliance)"
                  value={item.title}
                  onChange={(e) => updateItem(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm font-medium border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent placeholder:font-normal"
                />
              </div>
              
              <div>
                <textarea 
                  placeholder="Description (optional)"
                  value={item.description || ''}
                  onChange={(e) => updateItem(idx, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm border border-gray-100 rounded-md focus:border-blue-500 outline-none bg-gray-50/30 resize-none"
                />
              </div>

              {/* Sub Items */}
              {allowSubItems && (
                <div className="pl-4 border-l-2 border-gray-100 space-y-2">
                  {item.subItems?.map((sub, subIdx) => (
                    <div key={subIdx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <input 
                        value={sub}
                        onChange={(e) => updateSubItem(idx, subIdx, e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-transparent hover:border-gray-200 focus:border-blue-500 rounded outline-none bg-transparent"
                        placeholder="Sub-item..."
                      />
                      <button 
                        type="button"
                        onClick={() => removeSubItem(idx, subIdx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => addSubItem(idx)}
                    className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Sub-item
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type IndustryItem = {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  order: number;
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
  order: number;
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

type AboutContentData = {
  _id?: string;
  title: string;
  quote: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  peopleTitle?: string;
  peopleDescription1?: string;
  peopleDescription2?: string;
  peopleStats?: { label: string; percentage: number }[];
  futureTitle?: string;
  futureSubtitle?: string;
  futureDescription1?: string;
  futureDescription2?: string;
};

type HeroContentData = {
  _id?: string;
  tagline: string;
  title: string;
  description: string;
  learnMore: string;
  contactUs: string;
  videoPoster: string;
  videoWebm: string;
  videoMp4: string;
  showFAQ: boolean;
};

type ContactContentData = {
  _id?: string;
  tagline: string;
  title: string;
  description: string;
  officeLocations: string;
  officeLocation1: string;
  officeLocation2: string;
  contactNo: string;
  phone1: string;
  phone2: string;
  emails: string;
  email1: string;
  email2: string;
  enquiryForm: string;
  imageAlt: string;
  image: string;
};

type GlobalServiceContentData = {
  _id?: string;
  heroTitle: string;
  heroDescription: string;
  heroVideoUrl: string;
  introTitle: string;
  introDescription1: string;
  introDescription2: string;
};

type GlobalRegionItem = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  order: number;
  heroImage?: string;
  heroTitle?: string;
  heroDescription?: string;
  contentHeading?: string;
  contentDescription?: string;
  features?: string[];
};

type GlobalOfferingItem = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

type AboutCardItem = {
  _id: string;
  image: string;
  title: string;
  description: string;
  buttonContent: string;
  link: string;
  order: number;
};

type FAQItem = {
  _id: string;
  question: string;
  answer: string;
};

type GalleryItem = {
  _id: string;
  title: string;
  date: string;
  category: string;
  year: string;
  description: string;
  thumbnail?: string;
  images: string[];
};

type EventCoverItem = {
  _id: string;
  type: string;
  image: string;
  order: number;
};

type PolicyItem = {
  excelUrl: any;
  policyType: string;
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'employee';
  subCategory?: string; // Allow any string value for custom departments
  pdfUrl?: string;
  order: number;
};

type DepartmentItem = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
};

type JobPostItem = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  isActive: boolean;
};

type LocationItem = {
  _id: string;
  label: string;
  title: string;
  address: string;
  phones: string[];
  email: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
};

const AboutTab = ({ showTimeline = true }: { showTimeline?: boolean }) => {
  // Timeline State
  const [timelineItems, setTimelineItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    year: '',
    heading: '',
    description: '',
    images: [] as string[],
    order: 0
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Content State
  const [aboutContent, setAboutContent] = useState<AboutContentData>({
    title: '',
    quote: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    peopleTitle: 'Our People – The Heart of Our Firm',
    peopleDescription1: 'Today, our firm proudly comprises more than 100 professionals, including qualified chartered accountants, semi-qualified managers, and skilled executives. This diverse and talented team represents a balanced mix of experience, technical capability, and youthful energy.',
    peopleDescription2: 'This inclusive workforce drives innovation, collaboration, and excellence across all our assignments.',
    peopleStats: [
      { label: 'Female Professionals', percentage: 42 },
      { label: 'Male Professionals', percentage: 58 }
    ],
    futureTitle: 'Looking Ahead',
    futureSubtitle: 'Our Vision for the Future',
    futureDescription1: 'As Asija & Associates LLP continues to expand its footprint across India and beyond, we remain deeply committed to our founding values of integrity, excellence, and professional independence. With a growing global presence, a strengthened leadership team, and a dynamic workforce, we are poised to embrace new opportunities in audit, advisory, compliance, systems, and development-sector consulting.',
    futureDescription2: 'Our journey ahead is guided by innovation, technology-driven solutions, and a steadfast focus on delivering measurable value to clients. We look forward with pride, purpose, and confidence as we continue to build a firm that stands for trust, quality, and global capability.'
  });
  const [contentMessage, setContentMessage] = useState<string | null>(null);
  const [contentSubmitting, setContentSubmitting] = useState(false);

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/about-timeline');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTimelineItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch timeline', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAboutContent = async () => {
    try {
      const res = await fetch('/api/admin/about-content', { cache: 'no-store' });
      const data = await res.json();
      if (data && !data.error) {
        setAboutContent(prev => ({
          ...prev,
          ...data,
          // Ensure nested objects/arrays are also merged if necessary, or default if missing in data
          peopleStats: data.peopleStats && data.peopleStats.length > 0 ? data.peopleStats : prev.peopleStats
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimeline();
    fetchAboutContent();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImages = [...formData.images];
      
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const form = new FormData();
          form.append('file', file);
          const res = await fetch('/api/upload', { method: 'POST', body: form });
          if (res.ok) {
            const data = await res.json();
            uploadedImages.push(data.secure_url);
          }
        }
      }

      const payload = { ...formData, images: uploadedImages };
      const url = editingId ? `/api/admin/about-timeline/${editingId}` : '/api/admin/about-timeline';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setFormData({ year: '', heading: '', description: '', images: [], order: 0 });
        setImageFiles([]);
        setEditingId(null);
        fetchTimeline();
      }
    } catch (error) {
      console.error('Error saving timeline item', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSubmit = async (e: React.FormEvent, sectionName: string) => {
    e.preventDefault();
    setContentSubmitting(true);
    try {
      const res = await fetch('/api/admin/about-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutContent),
      });
      
      if (res.ok) {
        setContentMessage(`${sectionName} updated successfully`);
        setTimeout(() => setContentMessage(null), 3000);
      } else {
        setContentMessage(`Failed to update ${sectionName}`);
      }
    } catch (err) {
      console.error(err);
      setContentMessage(`Error updating ${sectionName}`);
    } finally {
      setContentSubmitting(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutContent(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      year: item.year,
      heading: item.heading,
      description: item.description,
      images: item.images || [],
      order: item.order || 0
    });
    // Scroll to timeline form
    document.getElementById('timeline-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this timeline item?')) return;
    try {
      await fetch(`/api/admin/about-timeline/${id}`, { method: 'DELETE' });
      fetchTimeline();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleStatChange = (index: number, field: 'label' | 'percentage', value: string | number) => {
    const newStats = [...(aboutContent.peopleStats || [])];
    if (!newStats[index]) newStats[index] = { label: '', percentage: 0 };
    // @ts-ignore
    newStats[index] = { ...newStats[index], [field]: value };
    setAboutContent(prev => ({ ...prev, peopleStats: newStats }));
  };

  return (
    <div className="space-y-12">
      {/* Content Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6">About Page Content</h2>
        {contentMessage && (
          <div className={`p-4 rounded-xl text-sm mb-6 flex items-center gap-3 ${contentMessage.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            <div className={`w-2 h-2 rounded-full ${contentMessage.includes('success') ? 'bg-green-500' : 'bg-red-500'}`} />
            {contentMessage}
          </div>
        )}
        <div className="space-y-8">
          {/* About Content Form */}
          <form onSubmit={(e) => handleSectionSubmit(e, 'About Content')} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
              <input 
                name="title"
                value={aboutContent.title} 
                onChange={handleContentChange} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Quote</label>
              <textarea 
                name="quote"
                value={aboutContent.quote} 
                onChange={handleContentChange} 
                rows={2}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 1</label>
                <textarea 
                  name="description1"
                  value={aboutContent.description1} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 2</label>
                <textarea 
                  name="description2"
                  value={aboutContent.description2} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 3</label>
                <textarea 
                  name="description3"
                  value={aboutContent.description3} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 4</label>
                <textarea 
                  name="description4"
                  value={aboutContent.description4} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={contentSubmitting}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {contentSubmitting ? 'Saving...' : 'Update About Content'}
              </button>
            </div>
          </form>



          {/* Looking Ahead Section */}
          <form onSubmit={(e) => handleSectionSubmit(e, 'Looking Ahead Section')} className="space-y-6 border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Looking Ahead Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Main Title</label>
                <input 
                  name="futureTitle"
                  value={aboutContent.futureTitle || ''} 
                  onChange={handleContentChange} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Subtitle</label>
                <input 
                  name="futureSubtitle"
                  value={aboutContent.futureSubtitle || ''} 
                  onChange={handleContentChange} 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 1</label>
                <textarea 
                  name="futureDescription1"
                  value={aboutContent.futureDescription1 || ''} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description 2</label>
                <textarea 
                  name="futureDescription2"
                  value={aboutContent.futureDescription2 || ''} 
                  onChange={handleContentChange} 
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={contentSubmitting}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {contentSubmitting ? 'Saving...' : 'Update Future Section'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showTimeline && (
        <>
      <hr className="border-gray-200" />

      {/* Timeline Section */}
      <div id="timeline-form" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Timeline Item' : 'Add Timeline Item'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year / Title</label>
              <input
                type="text"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. 1986 – The Beginning"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={e => setFormData({ ...formData, heading: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g. Foundation by CA Uttam Chand Asija"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
            />
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img src={img} alt="" className="w-full h-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingId ? 'Update Item' : 'Add Item')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ year: '', heading: '', description: '', images: [], order: 0 });
                  setImageFiles([]);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {timelineItems.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{item.year}</h3>
              <p className="text-blue-600 font-medium">{item.heading}</p>
              <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
              {item.images && item.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {item.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('team');
  const [globalServicesSubTab, setGlobalServicesSubTab] = useState('content');
  const [gallerySubTab, setGallerySubTab] = useState('events');
  const [items, setItems] = useState<TeamItem[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [aboutCards, setAboutCards] = useState<AboutCardItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [eventCovers, setEventCovers] = useState<EventCoverItem[]>([]);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [jobs, setJobs] = useState<JobPostItem[]>([]);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [policyFilter, setPolicyFilter] = useState('all');
  const [showBulkOrderModal, setShowBulkOrderModal] = useState(false);
  const [bulkOrderData, setBulkOrderData] = useState<{[key: string]: number}>({});
  const [globalServiceContent, setGlobalServiceContent] = useState<GlobalServiceContentData | null>(null);
  const [globalRegions, setGlobalRegions] = useState<GlobalRegionItem[]>([]);
  const [globalOfferings, setGlobalOfferings] = useState<GlobalOfferingItem[]>([]);
  const [globalOfferingsError, setGlobalOfferingsError] = useState<string | null>(null);
  const [heroContent, setHeroContent] = useState<HeroContentData | null>(null);
  const [contactContent, setContactContent] = useState<ContactContentData | null>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingAboutCardId, setEditingAboutCardId] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingEventCoverId, setEditingEventCoverId] = useState<string | null>(null);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingGlobalRegionId, setEditingGlobalRegionId] = useState<string | null>(null);
  const [editingGlobalOfferingId, setEditingGlobalOfferingId] = useState<string | null>(null);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [isEditingDepartmentName, setIsEditingDepartmentName] = useState(false);
  const [editingDepartmentName, setEditingDepartmentName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);

  // Form State
  const [globalRegionFormData, setGlobalRegionFormData] = useState({ 
    name: '', 
    slug: '',
    href: '', 
    order: 0,
    heroTitle: '',
    heroDescription: '',
    contentHeading: '',
    contentDescription: '',
    features: '' // comma separated for form
  });
  const [globalRegionHeroImageFile, setGlobalRegionHeroImageFile] = useState<File | null>(null);
  const [locationFormData, setLocationFormData] = useState({
    label: '',
    title: '',
    address: '',
    phones: '',
    email: '',
    lat: 0,
    lng: 0,
    googleMapsUrl: ''
  });
  const [isExtractingCoords, setIsExtractingCoords] = useState(false);
  const [globalOfferingFormData, setGlobalOfferingFormData] = useState({ title: '', description: '', icon: 'ShieldCheck', order: 0 });
  const [policyFormData, setPolicyFormData] = useState<{
    customSubCategory?: string;
    title: string;
    content: string;
    category: string;
    subCategory?: string;
    pdfUrl?: string;
    excelUrl?: string;
    policyType?: string;
    order: number;
  }>({ customSubCategory: '', title: '', content: '', category: 'general', subCategory: '', pdfUrl: '', excelUrl: '', policyType: 'text', order: 0 });
  const [departmentFormData, setDepartmentFormData] = useState({
    slug: '',
    name: '',
    description: '',
    icon: '',
    order: 0
  });
  const [jobFormData, setJobFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '' // comma separated
  });
  const [globalServiceContentFormData, setGlobalServiceContentFormData] = useState({
    heroTitle: '', heroDescription: '', heroVideoUrl: '',
    introTitle: '', introDescription1: '', introDescription2: ''
  });
  const [globalRegionImageFile, setGlobalRegionImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedin: '',
    qualifications: [] as SectionItem[],
    specialization: [] as SectionItem[],
    experience: [] as SectionItem[],
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: '',
    order: 0
  });

  const [industryFormData, setIndustryFormData] = useState({
    title: '',
    description: '',
    details: '',
    order: 0
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
    deepSubItems: '', // JSON string
    order: 0
  });

  const [aboutCardFormData, setAboutCardFormData] = useState({
    title: '',
    description: '',
    buttonContent: '',
    link: '/about',
    order: 0
  });

  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: ''
  });

  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    date: '',
    category: 'Event',
    year: new Date().getFullYear().toString(),
    description: '',
    thumbnail: '',
    images: [] as string[]
  });

  const [eventCoverFormData, setEventCoverFormData] = useState({
    type: '',
    image: '',
    order: 0
  });

  const [heroFormData, setHeroFormData] = useState({
    tagline: '',
    title: '',
    description: '',
    learnMore: '',
    contactUs: '',
    videoPoster: '',
    videoWebm: '',
    videoMp4: '',
    showFAQ: true
  });


  const [insightFormData, setInsightFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    category: 'General',
    published: true,
    featured: false
  });
  const [editingInsightId, setEditingInsightId] = useState<string | null>(null);

  const [contactFormData, setContactFormData] = useState({
    tagline: '',
    title: '',
    description: '',
    officeLocations: '',
    officeLocation1: '',
    officeLocation2: '',
    contactNo: '',
    phone1: '',
    phone2: '',
    emails: '',
    email1: '',
    email2: '',
    enquiryForm: '',
    imageAlt: '',
    image: ''
  });

  const [serviceHierarchy, setServiceHierarchy] = useState<HierarchyItem[]>([]);



  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hero-content');
      const data = await res.json();
      if (data && !data.error) {
        setHeroContent(data);
        setHeroFormData({
          tagline: data.tagline || '',
          title: data.title || '',
          description: data.description || '',
          learnMore: data.learnMore || '',
          contactUs: data.contactUs || '',
          videoPoster: data.videoPoster || '',
          videoWebm: data.videoWebm || '',
          videoMp4: data.videoMp4 || '',
          showFAQ: Boolean(data.showFAQ)
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : value;
    setHeroFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleHeroContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/hero-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroFormData),
      });

      if (res.ok) {
        setMessage('Hero content updated successfully!');
        fetchHeroContent();
      } else {
        setMessage('Failed to update hero content.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };



  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faq');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFaqs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        setGallery(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventCovers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/event-covers');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEventCovers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/career/jobs');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const requirementsArray = jobFormData.requirements.split(',').map(r => r.trim()).filter(r => r);
      
      const payload = {
        ...jobFormData,
        requirements: requirementsArray
      };

      const url = editingJobId 
        ? `/api/career/jobs/${editingJobId}` 
        : '/api/career/jobs';
      
      const method = editingJobId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(editingJobId ? 'Job updated successfully!' : 'Job added successfully!');
        setJobFormData({
          title: '',
          department: '',
          location: '',
          type: 'Full-time',
          description: '',
          requirements: ''
        });
        setEditingJobId(null);
        fetchJobs();
      } else {
        setMessage(data.error || 'Failed to save job.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job post?')) return;
    
    try {
      const res = await fetch(`/api/career/jobs/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();

      if (data.success) {
        setMessage('Job deleted successfully');
        fetchJobs();
      } else {
        setMessage(data.error || 'Failed to delete job');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error deleting job');
    }
  };

  const handleEditJob = (job: JobPostItem) => {
    setEditingJobId(job._id);
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const url = editingFaqId 
        ? `/api/admin/faq/${editingFaqId}` 
        : '/api/admin/faq';
      
      const method = editingFaqId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqFormData),
      });

      if (res.ok) {
        setMessage(editingFaqId ? 'FAQ updated successfully!' : 'FAQ added successfully!');
        setFaqFormData({ question: '', answer: '' });
        setEditingFaqId(null);
        fetchFaqs();
      } else {
        setMessage('Failed to save FAQ.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const res = await fetch(`/api/admin/faq/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('FAQ deleted successfully!');
        fetchFaqs();
      } else {
        setMessage('Failed to delete FAQ.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let thumbnailUrl = galleryFormData.thumbnail;
      const uploadedImages: string[] = [...galleryFormData.images];

      // Upload Thumbnail
      if (galleryThumbnailFile) {
        const form = new FormData();
        form.append('file', galleryThumbnailFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          thumbnailUrl = uploadData.secure_url;
        }
      }

      // Upload Gallery Images
      if (galleryImageFiles.length > 0) {
        for (const file of galleryImageFiles) {
          const form = new FormData();
          form.append('file', file);

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: form,
          });

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            uploadedImages.push(uploadData.secure_url);
          }
        }
      }

      const url = editingGalleryId 
        ? `/api/admin/gallery/${editingGalleryId}` 
        : '/api/admin/gallery';
      
      const method = editingGalleryId ? 'PUT' : 'POST';

      const body = { ...galleryFormData, thumbnail: thumbnailUrl, images: uploadedImages };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(editingGalleryId ? 'Gallery event updated successfully!' : 'Gallery event added successfully!');
        setGalleryFormData({ 
          title: '', 
          date: '', 
          category: 'Event',
          year: new Date().getFullYear().toString(),
          description: '', 
          thumbnail: '', 
          images: [] 
        });
        setGalleryImageFiles([]);
        setGalleryThumbnailFile(null);
        setEditingGalleryId(null);
        fetchGallery();
      } else {
        setMessage('Failed to save gallery event.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Gallery event deleted successfully!');
        fetchGallery();
      } else {
        setMessage('Failed to delete gallery event.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    }
  };

  const handleEventCoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = eventCoverFormData.image;

      // Upload Image
      if (eventCoverImageFile) {
        const form = new FormData();
        form.append('file', eventCoverImageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.secure_url;
        }
      }

      const url = editingEventCoverId 
        ? `/api/admin/event-covers/${editingEventCoverId}` 
        : '/api/admin/event-covers';
      
      const method = editingEventCoverId ? 'PUT' : 'POST';

      const body = { ...eventCoverFormData, image: imageUrl };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(editingEventCoverId ? 'Event cover updated successfully!' : 'Event cover added/updated successfully!');
        setEventCoverFormData({ 
          type: '',
          image: '',
          order: 0
        });
        setEventCoverImageFile(null);
        setEditingEventCoverId(null);
        fetchEventCovers();
      } else {
        setMessage('Failed to save event cover.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEventCover = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event cover?')) return;

    try {
      const res = await fetch(`/api/admin/event-covers/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Event cover deleted successfully!');
        fetchEventCovers();
      } else {
        setMessage('Failed to delete event cover.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    }
  };

  const fetchContactContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact-content');
      const data = await res.json();
      if (data && !data.error) {
        setContactContent(data);
        setContactFormData({
          tagline: data.tagline || '',
          title: data.title || '',
          description: data.description || '',
          officeLocations: data.officeLocations || '',
          officeLocation1: data.officeLocation1 || '',
          officeLocation2: data.officeLocation2 || '',
          contactNo: data.contactNo || '',
          phone1: data.phone1 || '',
          phone2: data.phone2 || '',
          emails: data.emails || '',
          email1: data.email1 || '',
          email2: data.email2 || '',
          enquiryForm: data.enquiryForm || '',
          imageAlt: data.imageAlt || '',
          image: data.image || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/contact-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData),
      });

      if (res.ok) {
        setMessage('Contact content updated successfully!');
        fetchContactContent();
      } else {
        setMessage('Failed to update contact content.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/admin/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const handleSaveInsight = async () => {
    try {
      let imageUrl = insightFormData.image || '';
      if (insightImageFile) {
        const form = new FormData();
        form.append('file', insightImageFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: form,
        });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }
      const body = { ...insightFormData, image: imageUrl };
      let response;
      if (editingInsightId) {
        response = await fetch(`/api/admin/insights/${editingInsightId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        response = await fetch('/api/admin/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      if (response.ok) {
        alert(editingInsightId ? 'Insight updated successfully!' : 'Insight saved successfully!');
        setInsightFormData({
          title: '',
          description: '',
          content: '',
          image: '',
          category: 'General',
          published: true,
          featured: false
        });
        setInsightImageFile(null);
        setEditingInsightId(null);
        fetchInsights();
      } else {
        alert('Failed to save insight');
      }
    } catch (error) {
      console.error('Error saving insight:', error);
      alert('Error saving insight');
    }
  };

  const handleEditInsight = (insight: any) => {
    setEditingInsightId(insight._id);
    setInsightFormData({
      title: insight.title || '',
      description: insight.description || '',
      content: insight.content || '',
      image: insight.image || '',
      category: insight.category || 'General',
      published: insight.published ?? true,
      featured: insight.featured ?? false
    });
    setInsightImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditInsight = () => {
    setEditingInsightId(null);
    setInsightFormData({
      title: '',
      description: '',
      content: '',
      image: '',
      category: 'General',
      published: true,
      featured: false
    });
    setInsightImageFile(null);
  };

  const handleDeleteInsight = async (id: string) => {
    console.log('Admin deleting insight ID:', id);
    if (!confirm('Are you sure you want to delete this insight?')) return;
    try {
      const response = await fetch(`/api/admin/insights/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Insight deleted successfully!');
        fetchInsights();
      } else {
        alert('Failed to delete insight');
      }
    } catch (error) {
      console.error('Error deleting insight:', error);
      alert('Error deleting insight');
    }
  };

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
  const [aboutCardImageFile, setAboutCardImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [galleryThumbnailFile, setGalleryThumbnailFile] = useState<File | null>(null);
  const [eventCoverImageFile, setEventCoverImageFile] = useState<File | null>(null);
  const [insightImageFile, setInsightImageFile] = useState<File | null>(null);

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
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAboutCards = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/about-cards');
      const data = await res.json();
      setAboutCards(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalServiceContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/global-service-content');
      const data = await res.json();
      if (data && !data.error) {
        setGlobalServiceContent(data);
        setGlobalServiceContentFormData({
          heroTitle: data.heroTitle || '',
          heroDescription: data.heroDescription || '',
          heroVideoUrl: data.heroVideoUrl || '',
          introTitle: data.introTitle || '',
          introDescription1: data.introDescription1 || '',
          introDescription2: data.introDescription2 || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalRegions = async () => {
    try {
      const res = await fetch('/api/admin/global-regions');
      const data = await res.json();
      setGlobalRegions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/locations');
      const data = await res.json();
      if (Array.isArray(data)) {
        setLocations(data);
      }
    } catch (error) {
      console.error('Failed to fetch locations', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingLocationId 
        ? `/api/admin/locations/${editingLocationId}`
        : '/api/admin/locations';
      
      const method = editingLocationId ? 'PUT' : 'POST';
      
      const payload = {
        ...locationFormData,
        phones: locationFormData.phones.split(',').map(p => p.trim()).filter(Boolean)
      };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(editingLocationId ? 'Location updated successfully' : 'Location added successfully');
        setEditingLocationId(null);
        setLocationFormData({
          label: '',
          title: '',
          address: '',
          phones: '',
          email: '',
          lat: 0,
          lng: 0,
          googleMapsUrl: ''
        });
        fetchLocations();
      }
    } catch (error) {
      console.error('Failed to save location', error);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    try {
      const res = await fetch(`/api/admin/locations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessage('Location deleted successfully');
        fetchLocations();
      }
    } catch (error) {
      console.error('Failed to delete location', error);
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const fetchGlobalOfferings = async () => {
    try {
      setGlobalOfferingsError(null);
      console.log('Fetching global offerings...');
      const res = await fetch('/api/admin/global-offerings');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log('Fetched global offerings:', data);
      setGlobalOfferings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching global offerings:', err);
      setGlobalOfferingsError('Failed to load offerings.');
    }
  };

  const fetchPolicies = async () => {
    try {
      const res = await fetch('/api/admin/policies');
      const data = await res.json();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/admin/departments');
      const data = await res.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'team') fetchItems();
    if (activeTab === 'industries') fetchIndustries();
    if (activeTab === 'services') fetchServices();

    if (activeTab === 'about-cards') fetchAboutCards();
    if (activeTab === 'hero-content') fetchHeroContent();
    if (activeTab === 'contact-content') fetchContactContent();
    if (activeTab === 'insights') fetchInsights();
    if (activeTab === 'faq') fetchFaqs();
    if (activeTab === 'gallery') {
      fetchGallery();
      fetchEventCovers();
    }
    if (activeTab === 'locations') fetchLocations();
    if (activeTab === 'policies') {
      fetchPolicies();
      fetchDepartments();
    }
    if (activeTab === 'jobs') fetchJobs();
    if (activeTab === 'global-services') {
      fetchGlobalServiceContent();
      fetchGlobalRegions();
      fetchGlobalOfferings();
    }
  }, [activeTab]);

  // Gallery categories for event covers
  const galleryCategories = [
    'Milestone and Achievement',
    'Foundation',
    'Seminar',
    'Annual Day',
    'Event',
    'Festival'
  ];

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

  const handleAboutCardInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutCardFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: TeamItem) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      linkedin: item.linkedin || '',
      qualifications: Array.isArray(item.qualifications) ? item.qualifications : [],
      specialization: Array.isArray(item.specialization) ? item.specialization : [],
      experience: Array.isArray(item.experience) ? item.experience : [],
      membership: item.membership || '',
      associationYears: item.associationYears || '',
      mobile: item.mobile || '',
      email: item.email || '',
      description: item.description || '',
      order: typeof item.order === 'number' ? item.order : 0
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIndustryEdit = (item: IndustryItem) => {
    setEditingIndustryId(item._id);
    setIndustryFormData({
      title: item.title,
      description: item.description,
      details: item.details,
      order: item.order || 0
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
      deepSubItems: '',
      order: item.order || 0
    });
    setServiceImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '', role: '', linkedin: '', qualifications: [], 
      specialization: [], experience: [], membership: '', 
      associationYears: '', mobile: '', email: '', description: '', order: 0
    });
    setImageFile(null);
  };

  const handleCancelIndustryEdit = () => {
    setEditingIndustryId(null);
    setIndustryFormData({
      title: '', description: '', details: '', order: 0
    });
    setIndustryImageFile(null);
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceFormData({
      title: '', translationKey: '', items: '', insights: false,
      description: '', detailedDescription: '', benefits: '',
      subItems: '', deepSubItems: '', order: 0
    });
    setServiceHierarchy([]);
    setServiceImageFile(null);
  };

  const handleCancelAboutCardEdit = () => {
    setEditingAboutCardId(null);
    setAboutCardFormData({
      title: '', description: '', buttonContent: '', link: '/about', order: 0
    });
    setAboutCardImageFile(null);
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

  const handleAboutCardEdit = (item: AboutCardItem) => {
    setEditingAboutCardId(item._id);
    setAboutCardFormData({
      title: item.title,
      description: item.description,
      buttonContent: item.buttonContent,
      link: item.link,
      order: item.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutCardDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    
    try {
      const res = await fetch(`/api/admin/about-cards/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Card deleted successfully');
      fetchAboutCards();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete card');
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
        deepSubItems: deepSubItems,
        order: serviceFormData.order
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

  const handleAboutCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      let image = '';

      if (aboutCardImageFile) {
        const form = new FormData();
        form.append('file', aboutCardImageFile);

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

      const url = editingAboutCardId ? `/api/admin/about-cards/${editingAboutCardId}` : '/api/admin/about-cards';
      const method = editingAboutCardId ? 'PUT' : 'POST';
      
      const body: any = { ...aboutCardFormData };
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

      setMessage(editingAboutCardId ? 'Card updated successfully' : 'Card created successfully');
      handleCancelAboutCardEdit(); // Reset form
      fetchAboutCards();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGlobalServiceContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGlobalServiceContentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGlobalServiceContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/global-service-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globalServiceContentFormData),
      });

      if (res.ok) {
        setMessage('Global Service content updated successfully!');
        fetchGlobalServiceContent();
      } else {
        setMessage('Failed to update content.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGlobalRegionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGlobalRegionFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGlobalRegionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let image = '';
      if (globalRegionImageFile) {
        const form = new FormData();
        form.append('file', globalRegionImageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        image = uploadData.secure_url;
      }

      let heroImage = '';
      if (globalRegionHeroImageFile) {
        const form = new FormData();
        form.append('file', globalRegionHeroImageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
        if (!uploadRes.ok) throw new Error('Hero Image upload failed');
        const uploadData = await uploadRes.json();
        heroImage = uploadData.secure_url;
      }

      const url = editingGlobalRegionId ? `/api/admin/global-regions/${editingGlobalRegionId}` : '/api/admin/global-regions';
      const method = editingGlobalRegionId ? 'PUT' : 'POST';
      
      const featuresArray = globalRegionFormData.features.split(',').map(f => f.trim()).filter(f => f);

      const body: any = { 
        ...globalRegionFormData,
        features: featuresArray
      };
      if (image) body.image = image;
      if (heroImage) body.heroImage = heroImage;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(editingGlobalRegionId ? 'Region updated successfully!' : 'Region added successfully!');
        setGlobalRegionFormData({ 
          name: '', slug: '', href: '', order: 0,
          heroTitle: '', heroDescription: '',
          contentHeading: '', contentDescription: '',
          features: ''
        });
        setGlobalRegionImageFile(null);
        setGlobalRegionHeroImageFile(null);
        setEditingGlobalRegionId(null);
        fetchGlobalRegions();
      } else {
        setMessage('Failed to save region.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGlobalRegionEdit = (item: GlobalRegionItem) => {
    setEditingGlobalRegionId(item._id);
    setGlobalRegionFormData({
      name: item.name,
      slug: item.slug || '',
      href: item.href,
      order: item.order,
      heroTitle: item.heroTitle || '',
      heroDescription: item.heroDescription || '',
      contentHeading: item.contentHeading || '',
      contentDescription: item.contentDescription || '',
      features: item.features ? item.features.join(', ') : ''
    });
    setGlobalRegionImageFile(null);
    setGlobalRegionHeroImageFile(null);
  };

  const handleGlobalRegionDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/global-regions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Region deleted successfully!');
        fetchGlobalRegions();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGlobalOfferingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGlobalOfferingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGlobalOfferingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const url = editingGlobalOfferingId ? `/api/admin/global-offerings/${editingGlobalOfferingId}` : '/api/admin/global-offerings';
      const method = editingGlobalOfferingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globalOfferingFormData),
      });

      if (res.ok) {
        setMessage(editingGlobalOfferingId ? 'Offering updated successfully!' : 'Offering added successfully!');
        setGlobalOfferingFormData({ title: '', description: '', icon: 'ShieldCheck', order: 0 });
        setEditingGlobalOfferingId(null);
        fetchGlobalOfferings();
      } else {
        setMessage('Failed to save offering.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGlobalOfferingEdit = (item: GlobalOfferingItem) => {
    setEditingGlobalOfferingId(item._id);
    setGlobalOfferingFormData({ title: item.title, description: item.description, icon: item.icon, order: item.order });
  };

  const handleGlobalOfferingDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/global-offerings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Offering deleted successfully!');
        fetchGlobalOfferings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPolicyFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePolicySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      // Prepare the data for submission
      let submitData = { ...policyFormData };

      // Handle custom department
      if (submitData.subCategory === 'OTHER' && submitData.customSubCategory) {
        submitData.subCategory = submitData.customSubCategory.trim();
      }

      // Remove the customSubCategory field as it's not part of the database schema
      delete submitData.customSubCategory;

      const url = editingPolicyId ? `/api/admin/policies/${editingPolicyId}` : '/api/admin/policies';
      const method = editingPolicyId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        setMessage(editingPolicyId ? 'Policy updated successfully!' : 'Policy added successfully!');
        setPolicyFormData({ customSubCategory: '', title: '', content: '', category: 'general', subCategory: '', pdfUrl: '', excelUrl: '', policyType: 'text', order: 0 });
        setEditingPolicyId(null);
        fetchPolicies();
      } else {
        setMessage('Failed to save policy.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePolicyEdit = (item: PolicyItem) => {
    setEditingPolicyId(item._id);

    // Check if the subCategory exists in departments
    const deptExists = departments.some(dept => dept.slug === item.subCategory);

    setPolicyFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      subCategory: deptExists ? item.subCategory : 'OTHER',
      customSubCategory: deptExists ? '' : (item.subCategory || ''),
      pdfUrl: item.pdfUrl || '',
      excelUrl: item.excelUrl || '',
      policyType: item.policyType || 'text',
      order: item.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/policies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Policy deleted successfully!');
        fetchPolicies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePolicyMoveUp = async (policyId: string) => {
    try {
      const res = await fetch(`/api/admin/policies/${policyId}/move-up`, { method: 'PUT' });
      if (res.ok) {
        setMessage('Policy moved up successfully!');
        fetchPolicies();
      } else {
        setMessage('Failed to move policy up.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while moving the policy.');
    }
  };

  const handlePolicyMoveDown = async (policyId: string) => {
    try {
      const res = await fetch(`/api/admin/policies/${policyId}/move-down`, { method: 'PUT' });
      if (res.ok) {
        setMessage('Policy moved down successfully!');
        fetchPolicies();
      } else {
        setMessage('Failed to move policy down.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while moving the policy.');
    }
  };

  const handleResetOrder = async () => {
    if (!confirm('This will reset all policy orders sequentially (0, 1, 2, ...). Continue?')) return;

    try {
      const res = await fetch('/api/admin/policies/reset-order', { method: 'PUT' });
      if (res.ok) {
        setMessage('Policy orders reset successfully!');
        fetchPolicies();
      } else {
        setMessage('Failed to reset policy orders.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while resetting orders.');
    }
  };

  const handleBulkOrderUpdate = async () => {
    try {
      const updates = Object.entries(bulkOrderData).map(([policyId, order]) => ({
        id: policyId,
        order
      }));

      if (updates.length === 0) {
        setMessage('No changes to update.');
        return;
      }

      const res = await fetch('/api/admin/policies/bulk-update-order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (res.ok) {
        setMessage('Policy orders updated successfully!');
        setShowBulkOrderModal(false);
        setBulkOrderData({});
        fetchPolicies();
      } else {
        setMessage('Failed to update policy orders.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while updating orders.');
    }
  };

  function setShowForm(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

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
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'about' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <FileText className="w-5 h-5 mr-3" />
              About Page
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
              onClick={() => { setActiveTab('global-services'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'global-services' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Globe className="w-5 h-5 mr-3" />
              Global Services
            </button>
            <button 
              onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'gallery' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              Gallery
            </button>
            <button 
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'jobs' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Career / Jobs
            </button>
            <button 
              onClick={() => { setActiveTab('locations'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'locations' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Globe className="w-5 h-5 mr-3" />
              Locations
            </button>

            <div>
              <button 
                onClick={() => setHomeMenuOpen(!homeMenuOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
              >
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-3" />
                  Home Page
                </div>
                {homeMenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {homeMenuOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button 
                    onClick={() => { setActiveTab('hero-content'); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'hero-content' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Hero Content
                  </button>
                  <button 
                    onClick={() => { setActiveTab('about-content'); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'about-content' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    About Content
                  </button>
                  <button 
                    onClick={() => { setActiveTab('about-cards'); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'about-cards' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <ImageIcon className="w-4 h-4 mr-3" />
                    About Cards
                  </button>
                  <button 
                    onClick={() => { setActiveTab('contact-content'); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'contact-content' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <Phone className="w-4 h-4 mr-3" />
                    Contact Content
                  </button>
                  <button 
                    onClick={() => { setActiveTab('faq'); setMobileMenuOpen(false); }}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'faq' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    FAQ
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => { setActiveTab('insights'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'insights' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Lightbulb className="w-5 h-5 mr-3" />
              Insights
            </button>
            <button 
              onClick={() => { setActiveTab('policies'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === 'policies' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Policies
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
                          <SectionEditor 
                            label="Education & Certifications"
                            items={formData.qualifications}
                            onChange={(items) => setFormData(prev => ({ ...prev, qualifications: items }))}
                            allowSubItems={false}
                          />
                        </div>

                        <div>
                          <SectionEditor 
                            label="Skills & Expertise"
                            items={formData.specialization}
                            onChange={(items) => setFormData(prev => ({ ...prev, specialization: items }))}
                            allowSubItems={false}
                          />
                        </div>

                        <div>
                          <SectionEditor 
                            label="Professional Experience"
                            items={formData.experience}
                            onChange={(items) => setFormData(prev => ({ ...prev, experience: items }))}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Assoc. Years</label>
                            <input name="associationYears" value={formData.associationYears} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Membership No.</label>
                            <input name="membership" value={formData.membership} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Order</label>
                            <input
                              type="number"
                              name="order"
                              value={formData.order}
                              onChange={e => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                              min={0}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Background / Bio</label>
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
                        {[...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((item) => (
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

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Display Order</label>
                          <input 
                            type="number"
                            name="order"
                            value={industryFormData.order} 
                            onChange={handleIndustryInputChange} 
                            placeholder="0" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            min="0"
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

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Display Order</label>
                          <input 
                            type="number"
                            name="order"
                            value={serviceFormData.order} 
                            onChange={handleServiceInputChange} 
                            placeholder="0" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            min="0"
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



          {(activeTab === 'about' || activeTab === 'about-content') && <AboutTab showTimeline={activeTab === 'about'} />}

          {activeTab === 'about-cards' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">About Cards</h2>
                  <p className="text-gray-500 mt-1 text-sm">Manage the cards displayed on the About page.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:p-6 sticky top-24 transition-all duration-300 hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-5 flex items-center justify-between text-gray-800">
                      <span className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${editingAboutCardId ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {editingAboutCardId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        {editingAboutCardId ? 'Edit Card' : 'Add New Card'}
                      </span>
                      {editingAboutCardId && (
                        <button onClick={handleCancelAboutCardEdit} className="text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
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

                    <form onSubmit={handleAboutCardSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Title</label>
                          <input 
                            name="title"
                            value={aboutCardFormData.title} 
                            onChange={handleAboutCardInputChange} 
                            placeholder="e.g. Vision & Mission" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Card Image</label>
                          <div className="flex items-center justify-center w-full group">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all duration-300">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                  <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{aboutCardImageFile ? <span className="text-blue-600">{aboutCardImageFile.name}</span> : 'Click to upload image'}</p>
                              </div>
                              <input type="file" className="hidden" onChange={(e) => setAboutCardImageFile(e.target.files?.[0] || null)} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                          <textarea 
                            name="description" 
                            value={aboutCardFormData.description} 
                            onChange={handleAboutCardInputChange} 
                            rows={4} 
                            placeholder="Card description..."
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Button Text</label>
                            <input 
                              name="buttonContent" 
                              value={aboutCardFormData.buttonContent} 
                              onChange={handleAboutCardInputChange} 
                              placeholder="Learn More"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Link</label>
                            <input 
                              name="link" 
                              value={aboutCardFormData.link} 
                              onChange={handleAboutCardInputChange} 
                              placeholder="/about"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Order</label>
                          <input 
                            type="number"
                            name="order" 
                            value={aboutCardFormData.order} 
                            onChange={handleAboutCardInputChange} 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:ring-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] ${editingAboutCardId ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-200' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200'}`}
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingAboutCardId ? 'Update Card' : 'Add Card')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 order-1 xl:order-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center backdrop-blur-sm">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-blue-500" />
                        Current Cards <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{aboutCards.length}</span>
                      </h3>
                    </div>
                    
                    {loading ? (
                      <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p>Loading cards...</p>
                      </div>
                    ) : aboutCards.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 bg-gray-50/30">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-900">No cards yet</p>
                        <p className="text-sm mt-1">Add your first card using the form.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {aboutCards.map((item) => (
                          <div key={item._id} className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors group">
                            <div className="flex items-start gap-4 sm:gap-6">
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-100 shrink-0 overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
                                {item.image ? (
                                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                    <ImageIcon className="w-8 h-8 opacity-50" />
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
                                      onClick={() => handleAboutCardEdit(item)}
                                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleAboutCardDelete(item._id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Order: {item.order}</span>
                                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Button: {item.buttonContent}</span>
                                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Link: {item.link}</span>
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

          {activeTab === 'hero-content' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Hero Section Content</h2>
                  </div>
                  <p className="text-gray-500 ml-12">Manage the main hero section text and video links.</p>
                </div>

                <div className="p-6 sm:p-8 bg-gray-50/50">
                  <form onSubmit={handleHeroContentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                        <input
                          type="text"
                          name="tagline"
                          value={heroFormData.tagline}
                          onChange={handleHeroContentChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          placeholder="e.g. Build the Future with Clarity"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={heroFormData.title}
                          onChange={handleHeroContentChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          placeholder="e.g. Transformation"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={heroFormData.description}
                          onChange={handleHeroContentChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                          placeholder="Hero description..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Learn More Button Text</label>
                          <input
                            type="text"
                            name="learnMore"
                            value={heroFormData.learnMore}
                            onChange={handleHeroContentChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Us Button Text</label>
                          <input
                            type="text"
                            name="contactUs"
                            value={heroFormData.contactUs}
                            onChange={handleHeroContentChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 mt-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Settings</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Video Poster URL</label>
                            <input
                              type="text"
                              name="videoPoster"
                              value={heroFormData.videoPoster}
                              onChange={handleHeroContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">WebM Video URL</label>
                            <input
                              type="text"
                              name="videoWebm"
                              value={heroFormData.videoWebm}
                              onChange={handleHeroContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">MP4 Video URL</label>
                            <input
                              type="text"
                              name="videoMp4"
                              value={heroFormData.videoMp4}
                              onChange={handleHeroContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 mt-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="showFAQ"
                            name="showFAQ"
                            checked={heroFormData.showFAQ}
                            onChange={handleHeroContentChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="showFAQ" className="ml-2 block text-sm text-gray-900">
                            Show FAQ section on home page (Current: {heroFormData.showFAQ ? 'Yes' : 'No'})
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-600/20"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact-content' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Contact Section Content</h2>
                  </div>
                  <p className="text-gray-500 ml-12">Manage the contact section text and details.</p>
                </div>

                <div className="p-6 sm:p-8 bg-gray-50/50">
                  <form onSubmit={handleContactContentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                          <input
                            type="text"
                            name="tagline"
                            value={contactFormData.tagline}
                            onChange={handleContactContentChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={contactFormData.title}
                            onChange={handleContactContentChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={contactFormData.description}
                          onChange={handleContactContentChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                        />
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Locations</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section Label</label>
                            <input
                              type="text"
                              name="officeLocations"
                              value={contactFormData.officeLocations}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Line 1</label>
                            <input
                              type="text"
                              name="officeLocation1"
                              value={contactFormData.officeLocation1}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Line 2</label>
                            <input
                              type="text"
                              name="officeLocation2"
                              value={contactFormData.officeLocation2}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Numbers</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section Label</label>
                            <input
                              type="text"
                              name="contactNo"
                              value={contactFormData.contactNo}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone 1</label>
                            <input
                              type="text"
                              name="phone1"
                              value={contactFormData.phone1}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone 2</label>
                            <input
                              type="text"
                              name="phone2"
                              value={contactFormData.phone2}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emails</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section Label</label>
                            <input
                              type="text"
                              name="emails"
                              value={contactFormData.emails}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email 1</label>
                            <input
                              type="text"
                              name="email1"
                              value={contactFormData.email1}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email 2</label>
                            <input
                              type="text"
                              name="email2"
                              value={contactFormData.email2}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Enquiry Button Text</label>
                            <input
                              type="text"
                              name="enquiryForm"
                              value={contactFormData.enquiryForm}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                              type="text"
                              name="image"
                              value={contactFormData.image}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
                            <input
                              type="text"
                              name="imageAlt"
                              value={contactFormData.imageAlt}
                              onChange={handleContactContentChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-600/20"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
                  <p className="text-gray-500 mt-1">Manage frequently asked questions.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      {editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}
                    </h2>
                    <form onSubmit={handleFaqSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <input
                          type="text"
                          value={faqFormData.question}
                          onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <textarea
                          value={faqFormData.answer}
                          onChange={(e) => setFaqFormData({ ...faqFormData, answer: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-600/20"
                        >
                          {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              {editingFaqId ? 'Update' : 'Add'}
                            </>
                          )}
                        </button>
                        {editingFaqId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFaqId(null);
                              setFaqFormData({ question: '', answer: '' });
                            }}
                            className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : faqs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No FAQs found. Add one to get started.</p>
                    </div>
                  ) : (
                    faqs.map((faq) => (
                      <div
                        key={faq._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingFaqId(faq._id);
                                setFaqFormData({
                                  question: faq.question,
                                  answer: faq.answer
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
                  <p className="text-gray-500 mt-1">Manage events and gallery images.</p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
                {['events', 'covers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGallerySubTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gallerySubTab === tab
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Events Section */}
              {gallerySubTab === 'events' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form Section */}
                  <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      {editingGalleryId ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <form onSubmit={handleGallerySubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                        <input
                          type="text"
                          value={galleryFormData.title}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                        <input
                          type="date"
                          value={galleryFormData.date}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={galleryFormData.category}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                        >
                          <option value="Milestone and Achievement">Milestone and Achievement</option>
                          <option value="Foundation">Foundation</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Annual Day">Annual Day</option>
                          <option value="Event">Event</option>
                          <option value="Festival">Festival</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          value={galleryFormData.year}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, year: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                          placeholder="e.g. 2023"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={galleryFormData.description}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Thumbnail</label>
                        <div className="mt-1 flex items-center gap-4">
                          {galleryFormData.thumbnail && (
                            <img src={galleryFormData.thumbnail} alt="Thumbnail" className="w-20 h-20 object-cover rounded-lg" />
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setGalleryThumbnailFile(e.target.files[0]);
                                // Create a preview URL
                                const previewUrl = URL.createObjectURL(e.target.files[0]);
                                setGalleryFormData({ ...galleryFormData, thumbnail: previewUrl });
                              }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Gallery Images</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-50">
                          <div className="space-y-1 text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload files</span>
                                <input 
                                  type="file" 
                                  className="sr-only" 
                                  multiple
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files) {
                                      setGalleryImageFiles(Array.from(e.target.files));
                                    }
                                  }} 
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                        {galleryImageFiles.length > 0 && (
                          <p className="mt-2 text-sm text-gray-600">{galleryImageFiles.length} files selected</p>
                        )}
                      </div>

                      {/* Existing Images Preview (for edit) */}
                      {galleryFormData.images.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                          <div className="grid grid-cols-3 gap-2">
                            {galleryFormData.images.map((img, idx) => (
                              <div key={idx} className="relative group">
                                <img src={getOptimizedImageUrl(img, 200)} alt={`Gallery ${idx}`} className="w-full h-20 object-cover rounded-lg" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImages = galleryFormData.images.filter((_, i) => i !== idx);
                                    setGalleryFormData({ ...galleryFormData, images: newImages });
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-600/20"
                        >
                          {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              {editingGalleryId ? 'Update' : 'Add'}
                            </>
                          )}
                        </button>
                        {editingGalleryId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingGalleryId(null);
                              setGalleryFormData({ title: '', date: '', category: 'Event', year: new Date().getFullYear().toString(), description: '', thumbnail: '', images: [] });
                              setGalleryImageFiles([]);
                            }}
                            className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : gallery.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No events found. Add one to get started.</p>
                    </div>
                  ) : (
                    gallery.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {item.thumbnail && (
                                <img src={getOptimizedImageUrl(item.thumbnail, 100)} alt="Thumbnail" className="w-10 h-10 object-cover rounded-lg" />
                              )}
                              <h3 className="font-semibold text-gray-900">{item.title}</h3>
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">
                                {item.category || 'Uncategorized'}
                              </span>
                              <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md">
                                {item.year || 'No Year'}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            
                            {/* Image Preview Grid */}
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                              {item.images.slice(0, 6).map((img, idx) => (
                                <img 
                                  key={idx} 
                                  src={getOptimizedImageUrl(img, 200)} 
                                  alt={item.title} 
                                  className="w-full h-16 object-cover rounded-lg bg-gray-100"
                                />
                              ))}
                              {item.images.length > 6 && (
                                <div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs font-medium">
                                  +{item.images.length - 6}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingGalleryId(item._id);
                                setGalleryFormData({
                                  title: item.title,
                                  date: item.date.split('T')[0],
                                  category: item.category || 'Event',
                                  year: item.year || new Date(item.date).getFullYear().toString(),
                                  description: item.description,
                                  thumbnail: item.thumbnail || '',
                                  images: item.images
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              )}

              {/* Covers Section */}
              {gallerySubTab === 'covers' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form Section */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                      <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        {editingEventCoverId ? 'Edit Cover' : 'Add/Update Cover'}
                      </h2>
                      <form onSubmit={handleEventCoverSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type/Category</label>
                          <select
                            value={eventCoverFormData.type}
                            onChange={(e) => setEventCoverFormData({ ...eventCoverFormData, type: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            required
                          >
                            <option value="">Select a category</option>
                            {galleryCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                          <input
                            type="number"
                            value={eventCoverFormData.order}
                            onChange={(e) => setEventCoverFormData({ ...eventCoverFormData, order: Number(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            min={0}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                          <div className="mt-1 flex items-center gap-4">
                            {eventCoverFormData.image && (
                              <img src={eventCoverFormData.image} alt="Cover" className="w-20 h-20 object-cover rounded-lg" />
                            )}
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setEventCoverImageFile(e.target.files[0]);
                                  // Create a preview URL
                                  const previewUrl = URL.createObjectURL(e.target.files[0]);
                                  setEventCoverFormData({ ...eventCoverFormData, image: previewUrl });
                                }
                              }}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-600/20"
                          >
                            {submitting ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Save className="w-5 h-5 mr-2" />
                                {editingEventCoverId ? 'Update' : 'Add/Update'}
                              </>
                            )}
                          </button>
                          {editingEventCoverId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEventCoverId(null);
                                setEventCoverFormData({ type: '', image: '', order: 0 });
                                setEventCoverImageFile(null);
                              }}
                              className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* List Section */}
                  <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      </div>
                    ) : eventCovers.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No event covers found. Add one to get started.</p>
                      </div>
                    ) : (
                      eventCovers.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {item.image && (
                                  <img src={getOptimizedImageUrl(item.image, 100)} alt="Cover" className="w-10 h-10 object-cover rounded-lg" />
                                )}
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.type}</h3>
                                  <p className="text-sm text-gray-600">Order: {item.order}</p>
                                </div>
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">
                                  Cover Image
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => {
                                  setEditingEventCoverId(item._id);
                                  setEventCoverFormData({
                                    type: item.type,
                                    image: item.image,
                                    order: item.order
                                  });
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEventCover(item._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'global-services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Global Services Management</h1>
                  <p className="text-gray-500 mt-1">Manage page content, regions, and offerings.</p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
                {['content', 'regions', 'offerings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGlobalServicesSubTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      globalServicesSubTab === tab
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Page Content Section */}
              {globalServicesSubTab === 'content' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold mb-4">Page Content</h2>
                  <form onSubmit={handleGlobalServiceContentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                      <input name="heroTitle" value={globalServiceContentFormData.heroTitle} onChange={handleGlobalServiceContentChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Video URL</label>
                      <input name="heroVideoUrl" value={globalServiceContentFormData.heroVideoUrl} onChange={handleGlobalServiceContentChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
                      <textarea name="heroDescription" value={globalServiceContentFormData.heroDescription} onChange={handleGlobalServiceContentChange} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Intro Title</label>
                      <input name="introTitle" value={globalServiceContentFormData.introTitle} onChange={handleGlobalServiceContentChange} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Intro Description 1</label>
                      <textarea name="introDescription1" value={globalServiceContentFormData.introDescription1} onChange={handleGlobalServiceContentChange} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Intro Description 2</label>
                      <textarea name="introDescription2" value={globalServiceContentFormData.introDescription2} onChange={handleGlobalServiceContentChange} rows={2} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {submitting ? 'Saving...' : 'Save Content'}
                  </button>
                </form>
              </div>
              )}

              {/* Regions Section */}
              {globalServicesSubTab === 'regions' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-4">{editingGlobalRegionId ? 'Edit Region' : 'Add Region'}</h2>
                    <form onSubmit={handleGlobalRegionSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input name="name" value={globalRegionFormData.name} onChange={handleGlobalRegionChange} className="w-full px-4 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (e.g., australia)</label>
                        <input name="slug" value={globalRegionFormData.slug} onChange={handleGlobalRegionChange} className="w-full px-4 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link (href)</label>
                        <input name="href" value={globalRegionFormData.href} onChange={handleGlobalRegionChange} className="w-full px-4 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input type="number" name="order" value={globalRegionFormData.order} onChange={handleGlobalRegionChange} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Page Content</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Hero Title</label>
                            <input name="heroTitle" value={globalRegionFormData.heroTitle} onChange={handleGlobalRegionChange} className="w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Hero Description</label>
                            <textarea name="heroDescription" value={globalRegionFormData.heroDescription} onChange={handleGlobalRegionChange} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Content Heading</label>
                            <input name="contentHeading" value={globalRegionFormData.contentHeading} onChange={handleGlobalRegionChange} className="w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Content Description</label>
                            <textarea name="contentDescription" value={globalRegionFormData.contentDescription} onChange={handleGlobalRegionChange} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Features (comma separated)</label>
                            <textarea name="features" value={globalRegionFormData.features} onChange={handleGlobalRegionChange} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Feature 1, Feature 2, Feature 3" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Images</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Card Image</label>
                            <input type="file" onChange={(e) => setGlobalRegionImageFile(e.target.files?.[0] || null)} className="w-full text-sm" accept="image/*" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Hero Image</label>
                            <input type="file" onChange={(e) => setGlobalRegionHeroImageFile(e.target.files?.[0] || null)} className="w-full text-sm" accept="image/*" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                          {editingGlobalRegionId ? 'Update' : 'Add'}
                        </button>
                        {editingGlobalRegionId && (
                          <button type="button" onClick={() => { 
                            setEditingGlobalRegionId(null); 
                            setGlobalRegionFormData({ 
                              name: '', slug: '', href: '', order: 0,
                              heroTitle: '', heroDescription: '',
                              contentHeading: '', contentDescription: '',
                              features: ''
                            }); 
                          }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 font-medium flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Regions List</span>
                        <button onClick={fetchGlobalRegions} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Refresh List">
                          <RefreshCw className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">Count: {globalRegions.length}</span>
                    </div>
                    <div className="divide-y">
                      {globalRegions.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                          No regions found.
                        </div>
                      )}
                      {globalRegions.map(item => (
                        <div key={item._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <div className="flex flex-col text-sm text-gray-500">
                                <span>Slug: {item.slug}</span>
                                <span>Link: {item.href}</span>
                                <span>Order: {item.order}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleGlobalRegionEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleGlobalRegionDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Offerings Section */}
              {globalServicesSubTab === 'offerings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-4">{editingGlobalOfferingId ? 'Edit Offering' : 'Add Offering'}</h2>
                    <form onSubmit={handleGlobalOfferingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input name="title" value={globalOfferingFormData.title} onChange={handleGlobalOfferingChange} className="w-full px-4 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={globalOfferingFormData.description} onChange={handleGlobalOfferingChange} rows={3} className="w-full px-4 py-2 border rounded-lg" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide)</label>
                        <input name="icon" value={globalOfferingFormData.icon} onChange={handleGlobalOfferingChange} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input type="number" name="order" value={globalOfferingFormData.order} onChange={handleGlobalOfferingChange} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                          {editingGlobalOfferingId ? 'Update' : 'Add'}
                        </button>
                        {editingGlobalOfferingId && (
                          <button type="button" onClick={() => { setEditingGlobalOfferingId(null); setGlobalOfferingFormData({ title: '', description: '', icon: 'ShieldCheck', order: 0 }); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 font-medium flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Offerings List</span>
                        <button onClick={fetchGlobalOfferings} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Refresh List">
                          <RefreshCw className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">Count: {globalOfferings.length}</span>
                    </div>
                    <div className="divide-y">
                      {globalOfferingsError && (
                        <div className="p-4 text-center text-red-500 bg-red-50">
                          {globalOfferingsError}
                        </div>
                      )}
                      {!globalOfferingsError && globalOfferings.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                          No offerings found.
                        </div>
                      )}
                      {globalOfferings.map(item => (
                        <div key={item._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleGlobalOfferingEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => handleGlobalOfferingDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Career / Jobs Management</h1>
                  <p className="text-gray-500 mt-1">Manage current job openings.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                      {editingJobId ? 'Edit Job Post' : 'Add New Job Post'}
                      {editingJobId && (
                        <button 
                          onClick={() => {
                            setEditingJobId(null);
                            setJobFormData({
                              title: '',
                              department: '',
                              location: '',
                              type: 'Full-time',
                              description: '',
                              requirements: ''
                            });
                          }}
                          className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </h2>
                    
                    {message && (
                      <div className={`p-3 rounded-lg text-sm mb-4 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                      </div>
                    )}

                    <form onSubmit={handleJobSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input 
                          value={jobFormData.title}
                          onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input 
                          value={jobFormData.department}
                          onChange={(e) => setJobFormData({...jobFormData, department: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input 
                            value={jobFormData.location}
                            onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select 
                            value={jobFormData.type}
                            onChange={(e) => setJobFormData({...jobFormData, type: e.target.value as any})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                          value={jobFormData.description}
                          onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                        <textarea 
                          value={jobFormData.requirements}
                          onChange={(e) => setJobFormData({...jobFormData, requirements: e.target.value})}
                          rows={4}
                          placeholder="e.g. CA Qualified, 2 years experience, Good communication"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                          required
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingJobId ? 'Update Job' : 'Post Job')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 font-medium flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        <span>Current Openings</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">Total: {jobs.length}</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                      ) : jobs.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No job openings found.</div>
                      ) : (
                        jobs.map((job) => (
                          <div key={job._id} className="p-5 hover:bg-gray-50 transition-colors group">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">{job.department}</span>
                                  <span className="bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{job.location}</span>
                                  <span className="bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{job.type}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{job.description}</p>
                              </div>
                              
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleEditJob(job)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteJob(job._id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Locations Management</h1>
                  <p className="text-gray-500 mt-1">Manage office locations on the map.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      {editingLocationId ? 'Edit Location' : 'Add New Location'}
                    </h2>
                    <form onSubmit={handleLocationSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Label (City Name)</label>
                        <input
                          type="text"
                          value={locationFormData.label}
                          onChange={(e) => setLocationFormData({ ...locationFormData, label: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                          placeholder="e.g. New Delhi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={locationFormData.title}
                          onChange={(e) => setLocationFormData({ ...locationFormData, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                          placeholder="e.g. Head Office"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                          value={locationFormData.address}
                          onChange={(e) => setLocationFormData({ ...locationFormData, address: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                          required
                          placeholder="Full address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phones (comma separated)</label>
                        <input
                          type="text"
                          value={locationFormData.phones}
                          onChange={(e) => setLocationFormData({ ...locationFormData, phones: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          placeholder="e.g. +91 1234567890, +91 0987654321"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={locationFormData.email}
                          onChange={(e) => setLocationFormData({ ...locationFormData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                          placeholder="e.g. info@example.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                          <input
                            type="number"
                            step="any"
                            value={locationFormData.lat}
                            onChange={(e) => setLocationFormData({ ...locationFormData, lat: parseFloat(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                          <input
                            type="number"
                            step="any"
                            value={locationFormData.lng}
                            onChange={(e) => setLocationFormData({ ...locationFormData, lng: parseFloat(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">Google Maps URL</label>
                          <button
                            type="button"
                            onClick={async () => {
                              const url = locationFormData.googleMapsUrl;
                              if (!url) return;

                              setIsExtractingCoords(true);
                              try {
                                const response = await fetch('/api/admin/extract-coords', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ url }),
                                });

                                const data = await response.json();

                                if (!response.ok) {
                                  throw new Error(data.error || 'Failed to extract coordinates');
                                }

                                setLocationFormData(prev => ({ 
                                  ...prev, 
                                  lat: data.lat, 
                                  lng: data.lng 
                                }));
                              } catch (error) {
                                console.error('Error extracting coords:', error);
                                alert(error instanceof Error ? error.message : 'Failed to extract coordinates');
                              } finally {
                                setIsExtractingCoords(false);
                              }
                            }}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            disabled={isExtractingCoords}
                          >
                            {isExtractingCoords ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <RefreshCw className="w-3 h-3" />
                            )}
                            {isExtractingCoords ? 'Extracting...' : 'Extract Coords'}
                          </button>
                        </div>
                        <input
                          type="url"
                          value={locationFormData.googleMapsUrl}
                          onChange={(e) => setLocationFormData({ ...locationFormData, googleMapsUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                          placeholder="https://maps.google.com/..."
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-600/20"
                        >
                          {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              {editingLocationId ? 'Update' : 'Add'}
                            </>
                          )}
                        </button>
                        {editingLocationId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingLocationId(null);
                              setLocationFormData({
                                label: '',
                                title: '',
                                address: '',
                                phones: '',
                                email: '',
                                lat: 0,
                                lng: 0,
                                googleMapsUrl: ''
                              });
                            }}
                            className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : locations.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No locations found. Add one to get started.</p>
                    </div>
                  ) : (
                    locations.map((location) => (
                      <div
                        key={location._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{location.label}</h3>
                            <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                            <div className="space-y-1 mb-2">
                              {location.phones.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="w-4 h-4" />
                                  <span>{location.phones.join(', ')}</span>
                                </div>
                              )}
                              {location.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Globe className="w-4 h-4" />
                                  <span>{location.email}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-4 text-xs text-gray-500 font-mono">
                              <span>Lat: {location.lat}</span>
                              <span>Lng: {location.lng}</span>
                            </div>
                            <a 
                              href={location.googleMapsUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs hover:underline mt-2 inline-block"
                            >
                              View on Maps
                            </a>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingLocationId(location._id);
                                setLocationFormData({
                                  label: location.label,
                                  title: location.title,
                                  address: location.address,
                                  phones: location.phones.join(', '),
                                  email: location.email,
                                  lat: location.lat,
                                  lng: location.lng,
                                  googleMapsUrl: location.googleMapsUrl
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLocation(location._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Insights Management</h1>
                  <p className="text-gray-500 mt-1">Manage company insights and thought leadership content.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      {editingInsightId ? 'Edit Insight' : 'Add New Insight'}
                    </h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveInsight(); }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={insightFormData.title}
                          onChange={(e) => setInsightFormData({ ...insightFormData, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={insightFormData.description}
                          onChange={(e) => setInsightFormData({ ...insightFormData, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                          value={insightFormData.content}
                          onChange={(e) => setInsightFormData({ ...insightFormData, content: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                        <div className="flex items-center justify-center w-full group">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50/50 group-hover:border-blue-300 transition-all duration-300">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                              </div>
                              <p className="text-xs text-gray-500 font-medium">{insightImageFile ? <span className="text-blue-600">{insightImageFile.name}</span> : (insightFormData.image ? <span className="text-gray-700">Current image</span> : 'Click to upload image')}</p>
                            </div>
                            <input type="file" className="hidden" onChange={(e) => setInsightImageFile(e.target.files?.[0] || null)} accept="image/*" />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={insightFormData.category}
                          onChange={(e) => setInsightFormData({ ...insightFormData, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="General">General</option>
                          <option value="Technology">Technology</option>
                          <option value="Business">Business</option>
                          <option value="Industry">Industry</option>
                          <option value="Innovation">Innovation</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={insightFormData.published}
                            onChange={(e) => setInsightFormData({ ...insightFormData, published: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Published</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={insightFormData.featured}
                            onChange={(e) => setInsightFormData({ ...insightFormData, featured: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Featured</span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-600/20"
                        >
                          {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              {editingInsightId ? 'Update' : 'Add'} Insight
                            </>
                          )}
                        </button>
                        {editingInsightId && (
                          <button
                            type="button"
                            onClick={handleCancelEditInsight}
                            className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : insights.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No insights found. Add one to get started.</p>
                    </div>
                  ) : (
                    insights.map((insight) => (
                      <div
                        key={insight._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {insight.image && (
                                <img src={insight.image} alt="Insight" className="w-12 h-12 object-cover rounded-lg" />
                              )}
                              <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-md ${insight.published ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                                {insight.published ? 'Published' : 'Draft'}
                              </span>
                              {insight.featured && (
                                <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700">
                                  Featured
                                </span>
                              )}
                              <span className="px-2 py-1 text-xs rounded-md bg-purple-50 text-purple-700">
                                {insight.category}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{insight.description}</p>
                            <p className="text-xs text-gray-500">
                              Created: {new Date(insight.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditInsight(insight)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteInsight(insight._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Policies Management</h1>
                  <p className="text-gray-500 mt-1">Manage company policies and terms.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{editingPolicyId ? 'Edit Policy' : 'Add New Policy'}</h2>
                        <p className="text-sm text-gray-500">Create or update company policies</p>
                      </div>
                    </div>

                    <form onSubmit={handlePolicySubmit} className="space-y-5">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Basic Information</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Policy Title</label>
                          <input
                            name="title"
                            value={policyFormData.title}
                            onChange={handlePolicyChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter policy title..."
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            name="category"
                            value={policyFormData.category}
                            onChange={handlePolicyChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="general">📋 General</option>
                            <option value="employee">👥 Employee</option>
                          </select>
                        </div>

                        {policyFormData.category === 'employee' && (
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <div className="flex gap-2">
                              <select
                                name="subCategory"
                                value={policyFormData.subCategory}
                                onChange={handlePolicyChange}
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                  <option key={dept.slug} value={dept.slug}>
                                    {dept.icon} {dept.name}
                                  </option>
                                ))}
                                <option value="OTHER">➕ Other (Custom Department)</option>
                              </select>
                              {policyFormData.subCategory && policyFormData.subCategory !== 'OTHER' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const dept = departments.find(d => d.slug === policyFormData.subCategory);
                                    if (dept) {
                                      setEditingDepartmentName(dept.name);
                                      setIsEditingDepartmentName(true);
                                    }
                                  }}
                                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
                                  title="Edit department name"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {isEditingDepartmentName && (
                              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                <label className="block text-sm font-medium text-blue-700 mb-2">Edit Department Name</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={editingDepartmentName}
                                    onChange={(e) => setEditingDepartmentName(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter new department name"
                                  />
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      const dept = departments.find(d => d.slug === policyFormData.subCategory);
                                      if (dept && editingDepartmentName.trim()) {
                                        try {
                                          const res = await fetch(`/api/admin/departments/${dept._id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name: editingDepartmentName.trim() }),
                                          });
                                          if (res.ok) {
                                            setMessage('Department name updated successfully!');
                                            setIsEditingDepartmentName(false);
                                            setEditingDepartmentName('');
                                            fetchDepartments();
                                          } else {
                                            setMessage('Failed to update department name.');
                                          }
                                        } catch (err) {
                                          console.error(err);
                                          setMessage('An error occurred.');
                                        }
                                      }
                                    }}
                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsEditingDepartmentName(false);
                                      setEditingDepartmentName('');
                                    }}
                                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}

                            {policyFormData.subCategory === 'OTHER' && (
                              <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Department Name</label>
                                <input
                                  type="text"
                                  name="customSubCategory"
                                  value={policyFormData.customSubCategory || ''}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setPolicyFormData(prev => ({
                                      ...prev,
                                      customSubCategory: value,
                                      subCategory: value ? 'OTHER' : ''
                                    }));
                                  }}
                                  placeholder="Enter department name (e.g., Finance, Marketing, Operations)"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">This will create a new department category for policies</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Order Settings */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">📋 Display Order</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
                          <input
                            type="number"
                            name="order"
                            value={policyFormData.order}
                            onChange={handlePolicyChange}
                            min="0"
                            placeholder="0"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          />
                          <p className="text-xs text-gray-500 mt-1">Lower numbers appear first. Use up/down arrows or set manually.</p>
                        </div>
                      </div>

                      {/* Policy Type & Content */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Policy Content</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Policy Format</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setPolicyFormData(prev => ({ ...prev, policyType: 'text' }))}
                              className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                                policyFormData.policyType === 'text'
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
                              }`}
                            >
                              📝 Text Policy
                            </button>
                            <button
                              type="button"
                              onClick={() => setPolicyFormData(prev => ({ ...prev, policyType: 'pdf' }))}
                              className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                                policyFormData.policyType === 'pdf'
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
                              }`}
                            >
                              📄 PDF Policy
                            </button>
                          </div>
                        </div>

                        {(policyFormData.policyType === 'pdf' || !policyFormData.policyType) && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">📄 PDF/Document Link</label>
                            <input
                              type="text"
                              name="pdfUrl"
                              value={policyFormData.pdfUrl || ''}
                              onChange={handlePolicyChange}
                              placeholder="https://drive.google.com/file/d/... or https://docs.google.com/..."
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Paste a shareable Google Drive, OneDrive, or direct PDF link</p>
                          </div>
                        )}

                        {(policyFormData.policyType === 'text' || !policyFormData.policyType) && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">📝 Policy Content</label>
                            <textarea
                              name="content"
                              value={policyFormData.content}
                              onChange={handlePolicyChange}
                              rows={6}
                              placeholder="Write the complete policy content here..."
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">Write the complete policy text that will be displayed to employees</p>
                          </div>
                        )}
                      </div>

                      {/* Attachments */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Attachments (Optional)</h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">📊 Excel/Spreadsheet Link</label>
                          <input
                            type="text"
                            name="excelUrl"
                            value={policyFormData.excelUrl || ''}
                            onChange={handlePolicyChange}
                            placeholder="https://docs.google.com/spreadsheets/d/... or https://excel.office.com/..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                          <p className="text-xs text-gray-500 mt-1">Add downloadable Excel files, spreadsheets, or data sheets</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t space-y-3">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              {editingPolicyId ? 'Updating...' : 'Creating...'}
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              {editingPolicyId ? 'Update Policy' : 'Create Policy'}
                            </>
                          )}
                        </button>

                        {editingPolicyId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPolicyId(null);
                              setPolicyFormData({ title: '', content: '', category: 'general', subCategory: '', customSubCategory: '', pdfUrl: '', excelUrl: '', policyType: 'text', order: 0 });
                            }}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                          >
                            Cancel Editing
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b bg-gray-50">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">Policies Management</h2>
                            <p className="text-sm text-gray-500">Manage and organize company policies</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                          <div className="flex gap-2 self-start sm:self-center flex-shrink-0">
                            <button
                              onClick={fetchPolicies}
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Refresh List"
                            >
                              <RefreshCw className="w-4 h-4 text-gray-500" />
                            </button>

                            <button
                              onClick={handleResetOrder}
                              className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                              title="Reset all policy orders sequentially"
                            >
                              🔄 Reset Order
                            </button>

                            <button
                              onClick={() => {
                                // Initialize bulk order data with current values
                                const initialData: {[key: string]: number} = {};
                                policies.forEach(policy => {
                                  initialData[policy._id] = policy.order;
                                });
                                setBulkOrderData(initialData);
                                setShowBulkOrderModal(true);
                              }}
                              className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                              title="Bulk edit policy orders"
                            >
                              📝 Bulk Edit
                            </button>
                          </div>

                          <div className="relative flex-1 min-w-0">
                            <div className="flex bg-gray-200 p-1 rounded-xl overflow-x-auto policy-filter-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9CA3AF #E5E7EB', maxWidth: 'min(400px, calc(100vw - 120px))' }}>
                              <div className="flex gap-1 flex-nowrap">
                                
                            
                            {[
                              { key: 'all', label: 'All', icon: '📋', fullName: 'All' },
                              { key: 'general', label: 'General', icon: '📄', fullName: 'General' },
                              ...departments.map(dept => ({
                                key: `dept-${dept.slug}`,
                                label: dept.name.length > 10 ? dept.name.substring(0, 10) + '...' : dept.name,
                                icon: dept.icon || '🏷️',
                                fullName: dept.name
                              }))
                            ].map((filter) => (
                              <button
                                key={filter.key}
                                onClick={() => setPolicyFilter(filter.key)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${
                                  policyFilter === filter.key
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                                title={filter.fullName || filter.label}
                              >
                                <span>{filter.icon}</span>
                                {filter.label}
                              </button>
                            ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {policies.length === 0 && (
                        <div className="p-12 text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No policies yet</h3>
                          <p className="text-gray-500 mb-4">
                            Get started by creating your first policy. You can add general policies like privacy policy and terms of service, or employee policies for different departments.
                          </p>
                          <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Policy
                          </button>
                        </div>
                      )}

                      {policies
                        .filter(p => {
                          if (policyFilter === 'all') return true;
                          if (policyFilter === 'general') return p.category === 'general';
                          if (policyFilter === 'employee') return p.category === 'employee';
                          if (policyFilter.startsWith('dept-')) {
                            const dept = policyFilter.replace('dept-', '');
                            return p.subCategory === dept;
                          }
                          return false;
                        })
                        .map(item => {
                        const isLastPolicy = item.order === Math.max(...policies.map(p => p.order));
                        return (
                        <div key={item._id} className="p-6 hover:bg-gray-50 group transition-all duration-200">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>

                                {/* Category & Type Badges */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    item.category === 'general'
                                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                                  }`}>
                                    {item.category === 'general' ? '📋 General' : '👥 Employee'}
                                  </span>

                                  {item.subCategory && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                                      {(() => {
                                        const dept = departments.find(d => d.slug === item.subCategory);
                                        return dept ? `${dept.icon} ${dept.name}` : `🏷️ ${item.subCategory}`;
                                      })()}
                                    </span>
                                  )}

                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                                    item.policyType === 'pdf' || item.pdfUrl
                                      ? 'bg-green-100 text-green-700 border-green-200'
                                      : 'bg-blue-100 text-blue-700 border-blue-200'
                                  }`}>
                                    {item.policyType === 'pdf' || item.pdfUrl ? '📄 PDF' : '📝 Text'}
                                  </span>

                                  {item.excelUrl && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                                      📊 Excel
                                    </span>
                                  )}

                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded border border-gray-200 flex items-center gap-1" title="Display order - lower numbers appear first">
                                    <span className="text-gray-500">#</span>
                                    <span className="font-medium">{item.order}</span>
                                  </span>
                                </div>
                              </div>

                              {item.content && (
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                                  {item.content}
                                </p>
                              )}

                              {/* Attachments Preview */}
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                {item.pdfUrl && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-green-600">📄</span>
                                    <span>PDF Available</span>
                                  </div>
                                )}
                                {item.excelUrl && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-emerald-600">📊</span>
                                    <span>Excel Available</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {/* Order Controls */}
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handlePolicyMoveUp(item._id)}
                                  className={`p-1.5 rounded transition-colors ${
                                    item.order === 0
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                  title={item.order === 0 ? 'Already at top' : 'Move Up'}
                                  disabled={item.order === 0}
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handlePolicyMoveDown(item._id)}
                                  className={`p-1.5 rounded transition-colors ${
                                    isLastPolicy
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                  title={isLastPolicy ? 'Already at bottom' : 'Move Down'}
                                  disabled={isLastPolicy}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Edit & Delete */}
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handlePolicyEdit(item)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit Policy"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handlePolicyDelete(item._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Policy"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        );
                      })}

                      {policies.filter(p => {
                        if (policyFilter === 'all') return true;
                        if (policyFilter === 'general') return p.category === 'general';
                        if (policyFilter === 'employee') return p.category === 'employee';
                        if (policyFilter.startsWith('dept-')) {
                          const dept = policyFilter.replace('dept-', '');
                          return p.subCategory === dept;
                        }
                        return false;
                      }).length === 0 && policies.length > 0 && (
                        <div className="p-12 text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {policyFilter.startsWith('dept-')
                              ? `No policies in ${policyFilter.replace('dept-', '')} department`
                              : policyFilter === 'general'
                              ? 'No general policies found'
                              : policyFilter === 'employee'
                              ? 'No employee policies found'
                              : 'No policies in this category'
                            }
                          </h3>
                          <p className="text-gray-500">
                            {policyFilter.startsWith('dept-')
                              ? `Try selecting a different department or create a new policy for ${policyFilter.replace('dept-', '')}.`
                              : 'Try selecting a different category or create a new policy.'
                            }
                          </p>
                        </div>
                      )}
                    </div>
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

      {/* Bulk Order Modal */}
      {showBulkOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Bulk Edit Policy Order</h2>
                <button
                  onClick={() => setShowBulkOrderModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Set custom order numbers for all policies. Lower numbers appear first.</p>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {policies
                  .sort((a, b) => a.order - b.order)
                  .map((policy) => (
                    <div key={policy._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{policy.title}</h3>
                        <p className="text-sm text-gray-500">
                          {policy.category === 'general' ? '📋 General' : '👥 Employee'} •
                          {policy.subCategory ? ` ${policy.subCategory}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Order:</label>
                        <input
                          type="number"
                          min="0"
                          value={bulkOrderData[policy._id] ?? policy.order}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setBulkOrderData(prev => ({
                              ...prev,
                              [policy._id]: value
                            }));
                          }}
                          className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowBulkOrderModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkOrderUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}