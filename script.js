// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Login functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Updated credentials - Username: Trace, Password: adkins
            if (username === 'Trace' && password === 'adkins') {
                // Store login state
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }

    // Check if user is logged in
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        const isLoggedIn = localStorage.getItem('userLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'index.html';
        }
    }

    // Transfer Form Handler with Real Bank Success Message
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        const transferType = document.getElementById('transferType');
        const externalDetails = document.getElementById('externalDetails');
        
        // Show/hide external transfer details
        transferType.addEventListener('change', function() {
            if (this.value === 'external' || this.value === 'wire') {
                externalDetails.style.display = 'block';
            } else {
                externalDetails.style.display = 'none';
            }
        });

        // Update transfer summary
        function updateTransferSummary() {
            const fromAccount = document.getElementById('fromAccount');
            const amount = document.getElementById('amount');
            const transferType = document.getElementById('transferType');
            
            document.getElementById('summaryFrom').textContent = fromAccount.selectedOptions[0]?.text.split(' - ')[0] || '-';
            document.getElementById('summaryAmount').textContent = amount.value ? '$' + parseFloat(amount.value).toFixed(2) : '$0.00';
            
            if (transferType.value === 'internal') {
                document.getElementById('summaryTo').textContent = 'My Account';
            } else if (transferType.value === 'external' || transferType.value === 'wire') {
                document.getElementById('summaryTo').textContent = 'External Account';
            } else {
                document.getElementById('summaryTo').textContent = '-';
            }
        }

        // Add event listeners for summary updates
        document.getElementById('fromAccount').addEventListener('change', updateTransferSummary);
        document.getElementById('amount').addEventListener('input', updateTransferSummary);
        document.getElementById('transferType').addEventListener('change', updateTransferSummary);

        // Form submission with professional success message
        transferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('amount').value;
            const withdrawalKey = document.getElementById('withdrawalKey').value;
            const transferType = document.getElementById('transferType').value;
            
            // Validate withdrawal key - special number is 7890
            if (withdrawalKey !== '7890') {
                showTransferMessage('error', 'Invalid Security Key', 'The withdrawal security key you entered is incorrect. Please check and try again.');
                return;
            }
            
            if (amount && withdrawalKey) {
                // Show processing message
                showTransferMessage('processing', 'Processing Transfer', 'Your transfer is being processed...');
                
                // Simulate bank processing delay
                setTimeout(function() {
                    let details = '';
                    let reference = generateReferenceNumber();
                    
                    if (transferType === 'external') {
                        details = 'Funds will be available to the recipient in 1-2 business days.';
                    } else if (transferType === 'wire') {
                        details = 'Wire transfer completed. Funds will be available same day.';
                    } else {
                        details = 'Transfer completed instantly between your accounts.';
                    }
                    
                    showTransferMessage('success', 'Transfer Completed Successfully', 
                        `Your transfer of $${parseFloat(amount).toFixed(2)} has been processed successfully.<br><br>
                         <strong>Reference Number:</strong> ${reference}<br>
                         <strong>Date & Time:</strong> ${new Date().toLocaleString()}<br><br>
                         ${details}`);
                    
                    // Reset form after successful transfer
                    setTimeout(function() {
                        transferForm.reset();
                        externalDetails.style.display = 'none';
                        updateTransferSummary();
                    }, 3000);
                    
                }, 2000);
            }
        });
    }

    // Professional transfer message display
    function showTransferMessage(type, title, message) {
        // Remove existing message
        const existingMessage = document.getElementById('transferMessage');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.id = 'transferMessage';
        messageDiv.className = `transfer-message ${type}`;
        
        let icon = '';
        if (type === 'success') {
            icon = '✅';
        } else if (type === 'error') {
            icon = '❌';
        } else if (type === 'processing') {
            icon = '⏳';
        }
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="message-icon">${icon}</span>
                <h3>${title}</h3>
            </div>
            <div class="message-content">${message}</div>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Auto-remove error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    // Generate realistic reference number
    function generateReferenceNumber() {
        const prefix = 'MF';
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}${timestamp}${random}`;
    }

    // Add interactive features to all pages
    const actionButtons = document.querySelectorAll('.btn-action, .btn-primary, .btn-secondary');
    actionButtons.forEach(button => {
        if (!button.getAttribute('type') || button.getAttribute('type') !== 'submit') {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('href') && !this.getAttribute('onclick')) {
                    e.preventDefault();
                    const buttonText = this.textContent.trim();
                    
                    if (buttonText.includes('Payment') || buttonText.includes('Transfer') || buttonText.includes('Pay')) {
                        window.location.href = 'transfer.html';
                    } else {
                        alert('This feature is currently unavailable. Please try again later.');
                    }
                }
            });
        }
    });

    // Filter functionality for transaction history
    const filterButton = document.querySelector('.btn-filter');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            alert('Filters applied successfully.');
        });
    }

    // Export functionality
    const exportButton = document.querySelector('.btn-export');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            alert('Transaction history exported successfully.');
        });
    }

    // Print functionality
    const printButton = document.querySelector('.btn-print');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Pagination
    const nextButton = document.querySelector('.btn-pagination.next');
    const prevButton = document.querySelector('.btn-pagination.prev');
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            alert('Loading next page...');
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            alert('Loading previous page...');
        });
    }

    // Logout functionality
    const logoutLinks = document.querySelectorAll('a[href="index.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    });
});

// Add some realistic loading states
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading time for a more realistic experience
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.3s ease';
            mainContent.style.opacity = '1';
        }, 100);
    }
});
