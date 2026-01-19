import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, FolderOpen, Archive, BookOpen, BarChart3, Settings, Home, Calendar, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ArchivalSystem = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');

  // Sample data
  const bookshelves = [
    {
      id: 1,
      year: 2024,
      month: 'January',
      books: [
        { id: 101, owner: 'Maria Santos', docCount: 12, status: 'complete' },
        { id: 102, owner: 'Juan Dela Cruz', docCount: 8, status: 'pending' },
        { id: 103, owner: 'Ana Reyes', docCount: 15, status: 'complete' }
      ]
    },
    {
      id: 2,
      year: 2024,
      month: 'February',
      books: [
        { id: 201, owner: 'Pedro Garcia', docCount: 10, status: 'in-progress' },
        { id: 202, owner: 'Carmen Lopez', docCount: 6, status: 'complete' }
      ]
    },
    {
      id: 3,
      year: 2023,
      month: 'December',
      books: [
        { id: 301, owner: 'Roberto Cruz', docCount: 20, status: 'complete' },
        { id: 302, owner: 'Elena Martinez', docCount: 9, status: 'complete' }
      ]
    }
  ];

  const documents = {
    101: [
      { id: 1, name: 'Birth Certificate', type: 'PDF', status: 'complete', cabinet: 'A-12', shelf: '3' },
      { id: 2, name: 'Marriage Contract', type: 'PDF', status: 'complete', cabinet: 'A-12', shelf: '3' },
      { id: 3, name: 'Tax Records', type: 'XLSX', status: 'pending', cabinet: 'B-05', shelf: '2' }
    ],
    102: [
      { id: 1, name: 'Employment Records', type: 'PDF', status: 'in-progress', cabinet: 'C-08', shelf: '1' },
      { id: 2, name: 'Property Deed', type: 'PDF', status: 'complete', cabinet: 'A-15', shelf: '4' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'pending': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const NavItem = ({ icon: Icon, label, section }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setSelectedBook(null);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        activeSection === section
          ? 'bg-blue-50 text-blue-700 border-r-3 border-blue-700'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const filteredBookshelves = bookshelves.filter(shelf => {
    if (filterYear === 'all') return true;
    return shelf.year.toString() === filterYear;
  }).map(shelf => ({
    ...shelf,
    books: shelf.books.filter(book =>
      book.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(shelf => shelf.books.length > 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Archive System</h1>
          <p className="text-sm text-gray-500 mt-1">Document Management</p>
        </div>
        
        <nav className="flex-1 py-4">
          <NavItem icon={Home} label="Dashboard" section="dashboard" />
          <NavItem icon={Archive} label="Archives" section="archives" />
          <NavItem icon={BookOpen} label="Bookshelves" section="bookshelves" />
          <NavItem icon={FileText} label="Status Tracking" section="tracking" />
          <NavItem icon={BarChart3} label="Reports" section="reports" />
          <NavItem icon={Settings} label="Settings" section="settings" />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">© 2026 Archive System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedBook ? `Digital Book - ${selectedBook.owner}` : 'Bookshelves'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedBook ? `${selectedBook.docCount} documents` : 'Manage digital archives and documents'}
              </p>
            </div>
            {selectedBook && (
              <button
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Bookshelves
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {!selectedBook ? (
            <>
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by owner name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                      <option value="all">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bookshelves Grid */}
              {filteredBookshelves.map(shelf => (
                <div key={shelf.id} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {shelf.month} {shelf.year}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shelf.books.map(book => (
                      <div
                        key={book.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedBook(book)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">{book.owner}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(book.status)}`}>
                            {getStatusIcon(book.status)}
                            {book.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {book.docCount} documents
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* Document List View */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cabinet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shelf
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(documents[selectedBook.id] || []).map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{doc.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(doc.status)}`}>
                            {getStatusIcon(doc.status)}
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {doc.cabinet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {doc.shelf}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="Update">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivalSystem;
