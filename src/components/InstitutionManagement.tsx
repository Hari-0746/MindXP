import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, MapPin, Users } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface Institution {
  id: string;
  name: string;
  location: string;
  type: 'school' | 'university' | 'college';
  status: 'active' | 'inactive';
  studentsCount: number;
  teachersCount: number;
  establishedDate: string;
  contactEmail: string;
  contactPhone: string;
}

const InstitutionManagement = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([
    {
      id: '1',
      name: 'Green Valley High School',
      location: 'California, USA',
      type: 'school',
      status: 'active',
      studentsCount: 1250,
      teachersCount: 85,
      establishedDate: '1985-09-01',
      contactEmail: 'admin@greenvalley.edu',
      contactPhone: '+1-555-0123'
    },
    {
      id: '2',
      name: 'Central University',
      location: 'New York, USA',
      type: 'university',
      status: 'active',
      studentsCount: 15000,
      teachersCount: 750,
      establishedDate: '1960-01-15',
      contactEmail: 'info@central.edu',
      contactPhone: '+1-555-0456'
    },
    {
      id: '3',
      name: 'Tech Community College',
      location: 'Texas, USA',
      type: 'college',
      status: 'inactive',
      studentsCount: 3500,
      teachersCount: 200,
      establishedDate: '1995-08-20',
      contactEmail: 'contact@techcc.edu',
      contactPhone: '+1-555-0789'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || institution.type === filterType;
    const matchesStatus = filterStatus === 'all' || institution.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddInstitution = () => {
    setSelectedInstitution(null);
    setIsAddModalOpen(true);
  };

  const handleEditInstitution = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsAddModalOpen(true);
  };

  const handleDeleteInstitution = (institutionId: string) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      setInstitutions(institutions.filter(institution => institution.id !== institutionId));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      school: 'bg-blue-100 text-blue-800',
      university: 'bg-purple-100 text-purple-800',
      college: 'bg-orange-100 text-orange-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Institution Management</h1>
          <p className="text-gray-600">Manage educational institutions and their details</p>
        </div>
        <Button onClick={handleAddInstitution} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Institution</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Institutions</p>
              <p className="text-2xl font-bold text-gray-900">{institutions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Institutions</p>
              <p className="text-2xl font-bold text-gray-900">
                {institutions.filter(i => i.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {institutions.reduce((sum, i) => sum + i.studentsCount, 0).toLocaleString()}
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
              placeholder="Search institutions..."
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
              <option value="school">School</option>
              <option value="university">University</option>
              <option value="college">College</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutions.map((institution) => (
          <div key={institution.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{institution.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {institution.location}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTypeBadge(institution.type)}
                    {getStatusBadge(institution.status)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium text-gray-900">{institution.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Teachers:</span>
                  <span className="font-medium text-gray-900">{institution.teachersCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(institution.establishedDate).getFullYear()}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditInstitution(institution)}
                  className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteInstitution(institution.id)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Institution Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedInstitution ? 'Edit Institution' : 'Add New Institution'}
      >
        <InstitutionForm
          institution={selectedInstitution}
          onSubmit={(institutionData) => {
            if (selectedInstitution) {
              setInstitutions(institutions.map(i => 
                i.id === selectedInstitution.id ? { ...selectedInstitution, ...institutionData } : i
              ));
            } else {
              const newInstitution: Institution = {
                ...institutionData,
                id: Date.now().toString()
              };
              setInstitutions([...institutions, newInstitution]);
            }
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

interface InstitutionFormProps {
  institution: Institution | null;
  onSubmit: (institutionData: Partial<Institution>) => void;
  onCancel: () => void;
}

const InstitutionForm: React.FC<InstitutionFormProps> = ({ institution, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: institution?.name || '',
    location: institution?.location || '',
    type: institution?.type || 'school' as Institution['type'],
    status: institution?.status || 'active' as Institution['status'],
    studentsCount: institution?.studentsCount || 0,
    teachersCount: institution?.teachersCount || 0,
    establishedDate: institution?.establishedDate || '',
    contactEmail: institution?.contactEmail || '',
    contactPhone: institution?.contactPhone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Institution['type'] })}
          >
            <option value="school">School</option>
            <option value="university">University</option>
            <option value="college">College</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Institution['status'] })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Students Count</label>
          <input
            type="number"
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.studentsCount}
            onChange={(e) => setFormData({ ...formData, studentsCount: parseInt(e.target.value) || 0 })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teachers Count</label>
          <input
            type="number"
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.teachersCount}
            onChange={(e) => setFormData({ ...formData, teachersCount: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Established Date</label>
        <input
          type="date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.establishedDate}
          onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {institution ? 'Update Institution' : 'Add Institution'}
        </Button>
      </div>
    </form>
  );
};

export default InstitutionManagement;