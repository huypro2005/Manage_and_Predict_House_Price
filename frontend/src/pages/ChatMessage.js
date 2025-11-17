import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Search, MoreVertical, ArrowLeft, Phone, Video, 
  Info, Paperclip, Smile, X, Menu 
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// TODO: Replace with your actual API base URL
const BASE_URL = 'http://localhost:8000';

/**
 * ChatMessage Component
 * Giao diện chat đầy đủ với responsive design
 */
function ChatMessage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    isConnected,
    getUnreadCount,
    getTotalUnreadCount,
    markAsRead,
    syncUnreadCounts,
    sendMessage: sendMessageContext,
    subscribeToMessages,
    setCurrentViewingConversation,
  } = useChat();

  // === STATE ===
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentLastMessageId, setCurrentLastMessageId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // Mobile sidebar toggle
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  // === REFS ===
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const selectedChatRef = useRef(selectedChat);
  const lastMarkedMessageIdRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  /**
   * Keep selectedChatRef in sync with selectedChat state
   */
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // === API FUNCTIONS ===

  /**
   * Fetch conversation list from server
   */
  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access') || localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${BASE_URL}/api/v1/conversations/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      const conversations = (data.data || []).map(conv => ({
        id: conv.id,
        name: conv.to_user,
        lastMessage: conv.last_message || '',
        lastMessageId: conv.last_message_id || null, // Lưu last_message_id từ API
        timestamp: conv.time_last_send ? new Date(conv.time_last_send) : new Date(),
        avatar: conv.avatar || null,
        isOnline: conv.is_online || false
      }));

      setChatList(conversations.reverse());
      await fetchUnreadCounts();
    } catch (error) {
      console.error('❌ Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch unread counts from server
   */
  const fetchUnreadCounts = async () => {
    try {
      const token = localStorage.getItem('access') || localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${BASE_URL}/api/v1/messages/unread/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        syncUnreadCounts(data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching unread counts:', error);
    }
  };

  /**
   * Fetch messages for a conversation
   */
  const fetchMessages = async (conversationId, options = {}) => {
    const { append = false, beforeId = null } = options;

    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const token = localStorage.getItem('access') || localStorage.getItem('token');
      if (!token) return;

      let url = `${BASE_URL}/api/v1/conversations/${conversationId}/messages/`;
      if (beforeId) {
        url += `?last_message_id=${beforeId}`;
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      const messagesData = data.data?.data || [];
      const lastMessageId = data.data?.last_message_id;

      const formattedMessages = messagesData.map(msg => ({
        id: msg.id,
        sender: msg.sender,
        senderUsername: msg.sender_username,
        content: msg.content,
        timestamp: new Date(msg.created_at),
        isOwn: msg.sender === user?.id,
        type: msg.type || 'text',
        conversation: msg.conversation,
        status: msg.is_read ? 'read' : 'sent' // read, sent, sending
      }));

      if (append) {
        setMessages(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const newMessages = formattedMessages.filter(m => !existingIds.has(m.id));
          return [...newMessages, ...prev];
        });
      } else {
        setMessages(formattedMessages);
        setTimeout(() => scrollToBottom(), 100);
      }

      // QUAN TRỌNG: Xử lý last_message_id với logic so sánh
      // Chỉ cập nhật nếu:
      // 1. lastMessageId mới > lastMessageId cũ
      // 2. lastMessageId mới = null (hết tin nhắn)
      // 3. Chưa có lastMessageId cũ (lần đầu load)
      const shouldUpdate = () => {
        if (lastMessageId === null) {
          // null = hết tin nhắn, luôn cập nhật
          return true;
        }
        if (currentLastMessageId === null) {
          // Chưa có giá trị cũ, cập nhật
          return true;
        }
        // Chỉ cập nhật nếu giá trị mới lớn hơn
        return lastMessageId > currentLastMessageId;
      };

      if (shouldUpdate()) {
        if (lastMessageId !== undefined && lastMessageId !== null) {
          // Còn tin nhắn để load
          setCurrentLastMessageId(lastMessageId);
          setHasMoreMessages(true);
          console.log('✅ Updated lastMessageId:', {
            old: currentLastMessageId,
            new: lastMessageId,
            reason: 'New value is greater or first time'
          });
        } else {
          // lastMessageId = null -> đã hết tin nhắn
          setCurrentLastMessageId(null);
          setHasMoreMessages(false);
          console.log('🛑 No more messages to load (lastMessageId is null)');
        }
      } else {
        // Không cập nhật vì giá trị mới nhỏ hơn giá trị cũ
        console.log('⚠️ Not updating lastMessageId - new value is smaller:', {
          current: currentLastMessageId,
          new: lastMessageId,
          reason: 'New value is smaller than current, keeping current value'
        });
      }

    } catch (error) {
      console.error('❌ Error fetching messages:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  /**
   * Load more (older) messages
   */
  const loadMoreMessages = async () => {
    // Kiểm tra điều kiện trước khi load
    if (!hasMoreMessages) {
      console.log('🛑 No more messages available');
      return;
    }
    if (!currentLastMessageId || !selectedChat || isLoadingMore) return;

    const container = messagesContainerRef.current;
    const oldScrollHeight = container?.scrollHeight || 0;

    await fetchMessages(selectedChat.id, {
      append: true,
      beforeId: currentLastMessageId
    });

    setTimeout(() => {
      if (container) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - oldScrollHeight;
      }
    }, 100);
  };

  // === WEBSOCKET MESSAGE HANDLING ===

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = subscribeToMessages((messageData) => {
      const conversationId = messageData.conversation;

      // Update conversation list
      setChatList(prev => {
        const updated = prev.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                lastMessage: messageData.content,
                timestamp: new Date(messageData.created_at || new Date())
              }
            : conv
        );

        const idx = updated.findIndex(c => c.id === conversationId);
        if (idx > 0) {
          const [chat] = updated.splice(idx, 1);
          updated.unshift(chat);
        }

        return updated;
      });

      // If viewing this conversation
      const currentChat = selectedChatRef.current;
      if (currentChat && conversationId === currentChat.id) {
        const newMessage = {
          id: messageData.id,
          sender: messageData.sender,
          senderUsername: messageData.sender_username,
          content: messageData.content,
          timestamp: new Date(messageData.created_at || new Date()),
          isOwn: messageData.sender === user?.id,
          type: messageData.type || 'text',
          conversation: messageData.conversation,
          status: 'sent'
        };

        setMessages(prev => {
          if (prev.some(msg => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });

        // Cập nhật lastMessageId khi nhận tin nhắn mới
        // Chỉ cập nhật nếu messageId mới > currentLastMessageId hoặc chưa có giá trị
        const newMessageId = messageData.id;
        if (!currentLastMessageId || newMessageId > currentLastMessageId) {
          setCurrentLastMessageId(newMessageId);
          console.log('🔵 [DEBUG] Updated lastMessageId from new message:', {
            old: currentLastMessageId,
            new: newMessageId
          });
        } else {
          console.log('⚠️ [DEBUG] Not updating lastMessageId from new message - value is smaller:', {
            current: currentLastMessageId,
            new: newMessageId
          });
        }
        setTimeout(() => scrollToBottom('smooth'), 100);

        // Mark as read if not own message
        const isOwnMessage = messageData.sender === user?.id;
        if (!isOwnMessage) {
          setTimeout(() => {
            markAsRead(conversationId, messageData.id);
          }, 500);
        }
      }
    });

    return unsubscribe;
  }, [isAuthenticated, subscribeToMessages, user, markAsRead]);

  // === SCROLL HANDLING ===

  const scrollToBottom = (behavior = 'auto') => {
    isAutoScrollingRef.current = true;

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }

    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 500);
  };

  useEffect(() => {
    if (!selectedChat || messages.length === 0) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (isAutoScrollingRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

        if (isAtBottom && currentLastMessageId && lastMarkedMessageIdRef.current !== currentLastMessageId) {
          markAsRead(selectedChat.id, currentLastMessageId);
          lastMarkedMessageIdRef.current = currentLastMessageId;
        }
      }, 300);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [messages, selectedChat, currentLastMessageId, markAsRead]);

  const handleScroll = (e) => {
    if (e.target.scrollTop < 100 && !isLoadingMore) {
      loadMoreMessages();
    }
  };

  // === LIFECYCLE ===

  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedChat) {
      lastMarkedMessageIdRef.current = null;
      setCurrentViewingConversation(selectedChat.id, user?.id);
      // Reset hasMoreMessages khi chọn conversation mới
      setHasMoreMessages(true);
      fetchMessages(selectedChat.id);
      
      // On mobile, hide sidebar when chat selected
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    } else {
      setCurrentViewingConversation(null, user?.id);
    }
  }, [selectedChat, user?.id, setCurrentViewingConversation]);

  // === USER ACTIONS ===

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedChat) return;

    const messageText = inputMessage.trim();
    setInputMessage('');

    const sent = sendMessageContext({
      action: 'send_message',
      conversation_id: selectedChat.id,
      content: messageText,
      reply: null
    });

    if (!sent) {
      alert('Không thể kết nối. Vui lòng thử lại.');
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowSidebar(true);
  };

  // === UTILITY FUNCTIONS ===

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes}p`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;

    return messageDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatMessageTime = (date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter conversations by search
  const filteredChatList = searchQuery
    ? chatList.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatList;

  const totalUnread = getTotalUnreadCount();

  // === RENDER ===

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Send className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng đến Chat</h2>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để sử dụng tính năng chat</p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all">
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* === SIDEBAR: Conversation List === */}
      <div
        className={`${
          showSidebar ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/') }>
                <span className="text-lg font-bold">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold cursor-pointer" onClick={() => navigate('/') }>Tin nhắn</h2>
                <div className="flex items-center space-x-1 text-xs text-blue-100">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span>{isConnected ? 'Đang hoạt động' : 'Mất kết nối'}</span>
                </div>
              </div>
            </div>
            {totalUnread > 0 && (
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <span className="text-sm font-bold">{totalUnread}</span>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Đang tải cuộc trò chuyện...</p>
            </div>
          ) : filteredChatList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-medium">
                  {searchQuery ? 'Không tìm thấy kết quả' : 'Chưa có cuộc trò chuyện'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Bắt đầu trò chuyện mới'}
                </p>
              </div>
            </div>
          ) : (
            filteredChatList.map((chat) => {
              const unreadCount = getUnreadCount(chat.id);
              const isSelected = selectedChat?.id === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar with online status */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                        {chat.name.charAt(0).toUpperCase()}
                      </div>
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${
                          unreadCount > 0 ? 'text-gray-900' : 'text-gray-800'
                        }`}>
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}>
                          {chat.lastMessage || 'Chưa có tin nhắn'}
                        </p>
                        {unreadCount > 0 && (
                          <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-2 flex-shrink-0">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* === MAIN: Message View === */}
      {selectedChat ? (
        <div
          className={`${
            showSidebar ? 'hidden' : 'flex'
          } md:flex flex-col flex-1 transition-all duration-300`}
        >
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Back button for mobile */}
                <button
                  onClick={handleBackToList}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {selectedChat.name.charAt(0).toUpperCase()}
                  </div>
                  {selectedChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Name and status */}
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
          >
            {/* Loading more indicator */}
            {isLoadingMore && (
              <div className="flex justify-center py-2">
                <div className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-600">Đang tải thêm...</span>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => {
              const showTimestamp = index === 0 || 
                new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();

              return (
                <React.Fragment key={message.id}>
                  {/* Date separator */}
                  {showTimestamp && (
                    <div className="flex justify-center my-4">
                      <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {new Date(message.timestamp).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end space-x-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar for other user's messages */}
                      {!message.isOwn && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {message.senderUsername?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}

                      {/* Message content */}
                      <div className={`group relative`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm'
                              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm shadow-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        {/* Time and status */}
                        <div
                          className={`flex items-center space-x-1 mt-1 text-xs ${
                            message.isOwn ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="text-gray-500">{formatMessageTime(message.timestamp)}</span>
                          {message.isOwn && (
                            <span className="text-blue-600">
                              {message.status === 'read' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              {/* Attachment button */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                <Paperclip className="h-5 w-5 text-gray-600" />
              </button>

              {/* Text input */}
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Nhập tin nhắn..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
                  rows={1}
                  style={{ maxHeight: '120px' }}
                />
                {/* Emoji button */}
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors">
                  <Smile className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            {/* Typing indicator (optional) */}
            {/* <div className="mt-2 text-xs text-gray-500 ml-2">
              <span className="italic">Đang soạn tin...</span>
            </div> */}
          </div>
        </div>
      ) : (
        // No conversation selected - Welcome screen
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <Send className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Chào mừng đến với Chat
            </h3>
            <p className="text-gray-600 mb-6">
              Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin
            </p>
            <div className="flex flex-col space-y-3 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{isConnected ? 'Đã kết nối với server' : 'Đang kết nối lại...'}</span>
              </div>
              {totalUnread > 0 && (
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block">
                  Bạn có {totalUnread} tin nhắn chưa đọc
                </div>
              )}
            </div>
            
            {/* Mobile: Show button to open sidebar */}
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Xem danh sách chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;