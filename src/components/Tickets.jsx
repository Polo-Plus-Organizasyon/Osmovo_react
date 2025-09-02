import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  ChevronRight, 
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Paperclip,
  MessageCircle
} from 'lucide-react';

const ModernTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  
  // Filters
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    title: '',
    message: '',
    ticket_category_id: '',
    priority: 'medium'
  });

  // Response form
  const [newResponse, setNewResponse] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        fetchTickets(),
        fetchCategories(),
        fetchPriorities()
      ]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://api.osmovo.com/api/tickets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.status) {
        setTickets(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.osmovo.com/api/ticket/categories');
      const data = await response.json();
      if (data.status) {
        setCategories(data.ticket_categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPriorities = async () => {
    try {
      const response = await fetch('https://api.osmovo.com/api/ticket/priorityes');
      const data = await response.json();
      if (data.status) {
        setPriorities(data.priorityes || {});
      }
    } catch (error) {
      console.error('Error fetching priorities:', error);
    }
  };

  const fetchTicketDetail = async (ticketId) => {
    // Keep the existing behavior for fetching details when opening modal,
    // but also allow navigation to the ticket page.
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://api.osmovo.com/api/tickets/${ticketId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.status) {
        setSelectedTicket(data.data);
        setShowTicketDetail(true);
      }
    } catch (error) {
      console.error('Error fetching ticket detail:', error);
    }
  };

  const createTicket = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://api.osmovo.com/api/tickets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTicket)
      });
      const data = await response.json();
      if (data.status) {
        setShowNewTicketModal(false);
        setNewTicket({ title: '', message: '', ticket_category_id: '', priority: 'medium' });
        fetchTickets();
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const addResponse = async () => {
    if (!newResponse.trim() || !selectedTicket) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://api.osmovo.com/api/tickets/${selectedTicket.id}/responses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newResponse })
      });
      const data = await response.json();
      if (data.status) {
        setNewResponse('');
        fetchTicketDetail(selectedTicket.id);
      }
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'customer_replied': return <MessageCircle className="w-4 h-4" />;
      case 'admin_replied': return <MessageSquare className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'customer_replied': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'admin_replied': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'closed': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'in_progress': return 'İşlemde';
      case 'customer_replied': return 'Müşteri Yanıtladı';
      case 'admin_replied': return 'Yetkili Yanıtladı';
      case 'closed': return 'Kapandı';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (!filterCategory || ticket.ticket_category_id === parseInt(filterCategory)) &&
      (!filterStatus || ticket.status === filterStatus) &&
      (!filterPriority || ticket.priority === filterPriority) &&
      (!searchTerm || ticket.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Destek Talepleri</h1>
              <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {filteredTickets.length} talep
              </div>
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Talep</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Talep ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Tüm Durumlar</option>
              <option value="new">Yeni</option>
              <option value="answered">Yanıtlandı</option>
              <option value="waiting">Beklemede</option>
              <option value="closed">Kapalı</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Tüm Öncelikler</option>
              {Object.entries(priorities).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(filterCategory || filterStatus || filterPriority || searchTerm) && (
              <button
                onClick={() => {
                  setFilterCategory('');
                  setFilterStatus('');
                  setFilterPriority('');
                  setSearchTerm('');
                }}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Temizle</span>
              </button>
            )}
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Talep bulunamadı</h3>
              <p className="mt-1 text-sm text-gray-500">Aradığınız kriterlere uygun talep bulunmuyor.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {ticket.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1">{getStatusText(ticket.status)}</span>
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {priorities[ticket.priority] || ticket.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{ticket.ticket_number}</span>
                        <span>•</span>
                        <span>{ticket.category?.name}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.created_at)}</span>
                        {ticket.last_response_at && (
                          <>
                            <span>•</span>
                            <span>Son yanıt: {formatDate(ticket.last_response_at)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Yeni Destek Talebi</h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Sorunuzu kısaca özetleyin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newTicket.ticket_category_id}
                    onChange={(e) => setNewTicket({ ...newTicket, ticket_category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Kategori seçiniz</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Öncelik
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {Object.entries(priorities).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj
                  </label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Sorununuzu detaylı bir şekilde açıklayın"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={createTicket}
                  disabled={!newTicket.title || !newTicket.message || !newTicket.ticket_category_id}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Talep Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showTicketDetail && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedTicket.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{selectedTicket.ticket_number}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      <span className="ml-1">{selectedTicket.status}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTicketDetail(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Responses */}
              <div className="space-y-4 mb-6">
                {selectedTicket.responses?.map((response) => (
                  <div key={response.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm text-gray-900">
                          {response.responder?.name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          response.responder_type === 'App\\Models\\Admin' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {response.responder_type === 'App\\Models\\Admin' ? 'Destek' : 'Kullanıcı'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(response.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{response.message}</p>
                    
                    {/* Attachments */}
                    {response.attachments?.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {response.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center space-x-2 text-xs text-gray-500">
                            <Paperclip className="w-3 h-3" />
                            <span>{attachment.file_name}</span>
                            <span>({Math.round(attachment.file_size / 1024)} KB)</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Response */}
              {selectedTicket.status !== 'closed' && (
                <div className="border-t pt-4">
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Yanıtınızı yazın..."
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={addResponse}
                      disabled={!newResponse.trim()}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Yanıt Gönder
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTicketsPage;