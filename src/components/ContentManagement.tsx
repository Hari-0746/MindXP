import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, FileText, Video, BookOpen } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface Content {
  id: string;
  title: string;
  type: 'article' | 'video' | 'task';
  status: 'published' | 'draft' | 'archived';
  author: string;
  category: string;
  createdDate: string;
  lastModified: string;
  views: number;
  description: string;
}

const ContentManagement = () => {
  const [content, setContent] = useState<Content[]>([
    {
      id: '1',
      title: 'Renewable Energy Solutions',
      type: 'article',
      status: 'published',
      author: 'Dr. Jane Smith',
      category: 'Environmental Science',
      createdDate: '2024-01-15',
      lastModified: '2024-01-18',
      views: 1250,
      description: 'Comprehensive guide to renewable energy technologies and their environmental impact.'
    },
    {
      id: '2',
      title: 'Climate Change Documentary',
      type: 'video',
      status: 'published',
      author: 'Prof. Mike Johnson',
      category: 'Climate Studies',
      createdDate: '2024-01-10',
      lastModified: '2024-01-12',
      views: 3500,
      description: 'A 30-minute documentary exploring the effects of climate change on ecosystems.'
    },
    {
      id: '3',
      title: 'Sustainable Living Challenge',
      type: 'task',
      status: 'draft',
      author: 'Sarah Wilson',
      category: 'Practical Ecology',
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
      views: 0,
      description: 'Interactive task challenging students to implement sustainable practices in their daily lives.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddContent = () => {
    setSelectedContent(null);
    setIsAddModalOpen(true);
  };

  const handleEditContent = (contentItem: Content) => {
    setSelectedContent(contentItem);
    setIsAddModalOpen(true);
  };

  const handleDeleteContent = (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter(item => item.id !== contentId));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      article: FileText,
      video: Video,
      task: BookOpen
    };
    
    const Icon = icons[type as keyof typeof icons];
    return <Icon className="w-5 h-5" />;
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      article: 'bg-blue-100 text-blue-800',
      video: 'bg-purple-100 text-purple-800',
      task: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[type as keyof typeof styles]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage educational content, articles, videos, and tasks</p>
        </div>
        <Button onClick={handleAddContent} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Content</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Articles</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.type === 'article').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.type === 'video').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.type === 'task').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="task">Task</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3 text-gray-400">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(item.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditContent(item)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(item.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Content Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedContent ? 'Edit Content' : 'Add New Content'}
      >
        <ContentForm
          content={selectedContent}
          onSubmit={(contentData) => {
            if (selectedContent) {
              setContent(content.map(c => 
                c.id === selectedContent.id ? { ...selectedContent, ...contentData, lastModified: new Date().toISOString().split('T')[0] } : c
              ));
            } else {
              const newContent: Content = {
                ...contentData,
                id: Date.now().toString(),
                createdDate: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0],
                views: 0
              };
              setContent([...content, newContent]);
            }
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

interface ContentFormProps {
  content: Content | null;
  onSubmit: (contentData: Partial<Content>) => void;
  onCancel: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ content, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    type: content?.type || 'article' as Content['type'],
    status: content?.status || 'draft' as Content['status'],
    author: content?.author || '',
    category: content?.category || '',
    description: content?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Content['type'] })}
          >
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="task">Task</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Content['status'] })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {content ? 'Update Content' : 'Add Content'}
        </Button>
      </div>
    </form>
  );
};

export default ContentManagement;