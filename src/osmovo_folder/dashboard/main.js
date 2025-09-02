document.addEventListener('DOMContentLoaded', async () => {
    // Set up session token header for all fetch requests
    
    // Check authentication status first
   
    
    // Original code continues below
    const uploadForm = document.getElementById('upload-form');
    const pdfList = document.getElementById('pdf-list');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');
    const fileInput = document.getElementById('pdf-upload');
    const uploadButtonLabel = document.getElementById('pdf-upload-btn');
    const fileNameDisplay = document.getElementById('file-name-display');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const pdfCount = document.getElementById('pdf-count');
    const modelSelect = document.getElementById('model-select');
    const modelInfo = document.getElementById('model-info');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const clearChat = document.getElementById('clear-chat');
    const clearChatMobile = document.getElementById('clear-chat-mobile');
    const selectAllPdfsBtn = document.getElementById('select-all-pdfs');
    const deleteAllPdfsBtn = document.getElementById('delete-all-pdfs');
    const toggleDocuments = document.getElementById('toggle-documents');
    
    // New conversation management elements
    const conversationSidebar = document.getElementById('conversation-sidebar');
    const toggleConversations = document.getElementById('toggle-conversations');
    const closeConversations = document.getElementById('close-conversations');
    const conversationsList = document.getElementById('conversations-list');
    const newConversationBtn = document.getElementById('new-conversation');
    
    // Conversation state
    let currentConversationId = null;
    let conversations = [];
    
    // Track rate limit status
    let rateLimitStatus = {
        lastCheck: 0,
        anyModelAvailable: true,
        models: {}
    };

    // Set up rate limit check interval (every 30 seconds)
    const RATE_LIMIT_CHECK_INTERVAL = 30000; // 30 seconds
    
    // Chat history management
    const CHAT_HISTORY_KEY = 'pdf_chatbot_history';
    const MAX_HISTORY_LENGTH = 10;
    const MODEL_PREFERENCE_KEY = 'pdf_chatbot_model_preference'; // New key for model preference

    // Load chat history from localStorage when page loads
    function loadChatHistory() {
        const historyJson = localStorage.getItem(CHAT_HISTORY_KEY);
        if (historyJson) {
            const history = JSON.parse(historyJson);
            return history;
        }
        return [];
    }

    // Save message to chat history
    function saveChatMessage(role, content) {
        let history = loadChatHistory();
        
        // Add new message
        history.push({
            role: role,
            content: content
        });
        
        // Keep only the last MAX_HISTORY_LENGTH messages
        if (history.length > MAX_HISTORY_LENGTH) {
            history = history.slice(history.length - MAX_HISTORY_LENGTH);
        }
        
        // Save to localStorage
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
    }

    // Clear chat history from localStorage
    function clearChatHistory() {
        localStorage.removeItem(CHAT_HISTORY_KEY);
    }

    // Load existing PDFs when the page loads
    loadPdfList();
    
    // Load conversations and display chat history
    loadConversations();
    
    // Load available models
    loadAvailableModels();
    
    // Set up rate limit check interval
    setInterval(checkRateLimits, RATE_LIMIT_CHECK_INTERVAL);
    
    

    // Add event listeners for conversation management
    if (toggleConversations) toggleConversations.addEventListener('click', () => {
        // Add specific class for desktop toggle behavior
        conversationSidebar.classList.toggle('md:translate-x-0');
        conversationSidebar.classList.toggle('md:hidden');
        // Still toggle for mobile view
        conversationSidebar.classList.toggle('translate-x-full');
        
        // Toggle active class for arrow rotation
        toggleConversations.classList.toggle('active');
    });
    
    if (closeConversations) closeConversations.addEventListener('click', () => {
        conversationSidebar.classList.add('translate-x-full');
        
        // Remove active class from both toggle buttons when closing
        if (toggleConversations) toggleConversations.classList.remove('active');
        if (toggleConversationsMobile) toggleConversationsMobile.classList.remove('active');
    });
    
    if (newConversationBtn) newConversationBtn.addEventListener('click', startNewConversation);

    // Add event listeners for clear chat buttons
    clearChat.addEventListener('click', handleClearChat);
    clearChatMobile.addEventListener('click', handleClearChat);

    // Add event listeners for new buttons
    if (selectAllPdfsBtn) selectAllPdfsBtn.addEventListener('click', handleSelectAllPdfs);
    if (deleteAllPdfsBtn) deleteAllPdfsBtn.addEventListener('click', handleDeleteAllPdfs);

    // Add toggle-documents button functionality
    if (toggleDocuments) {
        toggleDocuments.addEventListener('click', () => {
            // Add specific class for desktop toggle behavior
            sidebar.classList.toggle('md:translate-x-0');
            sidebar.classList.toggle('md:hidden');
            // Still toggle for mobile view
            sidebar.classList.toggle('translate-x-full');
            
            // Toggle active class for arrow rotation
            toggleDocuments.classList.toggle('active');
        });
    }

    /**
     * Opens a dialog to edit conversation title and saves changes
     * @param {string} conversationId - The ID of the conversation to edit
     * @param {string} currentTitle - The current title of the conversation
     */
    async function editConversationTitle(conversationId, currentTitle) {
        const result = await Swal.fire({
            title: 'Sohbet Başlığını Düzenle',
            input: 'text',
            inputLabel: 'Yeni başlık',
            inputValue: currentTitle,
            showCancelButton: true,
            cancelButtonText: 'İptal',
            confirmButtonText: 'Kaydet',
            confirmButtonColor: '#4f46e5',
            inputValidator: (value) => {
                if (!value.trim()) {
                    return 'Başlık boş olamaz';
                }
            }
        });

        if (result.isConfirmed && result.value) {
            try {
                const response = await fetch(`/conversations/${conversationId}/title`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        title: result.value.trim()
                    })
                });

                if (response.ok) {
                    // Update the conversation in the local array
                    const index = conversations.findIndex(c => c.id === conversationId);
                    if (index !== -1) {
                        conversations[index].title = result.value.trim();
                        // Refresh the conversations display
                        displayConversations();
                    }
                    
                    showNotification('Sohbet başlığı güncellendi', 'success');
                } else {
                    throw new Error('Failed to update conversation title');
                }
            } catch (error) {
                console.error('Error updating conversation title:', error);
                showNotification('Başlık güncellenirken hata oluştu', 'error');
            }
        }
    }

    // Conversation management functions
    async function loadConversations() {
        try {
            const response = await fetch('/conversations/');
            const data = await response.json();
            
            conversations = data.conversations || [];
            displayConversations();
            
            // If no current conversation and we have conversations, load the most recent one
            if (!currentConversationId && conversations.length > 0) {
                loadConversation(conversations[0].id);
            } else if (conversations.length === 0) {
                // Show welcome message if no conversations exist
                displayWelcomeMessage();
            }
        } catch (error) {
            console.error('Error loading conversations:', error);
            displayWelcomeMessage();
        }
    }

    function displayConversations() {
        if (!conversationsList) return;
        
        conversationsList.innerHTML = '';
        
        if (conversations.length === 0) {
            conversationsList.innerHTML = `
                <div class="text-gray-500 text-sm p-3 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-3.774-.829L3 21l1.829-6.226A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
                    </svg>
                    Henüz sohbet yok
                </div>
            `;
            return;
        }
        
        conversations.forEach(conversation => {
            const conversationDiv = document.createElement('div');
            conversationDiv.className = `conversation-item p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border-l-4 group ${
                currentConversationId === conversation.id ? 'bg-primary-50 border-primary-500' : 'border-transparent'
            }`;
            conversationDiv.dataset.conversationId = conversation.id;
            
            const date = new Date(conversation.updatedAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short'
            });
            
            conversationDiv.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-gray-900 truncate text-sm">${conversation.title}</h4>
                        <p class="text-xs text-gray-500 mt-1">${date} • ${conversation.messageCount} mesaj</p>
                    </div>
                    <div class="flex ml-2">
                        <button class="edit-conversation opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700 mr-1" 
                                data-conversation-id="${conversation.id}" title="Sohbeti düzenle">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                        <button class="delete-conversation opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700" 
                                data-conversation-id="${conversation.id}" title="Sohbeti sil">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            // Add click event for loading conversation
            conversationDiv.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-conversation') && !e.target.closest('.edit-conversation')) {
                    loadConversation(conversation.id);
                }
            });
            
            // Add edit event
            const editBtn = conversationDiv.querySelector('.edit-conversation');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editConversationTitle(conversation.id, conversation.title);
                });
            }
            
            // Add delete event
            const deleteBtn = conversationDiv.querySelector('.delete-conversation');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                });
            }
            
            conversationsList.appendChild(conversationDiv);
        });
    }

    async function loadConversation(conversationId) {
        try {
            const response = await fetch(`/conversations/${conversationId}`);
            
            if (!response.ok) {
                throw new Error('Conversation not found');
            }
            
            const conversation = await response.json();
            currentConversationId = conversationId;
            
            // Clear current chat
            chatContainer.innerHTML = '';
            
            // Check if the conversation has no messages, show welcome message if empty
            if (!conversation.messages || conversation.messages.length === 0) {
                displayWelcomeMessage();
            } else {
                // Display conversation messages
                conversation.messages.forEach(message => {
                    if (message.role === 'user') {
                        addMessageToChat('user', message.content);
                    } else if (message.role === 'assistant') {
                        addMessageToChat('bot', message.content);
                    }
                });
            }
            
            // CRITICAL FIX: Update localStorage with conversation messages to keep them in sync
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(conversation.messages || []));
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Update conversation selection in sidebar
            updateConversationSelection();
            
            // Render math if needed
            setTimeout(() => {
                try {
                    renderMath();
                } catch (err) {
                    console.error('Error rendering math:', err);
                }
            }, 100);
            
        } catch (error) {
            console.error('Error loading conversation:', error);
            showNotification('Sohbet yüklenirken hata oluştu', 'error');
        }
    }

    function updateConversationSelection() {
        document.querySelectorAll('.conversation-item').forEach(item => {
            const conversationId = item.dataset.conversationId;
            if (conversationId === currentConversationId) {
                item.classList.add('bg-primary-50', 'border-primary-500');
                item.classList.remove('border-transparent');
            } else {
                item.classList.remove('bg-primary-50', 'border-primary-500');
                item.classList.add('border-transparent');
            }
        });
    }

    async function startNewConversation() {
        currentConversationId = null;
        
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Show welcome message
        displayWelcomeMessage();
        
        // CRITICAL FIX: Clear localStorage history immediately
        clearChatHistory();
        
        // Update conversation selection
        updateConversationSelection();
        
        // Close conversations sidebar on mobile
        if (window.innerWidth < 768) {
            conversationSidebar.classList.add('translate-x-full');
        }
    }

    async function deleteConversation(conversationId) {
        const result = await showConfirmDialog(
            "Sohbeti sil?",
            "Bu sohbet kalıcı olarak silinecek. Bu işlem geri alınamaz."
        );
        
        if (!result.isConfirmed) return;
        
        try {
            const response = await fetch(`/conversations/${conversationId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                // Remove from conversations array
                conversations = conversations.filter(c => c.id !== conversationId);
                
                // If this was the current conversation, start a new one
                if (currentConversationId === conversationId) {
                    if (conversations.length > 0) {
                        loadConversation(conversations[0].id);
                    } else {
                        startNewConversation();
                    }
                }
                
                // Refresh conversations display
                displayConversations();
                
                showNotification('Sohbet silindi', 'success');
            } else {
                throw new Error('Failed to delete conversation');
            }
        } catch (error) {
            console.error('Error deleting conversation:', error);
            showNotification('Sohbet silinirken hata oluştu', 'error');
        }
    }

    function displayWelcomeMessage() {
        chatContainer.innerHTML = '';
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message system';
        welcomeMessage.innerHTML = `
            <div class="flex justify-center">
                <div class="bg-primary-100 p-3 rounded-lg text-primary-700 shadow-sm text-sm">
                    <p>Hoş geldiniz! PDF'lerinizi yükleyin ve sohbete başlayın. Sohbete dahil etmek için kenar çubuğundan PDF'leri seçin.</p>
                </div>
            </div>
        `;
        chatContainer.appendChild(welcomeMessage);
    }

    // Function to check rate limits for currently selected model
    async function checkRateLimits() {
        const selectedModelId = modelSelect.value;
        if (!selectedModelId) return;
        
        try {
            const response = await fetch(`/check-rate-limits/${encodeURIComponent(selectedModelId.split('/').pop())}`);
            const data = await response.json();
            
            if (response.ok) {
                rateLimitStatus.models[selectedModelId] = data;
                rateLimitStatus.lastCheck = Date.now();
                
                // Update UI if the selected model is rate limited
                if (data.exceeded) {
                    const alternativeModel = await findAvailableModel();
                    if (alternativeModel) {
                        showNotification(
                            `Rate limit reached: ${data.reason}`,
                            "warning", 
                            `Switched to ${alternativeModel.name}`
                        );
                        // Select the alternative model
                        modelSelect.value = alternativeModel.id;
                        updateModelInfo();
                    } else {
                        showNotification(
                            "All models are currently rate limited",
                            "error",
                            "Please try again later"
                        );
                        disableChatForm(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error checking rate limits:', error);
        }
    }
    
    // Function to find an available model
    async function findAvailableModel() {
        try {
            const response = await fetch('/get-models/');
            const data = await response.json();
            
            if (data && data.models && data.models.length > 0) {
                const availableModels = data.models.filter(model => 
                    model.allowed && !model.rate_limited
                );
                
                return availableModels.length > 0 ? availableModels[0] : null;
            }
            return null;
        } catch (error) {
            console.error('Error finding available model:', error);
            return null;
        }
    }
    
    // Function to enable/disable chat form
    function disableChatForm(disabled) {
        messageInput.disabled = disabled;
        chatForm.querySelector('button[type="submit"]').disabled = disabled;
        
        if (disabled) {
            messageInput.placeholder = "All models are currently rate limited. Please try again later...";
        } else {
            messageInput.placeholder = "Ask something about your PDFs...";
        }
    }

    // Function to handle clear chat button clicks
    async function handleClearChat() {
        const result = await showConfirmDialog(
            "Geçerli sohbeti temizle?",
            "Bu, bu sohbetteki tüm mesajları silecek ancak sohbet kaydını koruyacaktır."
        );
        
        if (result.isConfirmed) {
            // Clear localStorage FIRST
            clearChatHistory();
            
            // Clear the current conversation file if we have a conversation ID
            if (currentConversationId) {
                try {
                    const response = await fetch(`/conversations/${currentConversationId}/clear`, {
                        method: 'POST'
                    });
                    
                    if (response.ok) {
                        console.log('Server conversation cleared successfully');
                    } else {
                        console.error('Failed to clear conversation on server');
                    }
                } catch (error) {
                    console.error('Error clearing conversation:', error);
                }
            }
            
            // Clear chat container
            chatContainer.innerHTML = '';
            
            // Show welcome message
            displayWelcomeMessage();
            
            // Update conversation selection
            updateConversationSelection();
            
            // Reload conversations list to reflect changes
            loadConversations();
            
            showNotification("Sohbet temizlendi", "success");
        }
    }

    // Mobile sidebar toggle
    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('translate-x-full');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('translate-x-full');
        
        // Remove active class from toggle button when closing
        if (toggleDocuments) toggleDocuments.classList.remove('active');
    });

    uploadButtonLabel.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            uploadButtonLabel.textContent = fileInput.files[0].name;
            fileNameDisplay.textContent = `Selected: ${fileInput.files[0].name}`;
            // Add pulsing effect to the upload button
            const submitBtn = uploadForm.querySelector('button[type="submit"]');
            submitBtn.classList.add('upload-button-pulse');
        } else {
            uploadButtonLabel.textContent = 'Choose PDF...';
            fileNameDisplay.textContent = '';
            // Remove pulsing effect
            const submitBtn = uploadForm.querySelector('button[type="submit"]');
            submitBtn.classList.remove('upload-button-pulse');
        }
    });

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!fileInput.files.length) {
            showNotification('Please select a PDF file to upload.', 'warning');
            return;
        }

        const file = fileInput.files[0];
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            showNotification('Please upload a valid PDF file.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const submitBtn = uploadForm.querySelector('button[type="submit"]');
        const originalSubmitBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>`;

        try {
            const response = await fetch('/upload-pdf/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                fileInput.value = '';
                uploadButtonLabel.textContent = 'Choose PDF...';
                fileNameDisplay.textContent = '';
                loadPdfList();
                showNotification('PDF başarıyla yüklendi!', 'success');
            } else {
                showNotification(data.detail || 'Failed to upload PDF.', 'error');
            }
        } catch (error) {
            console.error('Error uploading PDF:', error);
            showNotification('An error occurred while uploading the PDF.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalSubmitBtnContent;
        }
    });

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        if (!message) return;

        const welcomeMessage = chatContainer.querySelector('.message.system');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Add user message to chat immediately
        addMessageToChat('user', message);
        
        // Save user message to chat history
        saveChatMessage('user', message);

        messageInput.value = '';

        // If no current conversation, create a new one without adding the message again
        if (!currentConversationId) {
            try {
                const response = await fetch('/conversations/', {
                    method: 'POST',
                    body: new URLSearchParams({
                        title: '',
                        first_message: message
                    })
                });
                
                const data = await response.json();
                if (data.status === 'success') {
                    currentConversationId = data.conversation.id;
                    // Don't reload conversations here to avoid message duplication
                    // Just update the conversation selection
                    updateConversationSelection();
                }
            } catch (error) {
                console.error('Error creating conversation:', error);
            }
        }

        const selectedPdfs = getSelectedPdfs();

        const selectedModel = modelSelect.value;
        if (!selectedModel) {
            addMessageToChat('system', 'Please select an AI model to chat with.');
            return;
        }
        
        // Check if the selected model is rate limited
        if (rateLimitStatus.models[selectedModel] && rateLimitStatus.models[selectedModel].exceeded) {
            const alternativeModel = await findAvailableModel();
            if (alternativeModel) {
                addMessageToChat('system', 
                    `The selected model (${selectedModel.split('/').pop()}) has reached its rate limit. ` + 
                    `Automatically switching to ${alternativeModel.name}.`
                );
                
                // Update the model select dropdown
                modelSelect.value = alternativeModel.id;
                updateModelInfo();
                addRateLimitIndicators();
            } else {
                addMessageToChat('system', 
                    'All available models have reached their rate limits. Please try again later.'
                );
                return;
            }
        }

        const formData = new FormData();
        formData.append('message', message);
        formData.append('model', modelSelect.value); // Use potentially updated model
        
        // Add conversation ID if we have one
        if (currentConversationId) {
            formData.append('conversation_id', currentConversationId);
        }
        
        // Add chat history to request
        const chatHistory = loadChatHistory();
        formData.append('chat_history', JSON.stringify(chatHistory));
        
        selectedPdfs.forEach(pdf => {
            formData.append('selected_pdfs', pdf);
        });

        try {
            const loadingMessage = addMessageToChat('bot', '<div class="flex items-center space-x-2"><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div></div>', 'loading');

            const response = await fetch('/chat/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (loadingMessage) {
                loadingMessage.remove();
            } else {
                document.querySelector('.message.loading')?.remove();
            }
            
            if (data.status === 'error') {
                addMessageToChat('system', data.response);
                
                // If it's a rate limit error, trigger a refresh of models
                if (response.status === 429) {
                    await loadAvailableModels();
                }
            } else {
                // Add model used info to the bot response
                let responseContent = data.response;
                if (data.model_used) {
                    responseContent += `\n\n<div class="text-xs text-gray-500 mt-2 pt-1 border-t border-gray-200 user-select-none" style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">Response generated with ${data.model_used}</div>`;
                }
                
                addMessageToChat('bot', responseContent);
                
                // Save bot response to chat history
                saveChatMessage('assistant', data.response);
                
                // Update rate limit information
                if (data.rate_limits) {
                    rateLimitStatus.models[modelSelect.value] = data.rate_limits;
                    addRateLimitIndicators();
                }
                
                // Update current conversation ID if returned
                if (data.conversation_id) {
                    currentConversationId = data.conversation_id;
                }
                
                // Refresh conversations list only after successful response
                if (currentConversationId) {
                    loadConversations();
                }
            }

            renderMath();

            if (window.innerWidth < 768) {
                sidebar.classList.add('translate-x-full');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            document.querySelector('.message.loading')?.remove();
            addMessageToChat('system', 'An error occurred. Please try again.');
        }
    });

    async function loadAvailableModels() {
        try {
            modelSelect.innerHTML = '<option value="">Loading models...</option>';
            const response = await fetch('/get-models/');
            const data = await response.json();
            
            if (data && data.models && data.models.length > 0) {
                modelSelect.innerHTML = '';
                
                // Store rate limit status
                rateLimitStatus.anyModelAvailable = data.any_model_available;
                if (!data.any_model_available) {
                    disableChatForm(true);
                }
                
                // Get previously selected model from localStorage
                const savedModelPreference = localStorage.getItem(MODEL_PREFERENCE_KEY);
                let savedModelAvailable = false;
                let savedModelOption = null;
                
                // First pass - add all models, set disabled for non-allowed ones
                data.models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.id;
                    
                    let displayName = model.name;
                    if (displayName.includes("gemini")) {
                        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                    }
                    
                    option.textContent = displayName;
                    option.dataset.description = model.description || '';
                    option.dataset.context = model.context_length || '';
                    
                    // Disable non-allowed models
                    if (!model.allowed) {
                        option.disabled = true;
                        // displayName += " (Not Allowed)";
                        option.textContent = displayName;
                    } else {
                        // Store rate limit info
                        rateLimitStatus.models[model.id] = {
                            exceeded: model.rate_limited,
                            reason: model.rate_limit_reason || "",
                            usage: model.usage || {}
                        };
                        
                        // Show rate limit status in option text
                        if (model.rate_limited) {
                            option.disabled = true;
                            displayName += " (Rate Limited)";
                            option.textContent = displayName;
                        }
                        
                        // Check if this is the saved model preference
                        if (savedModelPreference === model.id && model.allowed && !model.rate_limited) {
                            savedModelAvailable = true;
                            savedModelOption = option;
                        }
                    }
                    
                    // No longer set selected here - we'll do it after adding all options
                    modelSelect.appendChild(option);
                });
                
                // Selection priority:
                // 1. User's saved preference (if available and not rate limited)
                // 2. Gemini 2.0 Flash (if available and not rate limited)
                // 3. Gemini 2.5 Flash Preview (if available and not rate limited)
                // 4. First available, non-rate-limited model
                
                // Try to select the saved model first
                if (savedModelAvailable && savedModelOption) {
                    savedModelOption.selected = true;
                } 
                // Otherwise fall back to default models
                else {
                    const gemini20Option = modelSelect.querySelector(
                        `option[value*="gemini-2.0-flash"]:not(:disabled)`
                    );
                    const gemini25Option = modelSelect.querySelector(
                        `option[value*="gemini-2.5-flash-preview"]:not(:disabled)`
                    );
                    
                    if (gemini20Option) {
                        gemini20Option.selected = true;
                    } else if (gemini25Option) {
                        gemini25Option.selected = true;
                    } else {
                        // If neither default is available, try to select first allowed non-rate-limited option
                        const firstAllowedOption = modelSelect.querySelector('option:not(:disabled)');
                        if (firstAllowedOption) {
                            firstAllowedOption.selected = true;
                        }
                    }
                }
                
                updateModelInfo();
                
                // Add rate limit status indicators
                addRateLimitIndicators();
                
                // Save the currently selected model (may have changed due to availability)
                if (modelSelect.value) {
                    localStorage.setItem(MODEL_PREFERENCE_KEY, modelSelect.value);
                }
            } else {
                modelSelect.innerHTML = '<option value="">No models available</option>';
            }
        } catch (error) {
            console.error('Error loading models:', error);
            modelSelect.innerHTML = '<option value="">Failed to load models</option>';
        }
    }
    
    // Add visual indicators for rate limits
    function addRateLimitIndicators() {
        const infoIcon = document.getElementById('rate-limit-info');
        if (!infoIcon) return;
        
        const selectedOption = modelSelect.options[modelSelect.selectedIndex];
        if (!selectedOption || !selectedOption.value) return;
        
        const modelId = selectedOption.value;
        const modelStatus = rateLimitStatus.models[modelId];
        
        // Create tooltip element if it doesn't exist
        let tooltip = document.getElementById('rate-limit-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'rate-limit-tooltip';
            tooltip.className = 'rate-limit-tooltip hidden';
            document.body.appendChild(tooltip);
        }
        
        // Set tooltip content based on rate limit status
        if (modelStatus) {
            const usage = modelStatus.usage || {};
            
            if (modelStatus.exceeded) {
                tooltip.innerHTML = `
                    <div class="text-red-500 font-medium">Rate limit reached</div>
                    <div class="mt-1">${modelStatus.reason}</div>
                `;
            } else if (usage.rpm && usage.tpm && usage.rpd) {
                tooltip.innerHTML = `
                    <div class="font-medium mb-2 text-primary-700">Rate Limit Status:</div>
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <span class="font-medium">RPM:</span>
                            <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div class="h-full bg-primary-500 rounded-full" style="width: ${(usage.rpm.current / usage.rpm.limit) * 100}%"></div>
                            </div>
                            <span class="text-xs">${usage.rpm.current}/${usage.rpm.limit}</span>
                        </div>
                        <div>
                            <span class="font-medium">TPM:</span>
                            <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div class="h-full bg-primary-500 rounded-full" style="width: ${(usage.tpm.current / usage.tpm.limit) * 100}%"></div>
                            </div>
                            <span class="text-xs">${formatCompactNumber(usage.tpm.current)}/${formatCompactNumber(usage.tpm.limit)}</span>
                        </div>
                        <div>
                            <span class="font-medium">RPD:</span>
                            <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div class="h-full bg-primary-500 rounded-full" style="width: ${(usage.rpd.current / usage.rpd.limit) * 100}%"></div>
                            </div>
                            <span class="text-xs">${usage.rpd.current}/${usage.rpd.limit}</span>
                        </div>
                    </div>
                `;
            } else {
                tooltip.innerHTML = `<div>Rate limit information not available</div>`;
            }
            
            // Change icon color based on status
            if (infoIcon) {
                if (modelStatus.exceeded) {
                    infoIcon.querySelector('svg').classList.add('text-red-500');
                } else {
                    infoIcon.querySelector('svg').classList.remove('text-red-500');
                }
            }
        }
        
        // Remove previous event listeners to avoid duplicates
        infoIcon.removeEventListener('mouseenter', showTooltip);
        infoIcon.removeEventListener('mouseleave', hideTooltip);
        infoIcon.removeEventListener('touchstart', toggleTooltip);
        
        // Add hover event listeners to show/hide tooltip
        infoIcon.addEventListener('mouseenter', showTooltip);
        infoIcon.addEventListener('mouseleave', hideTooltip);
        
        // Add touch event for mobile
        infoIcon.addEventListener('touchstart', toggleTooltip);
        
        // Function to position and show tooltip
        function showTooltip(e) {
            const rect = infoIcon.getBoundingClientRect();
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Position tooltip in the center on mobile
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.maxWidth = '90vw'; // Limit width on mobile
            } else {
                // Position to the left on desktop to avoid right edge overflow
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.left = `${rect.left - 100}px`; 
                tooltip.style.transform = '';
                tooltip.style.maxWidth = '320px';
            }
            tooltip.classList.remove('hidden');
            
            // Ensure tooltip is within viewport
            setTimeout(() => {
                const tooltipRect = tooltip.getBoundingClientRect();
                
                // Adjust if too far right
                if (tooltipRect.right > window.innerWidth - 10) {
                    tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`;
                    tooltip.style.transform = '';
                }
                
                // Adjust if too far left
                if (tooltipRect.left < 10) {
                    tooltip.style.left = '10px';
                    tooltip.style.transform = '';
                }
            }, 0);
        }
        
        // Hide tooltip
        function hideTooltip() {
            tooltip.classList.add('hidden');
        }
        
        // Toggle tooltip for touch devices
        function toggleTooltip(e) {
            e.preventDefault(); // Prevent other touch events
            
            if (tooltip.classList.contains('hidden')) {
                // Hide any other open tooltips
                document.querySelectorAll('.rate-limit-tooltip:not(.hidden)').forEach(t => {
                    if (t !== tooltip) t.classList.add('hidden');
                });
                
                showTooltip(e);
                
                // Close tooltip when clicked outside
                setTimeout(() => {
                    document.addEventListener('touchstart', closeTooltipOnOutsideClick);
                }, 10);
            } else {
                hideTooltip();
            }
        }
        
        // Close tooltip when clicked outside
        function closeTooltipOnOutsideClick(e) {
            if (!tooltip.contains(e.target) && !infoIcon.contains(e.target)) {
                hideTooltip();
                document.removeEventListener('touchstart', closeTooltipOnOutsideClick);
            }
        }
        
        // Remove legacy rate limit container if it exists
        const oldContainer = document.getElementById('rate-limit-status');
        if (oldContainer) {
            oldContainer.remove();
        }
    }

    // Format large numbers to compact form (like 1.2M)
    function formatCompactNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    modelSelect.addEventListener('change', function() {
        updateModelInfo();
        addRateLimitIndicators();
        
        // Save the selected model to localStorage
        if (modelSelect.value) {
            localStorage.setItem(MODEL_PREFERENCE_KEY, modelSelect.value);
        }
    });

    function updateModelInfo() {
        const selectedOption = modelSelect.options[modelSelect.selectedIndex];
        if (selectedOption && selectedOption.dataset.context) {
            // Add the info icon next to the context window size
            modelInfo.innerHTML = `${formatNumber(selectedOption.dataset.context)} tokens 
                <span class="rate-limit-info-icon ml-1" id="rate-limit-info">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>`;
        } else {
            modelInfo.textContent = '';
        }
    }

    function formatNumber(num) {
        return parseInt(num).toLocaleString();
    }

    async function loadPdfList() {
        try {
            const response = await fetch('/list-pdfs/');
            const data = await response.json();

            pdfList.innerHTML = '';

            if (data.pdfs.length === 0) {
                pdfList.innerHTML = `
                    <div class="pdf-empty-state">
                        <div class="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 pdf-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p>Henüz PDF yüklenmedi</p>
                            <p class="text-xs mt-2">Başlamak için bir PDF yükleyin</p>
                        </div>
                    </div>`;
                updatePdfCount(0);
                hideScrollIndicator();
                return;
            }

            updatePdfCount(data.pdfs.length);

            const listContainer = document.createElement('div');
            
            data.pdfs.forEach(pdf => {
                const li = document.createElement('li');
                li.className = 'pdf-item flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 ease-in-out hover:bg-primary-100 cursor-pointer border border-transparent';
                li.dataset.filename = pdf;

                const checkboxContainer = document.createElement('div');
                checkboxContainer.className = 'flex items-center flex-1 min-w-0';

                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'relative flex items-center';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'pdf-checkbox h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500';
                checkbox.id = `pdf-${pdf.replace(/[^a-zA-Z0-9]/g, '-')}`;
                checkbox.dataset.filename = pdf;
                checkbox.addEventListener('change', function() {
                    li.classList.toggle('selected', this.checked);
                });

                checkboxDiv.appendChild(checkbox);
                
                const pdfIcon = document.createElement('div');
                pdfIcon.className = 'pdf-icon ml-2';
                pdfIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                `;

                const nameSpan = document.createElement('span');
                nameSpan.className = 'pdf-filename';
                nameSpan.title = pdf;
                nameSpan.textContent = pdf;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'pdf-delete-btn ml-2 flex items-center justify-center';
                deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>`;
                deleteBtn.title = 'Delete PDF';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    deletePdf(pdf);
                };

                checkboxContainer.appendChild(checkboxDiv);
                checkboxContainer.appendChild(pdfIcon);
                checkboxContainer.appendChild(nameSpan);

                li.appendChild(checkboxContainer);
                li.appendChild(deleteBtn);

                li.addEventListener('click', (e) => {
                    if (e.target !== deleteBtn && !deleteBtn.contains(e.target) && e.target !== checkbox) {
                        checkbox.checked = !checkbox.checked;
                        const event = new Event('change', { bubbles: true });
                        checkbox.dispatchEvent(event);
                    }
                });

                li.classList.add('pdf-item-new');
                
                listContainer.appendChild(li);
            });
            
            const endMarker = document.createElement('div');
            endMarker.className = 'pdf-list-end-marker';
            endMarker.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
                <span>Listenin Sonu</span>
            `;
            listContainer.appendChild(endMarker);
            
            pdfList.appendChild(listContainer);

            setTimeout(checkScrollIndicator, 100);
            
            adjustContainerHeights();

            if (selectAllPdfsBtn) {
                const checkboxes = document.querySelectorAll('.pdf-checkbox');
                const anyCheckboxes = checkboxes.length > 0;
                const allChecked = anyCheckboxes && Array.from(checkboxes).every(cb => cb.checked);
                
                selectAllPdfsBtn.innerHTML = allChecked ? 
                    `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 110-2H9a1 1 0 01-1-1z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>Tümünün Seçimini Kaldır` : 
                    `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 110-2H9a1 1 0 01-1-1z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2-2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>Tümünü Seçin`;
                
                if (deleteAllPdfsBtn) {
                    deleteAllPdfsBtn.disabled = !anyCheckboxes;
                    deleteAllPdfsBtn.classList.toggle('opacity-50', !anyCheckboxes);
                    deleteAllPdfsBtn.classList.toggle('cursor-not-allowed', !anyCheckboxes);
                }
            }
        } catch (error) {
            console.error('Error loading PDF list:', error);
            pdfList.innerHTML = '<li class="text-red-500 p-2">Failed to load PDFs. Please try again.</li>';
        }
    }

    function updatePdfCount(count) {
        pdfCount.textContent = count.toString();
        pdfCount.classList.toggle('hidden', count === 0);
    }

    async function deletePdf(filename) {
        const result = await showConfirmDialog(`"${filename}" silinsin mi?`, "Bu eylem geri alınamaz.");
        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`/delete-pdf/${encodeURIComponent(filename)}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.status === 'success') {
                loadPdfList();
                showNotification(`"${filename}" deleted successfully.`, 'success');
            } else {
                showNotification(data.detail || 'Failed to delete PDF.', 'error');
            }
        } catch (error) {
            console.error('Error deleting PDF:', error);
            showNotification('An error occurred while deleting the PDF.', 'error');
        }
    }

    function getSelectedPdfs() {
        const checkboxes = document.querySelectorAll('.pdf-checkbox:checked');
        return Array.from(checkboxes).map(checkbox => checkbox.dataset.filename);
    }

    function addMessageToChat(sender, content, className = '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-wrapper ${sender} ${className} mb-4 flex`;

        let bubbleClass = 'p-3 rounded-xl max-w-[70%] shadow-md break-words overflow-hidden ';
        let alignmentClass = '';

        if (sender === 'user') {
            bubbleClass += 'bg-primary-600 text-white rounded-br-none';
            alignmentClass = 'justify-end';
        } else if (sender === 'bot') {
            bubbleClass += 'bg-gray-100 text-gray-800 rounded-bl-none';
            alignmentClass = 'justify-start';
        } else {
            bubbleClass += 'bg-secondary-100 text-secondary-700 text-sm mx-auto';
            alignmentClass = 'justify-center';
            messageDiv.classList.add('my-4');
        }
        messageDiv.classList.add(alignmentClass);

        const messageContentDiv = document.createElement('div');
        messageContentDiv.className = bubbleClass + " relative";

        if (sender === 'user') {
            messageContentDiv.textContent = content;
        } else if (sender === 'bot') {
            // Parse Markdown content for bot messages
            if (!className.includes('loading')) {
                try {
                    // Configure marked.js renderer
                    const renderer = new marked.Renderer();
                    
                    // Preserve original code block rendering
                    const originalCodeRenderer = renderer.code;
                    renderer.code = function(code, language) {
                        if (language) {
                            return `<pre class="language-${language} rounded-md bg-gray-800 p-3 my-2 overflow-x-auto"><code class="language-${language} text-gray-100">${escapeHTML(code)}</code></pre>`;
                        }
                        return originalCodeRenderer.call(this, code, language);
                    };
                    
                    // Use marked.js to parse Markdown
                    marked.setOptions({
                        renderer: renderer,
                        highlight: function(code, lang) {
                            return code;
                        },
                        pedantic: false,
                        gfm: true,
                        breaks: true,
                        sanitize: false,
                        smartypants: false,
                        xhtml: false
                    });
                    
                    // Convert markdown to HTML
                    const parsedContent = marked.parse(content);
                    messageContentDiv.innerHTML = parsedContent;
                } catch (err) {
                    console.error('Error parsing markdown:', err);
                    // Fall back to original method if parsing fails
                    if (content.includes('```')) {
                        content = handleNestedCodeBlocks(content);
                    }
                    messageContentDiv.innerHTML = content;
                }
            } else {
                messageContentDiv.innerHTML = content;
            }
            
            // Process mathematical expressions in the content with a slight delay
            // to ensure the DOM is fully updated
            setTimeout(() => {
                try {
                    renderMath();
                    // Add copy buttons to visual elements after math rendering
                    addCopyButtonsToElements(messageContentDiv);
                } catch (err) {
                    console.error('Error rendering math expressions:', err);
                }
            }, 50);
            
            // Add copy button to bot messages only if not a loading message
            if (!className.includes('loading')) {
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button group-hover:opacity-100';
                copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 9a2 2 0 002-2h6a2 2 0 002 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                `;
                copyButton.title = "Copy response";
                copyButton.onclick = (e) => {
                    e.stopPropagation();
                    copyMessageContent(messageContentDiv);
                    
                    // Show visual feedback on button click
                    copyButton.classList.add('success');
                    copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    `;
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyButton.classList.remove('success');
                        copyButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 9a2 2 0 002-2h6a2 2 0 002 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                            </svg>
                        `;
                    }, 2000);
                };
                messageContentDiv.appendChild(copyButton);
                
                // Add hover class to make the content div a "group"
                messageContentDiv.classList.add('group');
            }
        } else {
            messageContentDiv.innerHTML = content;
        }

        messageDiv.appendChild(messageContentDiv);
        chatContainer.appendChild(messageDiv);

        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        return messageDiv;
    }

    // New function to add copy buttons to specific elements within a bot message
    function addCopyButtonsToElements(messageContentDiv) {
        // Process code blocks
        messageContentDiv.querySelectorAll('pre').forEach(pre => {
            addCopyButtonToElement(pre, () => {
                const code = pre.querySelector('code');
                return code ? code.innerText : pre.innerText;
            });
        });

        // Process math equations (KaTeX)
        messageContentDiv.querySelectorAll('.katex-display').forEach(math => {
            addCopyButtonToElement(math, () => {
                // Extract LaTeX from katex-mathml element
                const mathml = math.querySelector('.katex-mathml annotation');
                return mathml ? mathml.textContent : math.textContent;
            });
        });

        // Process MathJax equations
        messageContentDiv.querySelectorAll('mjx-container[jax="CHTML"][display="true"]').forEach(math => {
            addCopyButtonToElement(math, () => {
                // Try to extract the original TeX notation if present
                const originalTeX = math.getAttribute('data-original-tex');
                if (originalTeX) return originalTeX;
                
                // Fallback to textContent (which will be the rendered form, not ideal)
                return math.textContent;
            });
        });

        // Process tables
        messageContentDiv.querySelectorAll('table').forEach(table => {
            addCopyButtonToElement(table, () => {
                // Create a CSV-like representation of the table
                let csv = [];
                
                // Process headers
                const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
                if (headers.length > 0) {
                    csv.push(headers.join('\t'));
                }
                
                // Process rows
                table.querySelectorAll('tr').forEach(tr => {
                    if (!tr.querySelector('th') || headers.length === 0) { // Skip header row if already processed
                        const rowData = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
                        if (rowData.length > 0) {
                            csv.push(rowData.join('\t'));
                        }
                    }
                });
                
                return csv.join('\n');
            });
        });

        // Process images - wrap in container if not already
        messageContentDiv.querySelectorAll('img:not(.element-copy-btn ~ img)').forEach(img => {
            // Only process images that don't already have a copy button
            if (!img.nextElementSibling || !img.nextElementSibling.classList.contains('element-copy-btn')) {
                const parent = img.parentElement;
                
                // If parent is not a container, wrap the image
                if (!parent.classList.contains('image-container')) {
                    const container = document.createElement('div');
                    container.className = 'image-container';
                    img.parentNode.insertBefore(container, img);
                    container.appendChild(img);
                    
                    // Add copy button to copy image URL
                    addCopyButtonToElement(container, () => img.src);
                }
            }
        });
    }

    // Helper to add a copy button to an element
    function addCopyButtonToElement(element, getContentCallback) {
        // Skip if already has a copy button
        if (element.querySelector('.element-copy-btn')) {
            return;
        }
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'element-copy-btn';
        copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
            </svg>
        `;
        copyBtn.title = "Copy content";
        
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const content = getContentCallback();
            
            navigator.clipboard.writeText(content).then(() => {
                // Show success state
                copyBtn.classList.add('success');
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                `;
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyBtn.classList.remove('success');
                    copyBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                        </svg>
                    `;
                }, 2000);
                
                showNotification('Content copied to clipboard', 'success');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showNotification('Failed to copy content', 'error');
            });
        });
        
        element.appendChild(copyBtn);
    }

    // Update the renderMath function to call addCopyButtonsToElements after rendering
    function renderMath() {
        // Get the latest bot message to target specifically
        const latestMessages = document.querySelectorAll('.message-wrapper.bot:not(.loading)');
        const latestMessage = latestMessages[latestMessages.length - 1];
        
        // Use MathJax for rendering
        if (window.MathJax) {
            if (latestMessage) {
                // Only typeset the newest message for better performance
                MathJax.typeset([latestMessage]);
            } else {
                // Typeset all content if no specific message is found
                MathJax.typeset();
            }
        }
        
        // Use KaTeX for rendering
        if (window.renderMathInElement) {
            try {
                // Configure KaTeX auto-render
                const renderOptions = {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ],
                    throwOnError: false,
                    strict: false
                };
                
                if (latestMessage) {
                    // Render math only in the latest message
                    renderMathInElement(latestMessage, renderOptions);
                    
                    // Add copy buttons to all visual elements in the latest message
                    addCopyButtonsToElements(latestMessage);
                } else {
                    // Render all math expressions in the chat container
                    renderMathInElement(document.getElementById('chat-container'), renderOptions);
                }
            } catch (error) {
                console.error('KaTeX rendering error:', error);
            }
        }
    }

    function displayChatHistory() {
        // If we have a current conversation ID, don't load from localStorage
        // as the conversation should be loaded from server
        if (currentConversationId) {
            return;
        }
        
        const history = loadChatHistory();

        // Eğer hiç geçmiş yoksa veya boşsa hoşgeldiniz mesajı göster
        if (!history || history.length === 0) {
            displayWelcomeMessage();
            return;
        }

        // Remove the welcome message if there's chat history
        const welcomeMessage = chatContainer.querySelector('.message.system');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        // Display each message from the history
        history.forEach(msg => {
            if (msg.role === 'user') {
                addMessageToChat('user', msg.content);
            } else if (msg.role === 'assistant') {
                addMessageToChat('bot', msg.content);
            }
        });
        
        // Scroll to bottom after adding all messages
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Render all math expressions after loading chat history
        // Use a small delay to ensure DOM is ready
        setTimeout(() => {
            try {
                renderMath();
            } catch (err) {
                console.error('Error rendering math:', err);
            }
        }, 100);
    }

    function showNotification(title, iconType = 'info', text = '') {
        Swal.fire({
            title: title,
            text: text,
            icon: iconType,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
    }

    function showConfirmDialog(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal',
            position: 'center',
            target: document.body,
            heightAuto: false,
            customClass: {
                container: 'swal-overlay-container',
                popup: 'swal-overlay-popup'
            }
        });
    }

    function checkScrollIndicator() {
        if (pdfList.scrollHeight > pdfList.clientHeight + 20) {
            showScrollIndicator();
        } else {
            hideScrollIndicator();
        }
    }

    function showScrollIndicator() {
        scrollIndicator.classList.remove('hidden');
    }

    function hideScrollIndicator() {
        scrollIndicator.classList.add('hidden');
    }

    pdfList.addEventListener('scroll', function() {
        const scrollDistance = pdfList.scrollHeight - pdfList.scrollTop - pdfList.clientHeight;
        
        if (scrollDistance < 20) {
            hideScrollIndicator();
        } else if (pdfList.scrollHeight > pdfList.clientHeight + 20) {
            showScrollIndicator();
        }
    });

    window.addEventListener('resize', function() {
        checkScrollIndicator();
    });
    
    setTimeout(checkScrollIndicator, 100);

    function adjustContainerHeights() {
        if (window.innerWidth >= 768) {
            return;
        }
        
        const sidebar = document.getElementById('sidebar');
        const uploadForm = document.getElementById('upload-form');
        const pdfListContainer = document.querySelector('.pdf-list-container');
        const headerHeight = sidebar.querySelector('.bg-gradient-to-r').offsetHeight;
        const uploadFormHeight = uploadForm.offsetHeight;
        const titleSectionHeight = document.querySelector('.flex.justify-between.items-center.mb-3').offsetHeight;
        
        const availableHeight = sidebar.clientHeight - headerHeight - uploadFormHeight - titleSectionHeight - 40;
        
        if (availableHeight > 100) {
            pdfListContainer.style.height = `${availableHeight}px`;
        }
    }

    window.addEventListener('resize', adjustContainerHeights);

    setTimeout(adjustContainerHeights, 200);

    function handleSelectAllPdfs() {
        const checkboxes = document.querySelectorAll('.pdf-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
            
            const event = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(event);
        });
        
        selectAllPdfsBtn.innerHTML = !allChecked ? 
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 110-2H9a1 1 0 01-1-1z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
             </svg>Tümünün Seçimini Kaldır` : 
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 110-2H9a1 1 0 01-1-1z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2-2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
             </svg>Tümünü Seçin`;
    }

    async function handleDeleteAllPdfs() {
        const pdfItems = document.querySelectorAll('.pdf-item');
        if (pdfItems.length === 0) {
            showNotification('Silinecek PDF yok', 'info');
                       return;
        }
        
        const result = await showConfirmDialog(
            "Tüm PDF'leri silelim mi?",
            "Bu, yüklediğiniz tüm PDF'leri silecektir. Bu işlem geri alınamaz."
        );
        
        if (!result.isConfirmed) return;
        
        deleteAllPdfsBtn.disabled = true;
        const originalBtnHTML = deleteAllPdfsBtn.innerHTML;
        deleteAllPdfsBtn.innerHTML = `
            <svg class="animate-spin h-4 w-4 mr-1 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Deleting...
        `;
        
        try {
            const pdfFilenames = Array.from(pdfItems).map(item => item.dataset.filename);
            let failedCount = 0;
            
            for (const filename of pdfFilenames) {
                try {
                    const response = await fetch(`/delete-pdf/${encodeURIComponent(filename)}`, {
                        method: 'DELETE'
                    });
                    
                    if (!response.ok) {
                        failedCount++;
                    }
                } catch (error) {
                    console.error(`Error deleting PDF ${filename}:`, error);
                    failedCount++;
                }
            }
            
            loadPdfList();
            
            if (failedCount === 0) {
                showNotification(`Successfully deleted all PDFs`, 'success');
            } else {
                showNotification(`Deleted ${pdfFilenames.length - failedCount} PDFs. ${failedCount} failed.`, 'warning');
            }
        } catch (error) {
            console.error('Error during bulk delete:', error);
            showNotification('An error occurred while deleting PDFs', 'error');
        } finally {
            deleteAllPdfsBtn.disabled = false;
            deleteAllPdfsBtn.innerHTML = originalBtnHTML;
        }
    }

    function displayChatHistory() {
        // If we have a current conversation ID, don't load from localStorage
        // as the conversation should be loaded from server
        if (currentConversationId) {
            return;
        }
        
        const history = loadChatHistory();

        // Eğer hiç geçmiş yoksa veya boşsa hoşgeldiniz mesajı göster
        if (!history || history.length === 0) {
            displayWelcomeMessage();
            return;
        }

        // Remove the welcome message if there's chat history
        const welcomeMessage = chatContainer.querySelector('.message.system');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        // Display each message from the history
        history.forEach(msg => {
            if (msg.role === 'user') {
                addMessageToChat('user', msg.content);
            } else if (msg.role === 'assistant') {
                addMessageToChat('bot', msg.content);
            }
        });
        
        // Scroll to bottom after adding all messages
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Render all math expressions after loading chat history
        // Use a small delay to ensure DOM is ready
        setTimeout(() => {
            try {
                renderMath();
            } catch (err) {
                console.error('Error rendering math:', err);
            }
        }, 100);
    }

    // Function to copy message content to clipboard
    function copyMessageContent(messageContentDiv) {
        // Clone the element to work with it safely
        const clonedContent = messageContentDiv.cloneNode(true);
        
        // Remove the copy button from the clone
        const copyButton = clonedContent.querySelector('.copy-button');
        if (copyButton) {
            copyButton.remove();
        }
        
        // Remove any other buttons like element-copy-btn
        clonedContent.querySelectorAll('.element-copy-btn').forEach(btn => btn.remove());
        
        // Get the text content, preserving whitespace
        let textContent = clonedContent.innerText || clonedContent.textContent;
        
        // Remove the model info footer if present
        const modelInfoRegex = /Response generated with .+$/;
        textContent = textContent.replace(modelInfoRegex, '').trim();
        
        // Copy to clipboard
        navigator.clipboard.writeText(textContent).then(() => {
            // Show success indicator
            const originalCopyButton = messageContentDiv.querySelector('.copy-button');
            if (originalCopyButton) {
                const originalHTML = originalCopyButton.innerHTML;
                originalCopyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                `;
                
                // Reset back to original after a delay
                setTimeout(() => {
                    originalCopyButton.innerHTML = originalHTML;
                }, 2000);
            }
            
            showNotification('Message copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            showNotification('Failed to copy message content', 'error');
        });
    }
    
    // Helper function to escape HTML characters for code block display
    function escapeHTML(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
    }
    
    // Function to handle nested code blocks
    function handleNestedCodeBlocks(content) {
        // ...existing code or implement if missing...
        // This is a placeholder as the implementation depends on your specific needs
        return content;
    }

    // Add drag and drop functionality
    const dropZone = document.querySelector('.pdf-list-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('border-2', 'border-primary-500', 'border-dashed');
    }

    function unhighlight(e) {
        dropZone.classList.remove('border-2', 'border-primary-500', 'border-dashed');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type === 'application/pdf') {
            fileInput.files = files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        } else {
            showNotification('Please drop a valid PDF file.', 'warning');
        }
    }
});

