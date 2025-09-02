// Auth helper for dashboard pages
// Checks localStorage for 'authToken', validates it against the API,
// and redirects to `dashboard/index.html` if valid or `../login.html` if invalid/missing.
async function checkAuthAndRedirect() {
    try {
        const token = localStorage.getItem('authToken');
            console.log(token)

        if (!token) {
            // No token -> go to login

            console.log("asdas",token)
            window.location.href = '../login.html';
            return false;
        }

        const res = await fetch('https://api.osmovo.com/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            // Token invalid or server returned error -> clear and redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '../login.html';
            return false;
        }

        const data = await res.json().catch(() => ({}));

        // If response indicates valid user, ensure we're on dashboard
        if (data && (data.id || data.user)) {
            // Already on dashboard page — ensure correct path
            if (!location.pathname.endsWith('/dashboard/index.html') && !location.pathname.endsWith('/dashboard/')) {
                window.location.href = 'index.html';
            }
            return true;
        }

        // Fallback: not valid
        localStorage.removeItem('authToken');
        window.location.href = '../login.html';
        return false;
    } catch (err) {
        console.error('Auth check failed', err);
        localStorage.removeItem('authToken');
        window.location.href = '../login.html';
        return false;
    }
}

// Export for modulesystems (if used)
if (typeof module !== 'undefined') {
    module.exports = { checkAuthAndRedirect };
}


