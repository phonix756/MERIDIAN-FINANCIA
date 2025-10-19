// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Login functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // Store login state
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else {
                alert('Please enter both username and password');
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

    // Transfer Form Handler
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

        // Form submission
        transferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('amount').value;
            const withdrawalKey = document.getElementById('withdrawalKey').value;
            const transferType = document.getElementById('transferType').value;
            
            // Validate withdrawal key - special number is 7890
            if (withdrawalKey !== '7890') {
                alert('Invalid withdrawal security key. Please check and try again.');
                return;
            }
            
            if (amount && withdrawalKey) {
                let message = `Transfer of $${parseFloat(amount).toFixed(2)} completed successfully!`;
                
                if (transferType === 'external') {
                    message += '\n\nFunds will be available in 1-2 business days.';
                } else if (transferType === 'wire') {
                    message += '\n\nWire transfer initiated. Funds will be available same day.';
                }
                
                alert(message);
                transferForm.reset();
                externalDetails.style.display = 'none';
                updateTransferSummary();
            }
        });
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