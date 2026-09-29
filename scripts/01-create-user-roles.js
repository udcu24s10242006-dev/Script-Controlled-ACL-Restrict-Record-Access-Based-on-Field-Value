// Run in: System Definition > Scripts - Background (as admin)
(function () {
    var user = new GlideRecord('sys_user');
    user.addQuery('user_name', 'EEEUser');
    user.query();
    var userId;
    if (user.next()) {
        userId = user.getUniqueValue();
    } else {
        user.initialize();
        user.user_name = 'EEEUser';
        user.first_name = 'EEE';
        user.last_name = 'User';
        user.email = 'eeeuser@gmail.com';
        user.active = true;
        userId = user.insert();
    }
    gs.print('User sys_id: ' + userId);

    ['bb1', 'bb2', 'bb3', 'bb4'].forEach(function (name) {
        var role = new GlideRecord('sys_user_role');
        role.addQuery('name', name);
        role.query();
        var roleId;
        if (role.next()) {
            roleId = role.getUniqueValue();
        } else {
            role.initialize();
            role.name = name;
            role.description = 'Role ' + name + ' for ACL lab';
            roleId = role.insert();
        }

        var has = new GlideRecord('sys_user_has_role');
        has.addQuery('user', userId);
        has.addQuery('role', roleId);
        has.query();
        if (!has.hasNext()) {
            has.initialize();
            has.user = userId;
            has.role = roleId;
            has.insert();
        }
        gs.print('Role ready and assigned: ' + name);
    });
})();
