import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Shield, 
  Send, 
  Paperclip, 
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Tag,
  Server,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchTicketDetail();
    }
  }, [id]);

  const fetchTicketDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://api.osmovo.com/api/tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.status) {
        setTicket(data.data);
      } else {
        setError(data.message || 'Ticket bulunamadı');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Ticket yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const addResponse = async () => {
    if (!newResponse.trim() && selectedFiles.length === 0) return;
    
    try {
      setSubmitting(true);
      const token = localStorage.getItem('authToken');
      
      const formData = new FormData();
      formData.append('message', newResponse);
      selectedFiles.forEach((file) => {
        formData.append('attachments[]', file);
      });

      const response = await fetch(`https://api.osmovo.com/api/tickets/${id}/responses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is automatically set by the browser when using FormData
        },
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        setNewResponse('');
        setSelectedFiles([]);
        fetchTicketDetail();
      } else {
        setError(data.message || 'Yanıt gönderilirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error adding response:', error);
      setError('Yanıt gönderilirken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    event.target.value = null; // Clear the input so same file can be selected again
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const closeTicket = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://api.osmovo.com/api/tickets/${id}/close`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.status) {
        fetchTicketDetail();
      } else {
        setError(data.message || 'Ticket kapatılırken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error closing ticket:', error);
      setError('Ticket kapatılırken bir hata oluştu');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  const getStatusInfo = (status) => {
    switch (status) {
      case 'new':
        return { 
          icon: AlertCircle, 
          color: 'text-blue-600', 
          bg: 'bg-blue-50 border-blue-200', 
          text: 'Yeni' 
        };
      case 'in_progress':
        return { 
          icon: Clock, 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50 border-yellow-200', 
          text: 'İşlemde' 
        };
      case 'customer_replied':
        return { 
          icon: MessageCircle, 
          color: 'text-orange-600', 
          bg: 'bg-orange-50 border-orange-200', 
          text: 'Müşteri Yanıtladı' 
        };
      case 'admin_replied':
        return { 
          icon: MessageSquare, 
          color: 'text-purple-600', 
          bg: 'bg-purple-50 border-purple-200', 
          text: 'Yetkili Yanıtladı' 
        };
      case 'closed':
        return { 
          icon: CheckCircle2, 
          color: 'text-green-600', 
          bg: 'bg-green-50 border-green-200', 
          text: 'Kapandı' 
        };
      default:
        return { 
          icon: AlertCircle, 
          color: 'text-gray-600', 
          bg: 'bg-gray-50 border-gray-200', 
          text: status 
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return priority;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bir hata oluştu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard/tickets')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(ticket.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard/tickets')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{ticket.title}</h1>
                <p className="text-sm text-gray-500">#{ticket.ticket_number || ticket.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${statusInfo.bg} ${statusInfo.color}`}>
                <StatusIcon className="w-4 h-4 mr-1.5" />
                {statusInfo.text}
              </span>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
                {getPriorityText(ticket.priority)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Action Buttons */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">İşlemler</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/dashboard/tickets')}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>TÜM TALEPLERİM</span>
                  </button>
                  <button
                    onClick={() => document.getElementById('response-textarea')?.focus()}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center space-x-2"
                    disabled={ticket.status === 'closed'}
                  >
                    <Send className="w-4 h-4" />
                    <span>CEVAPLA</span>
                  </button>
                  <button
                    onClick={closeTicket}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex items-center space-x-2"
                    disabled={ticket.status === 'closed'}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>TALEBİ KAPAT</span>
                  </button>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Talep Detayları</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <StatusIcon className={`w-4 h-4 mt-0.5 ${statusInfo.color}`} />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Durum</p>
                      <p className="text-sm font-medium text-gray-900">{statusInfo.text}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Son Cevap</p>
                      <p className="text-sm text-gray-900">{ticket.last_response_at ? formatDate(ticket.last_response_at) : 'Henüz cevap yok'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Oluşturulma</p>
                      <p className="text-sm text-gray-900">{formatDate(ticket.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Tag className="w-4 h-4 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Kategori</p>
                      <p className="text-sm text-gray-900">{ticket.category?.name || 'Genel'}</p>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Messages Container */}
              <div className="divide-y divide-gray-100">
                {/* Initial ticket message */}
           

                {/* Responses */}
                {ticket.responses?.map((response) => {
                  const isAdmin = response.responder_type === 'App\\Models\\Admin';
                  
                  return (
                    <div key={response.id} className="p-6">
                      <div className="flex space-x-4">
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isAdmin ? 'bg-emerald-100' : 'bg-gray-100'
                        }`}>
                          {isAdmin ? (
                            <Shield className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <User className="w-5 h-5 text-gray-600" />
                          )}
                        </div>

                        {/* Message content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-900">
                              {response.responder?.first_name + ' ' + response.responder?.last_name || (isAdmin ? 'Yetkili' : 'Müşteri')}
                            </span>
                            {isAdmin && (
                              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200 font-medium">
                                Yetkili
                              </span>
                            )}
                           
                            <span className="text-xs text-gray-500">
                              {formatDate(response.created_at)}
                            </span>
                          </div>

                          <div className="prose prose-sm max-w-none">
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                              {response.message}
                            </div>
                          </div>

                          {/* Attachments */}
                          {response.attachments && response.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {response.attachments.map((attachment) => (
                                <div 
                                  key={attachment.id}
                                  className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border"
                                >
                                  <Paperclip className="w-4 h-4 text-gray-400" />
                                  <span className="flex-1 truncate font-medium">{attachment.file_name}</span>
                                  <span className="text-xs text-gray-500">({Math.round(attachment.file_size / 1024)} KB)</span>
                                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                                    
                                    <a href={"https://api.osmovo.com/storage/" + attachment.file_path} target="_blank" rel="noopener noreferrer">
                                      <Download className="w-4 h-4" />
                                    </a>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Response form */}
              {ticket.status !== 'closed' && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cevaplanız <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="response-textarea"
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Mesajınızı buraya yazın..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm bg-white"
                      />
                      {selectedFiles.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedFiles.map((file, index) => (
                            <div key={file.name + index} className="flex items-center space-x-1 bg-gray-100 rounded-full pl-3 pr-2 py-1 text-xs font-medium text-gray-700">
                              <span>{file.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
                          >
                            <Paperclip className="w-4 h-4" />
                            <span>Dosya Ekle</span>
                          </button>
                          <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                        <button
                          onClick={addResponse}
                          disabled={(!newResponse.trim() && selectedFiles.length === 0) || submitting}
                          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 text-sm font-medium"
                        >
                          {submitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          <span>{submitting ? 'Gönderiliyor...' : 'Cevapla'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {ticket.status === 'closed' && (
                <div className="p-6 border-t border-gray-200 text-center bg-gray-50">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <XCircle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Talep Kapatıldı</h3>
                    <p className="text-sm text-gray-600">Bu talep kapatılmış. Yeni yanıt eklenemez.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;