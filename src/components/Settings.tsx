import React, { useState } from 'react';
import { Shield, Users, Key, Database, Bell, Mail, Globe, Save } from 'lucide-react';
import Button from './ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [settings, setSettings] = useState({
    // Security settings
    twoFactorAuth: true,
    passwordPolicy: 'strong',
    sessionTimeout: 30,
    
    // User Management
    autoApproveUsers: false,
    defaultUserRole: 'student',
    maxUsersPerInstitution: 5000,
    
    // Platform settings
    maintenanceMode: false,
    publicRegistration: true,
    dataRetention: 365,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    
    // Content settings
    contentModeration: true,
    autoPublish: false,
    maxFileSize: 10
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'security', name: 'Security & Privacy', icon: Shield },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'platform', name: 'Platform Settings', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Access</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
              <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <select
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.passwordPolicy}
              onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
            >
              <option value="basic">Basic (8 characters minimum)</option>
              <option value="strong">Strong (12 characters, mixed case, numbers)</option>
              <option value="enterprise">Enterprise (16 characters, special chars)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              min="5"
              max="480"
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Privacy</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period (days)</label>
            <input
              type="number"
              min="30"
              max="2555"
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
            />
            <p className="text-sm text-gray-500 mt-1">How long to keep deleted user data</p>
          </div>

          <div className="pt-4">
            <Button variant="secondary" className="mr-3">Export User Data</Button>
            <Button variant="danger">Delete All Inactive Data</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration & Roles</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Public Registration</label>
              <p className="text-sm text-gray-500">Allow users to register without invitation</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.publicRegistration}
                onChange={(e) => handleSettingChange('publicRegistration', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto-approve New Users</label>
              <p className="text-sm text-gray-500">Automatically activate new user accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoApproveUsers}
                onChange={(e) => handleSettingChange('autoApproveUsers', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default User Role</label>
            <select
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.defaultUserRole}
              onChange={(e) => handleSettingChange('defaultUserRole', e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Users per Institution</label>
            <input
              type="number"
              min="10"
              max="50000"
              step="100"
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.maxUsersPerInstitution}
              onChange={(e) => handleSettingChange('maxUsersPerInstitution', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Permission</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">Student</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">Teacher</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 text-sm text-gray-900">View Content</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900">Create Content</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900">Manage Users</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900">Access Analytics</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">⚠️</td>
                  <td className="text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
              <p className="text-sm text-gray-500">Disable platform access for maintenance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Content Moderation</label>
              <p className="text-sm text-gray-500">Review content before publishing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.contentModeration}
                onChange={(e) => handleSettingChange('contentModeration', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum File Upload Size (MB)</label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.maxFileSize}
              onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Platform Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">v2.1.4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">2024-01-20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Database Size:</span>
                <span className="font-medium">2.4 GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Storage Used:</span>
                <span className="font-medium">15.6 GB</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">System Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Server Status:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 font-medium">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Database:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 font-medium">Connected</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Backup:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 font-medium">Up to date</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-sm text-gray-500">Send system alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <p className="text-sm text-gray-500">Browser push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Weekly Reports</label>
              <p className="text-sm text-gray-500">Automated weekly analytics reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.weeklyReports}
                onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
            <input
              type="text"
              placeholder="smtp.example.com"
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
              <input
                type="number"
                placeholder="587"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>TLS</option>
                <option>SSL</option>
                <option>None</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button variant="secondary">Test Email Configuration</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Security</h1>
          <p className="text-gray-600">Configure platform settings and security policies</p>
        </div>
        <Button onClick={saveSettings} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </Button>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'users' && renderUserSettings()}
          {activeTab === 'platform' && renderPlatformSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
        </div>
      </div>
    </div>
  );
};

export default Settings;