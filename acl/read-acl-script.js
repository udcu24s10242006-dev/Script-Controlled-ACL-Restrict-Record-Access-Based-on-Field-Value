(function () {
    // Admins keep full access
    if (gs.hasRole('admin')) {
        return true;
    }
    // bb1 passes the script; the Data condition (Branch is EEE) limits rows to EEE
    if (gs.hasRole('bb1')) {
        return true;
    }
    // Deny everyone else
    return false;
})();
