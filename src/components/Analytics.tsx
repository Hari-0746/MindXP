import React, { useState } from 'react';
import { TrendingUp, Users, BookOpen, Award, Calendar, Download } from 'lucide-react';
import Button from './ui/Button';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');

  // Mock analytics data
  const analyticsData = {
    totalUsers: 15420,
    activeUsers: 12340,
    totalContent: 156,
    completedTasks: 8970,
    ecoPoints: 234560,
    userGrowth: 15.2,
    engagementRate: 68.4,
    contentViews: 89450
  };

  const chartData = {
    userGrowth: [
      { month: 'Jan', users: 1200 },
      { month: 'Feb', users: 1350 },
      { month: 'Mar', users: 1580 },
      { month: 'Apr', users: 1820 },
      { month: 'May', users: 2100 },
      { month: 'Jun', users: 2450 }
    ],
    contentEngagement: [
      { type: 'Articles', views: 35600, completion: 78 },
      { type: 'Videos', views: 28400, completion: 65 },
      { type: 'Tasks', views: 25450, completion: 82 }
    ],
    topInstitutions: [
      { name: 'Green Valley High', students: 1250, points: 45200 },
      { name: 'Central University', students: 3400, points: 89100 },
      { name: 'Tech Community College', students: 890, points: 23400 }
    ]
  };

  const generateReport = () => {
    // Mock report generation
    alert('Report generated successfully! Check your downloads folder.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track platform performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <Button onClick={generateReport} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{analyticsData.userGrowth}% vs last period
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                {((analyticsData.activeUsers / analyticsData.totalUsers) * 100).toFixed(1)}% engagement
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Content Views</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.contentViews.toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1">
                Avg: {Math.round(analyticsData.contentViews / analyticsData.totalContent)} per content
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eco Points</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.ecoPoints.toLocaleString()}</p>
              <p className="text-sm text-orange-600 mt-1">
                {Math.round(analyticsData.ecoPoints / analyticsData.activeUsers)} per user
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="space-y-4">
            {chartData.userGrowth.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.users / Math.max(...chartData.userGrowth.map(d => d.users))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {data.users.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Engagement */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Engagement</h3>
          <div className="space-y-4">
            {chartData.contentEngagement.map((data, index) => (
              <div key={data.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{data.type}</span>
                  <span className="text-sm text-gray-500">{data.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-purple-600' : 'bg-orange-600'
                      }`}
                      style={{ width: `${data.completion}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">{data.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Institutions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Institutions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Eco Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Points per Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.topInstitutions.map((institution, index) => {
                const avgPoints = Math.round(institution.points / institution.students);
                const maxAvg = Math.max(...chartData.topInstitutions.map(i => Math.round(i.points / i.students)));
                const performance = (avgPoints / maxAvg) * 100;
                
                return (
                  <tr key={institution.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{institution.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.students.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {institution.points.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {avgPoints}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${performance}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{Math.round(performance)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Completion Rate</h4>
          <div className="flex items-end space-x-1 h-16">
            {[65, 78, 82, 74, 89, 76, 85].map((value, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">User Activity</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Daily Active</span>
              <span className="text-sm font-medium text-gray-900">8,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Weekly Active</span>
              <span className="text-sm font-medium text-gray-900">12,340</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Monthly Active</span>
              <span className="text-sm font-medium text-gray-900">15,420</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Content Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Most Viewed</span>
              <span className="text-sm font-medium text-gray-900">Climate Change Doc</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Highest Rated</span>
              <span className="text-sm font-medium text-gray-900">Renewable Energy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Most Completed</span>
              <span className="text-sm font-medium text-gray-900">Sustainability Task</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;