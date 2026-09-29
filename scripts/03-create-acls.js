// Elevate to security_admin first, then run in Scripts - Background
(function () {
    var TABLE = 'u_institution_details';

    function roleId(name) {
        var r = new GlideRecord('sys_user_role');
        r.addQuery('name', name);
        r.query();
        return r.next() ? r.getUniqueValue() : null;
    }

    function createAcl(operation, role, opts) {
        opts = opts || {};
        var acl = new GlideRecord('sys_security_acl');
        acl.initialize();
        acl.name = TABLE;
        acl.type = 'record';
        acl.operation = operation;
        acl.active = true;
        acl.admin_overrides = true;
        if (opts.condition) acl.condition = opts.condition;
        if (opts.script) {
            acl.advanced = true;
            acl.script = opts.script;
        }
        var id = acl.insert();

        var link = new GlideRecord('sys_security_acl_role');
        link.initialize();
        link.sys_security_acl = id;
        link.sys_user_role = roleId(role);
        link.insert();
        gs.print(operation + ' ACL created, requires role ' + role);
    }

    var readScript =
        "(function () {\n" +
        "  if (gs.hasRole('admin')) { return true; }\n" +
        "  if (gs.hasRole('bb1')) { return true; }\n" +
        "  return false;\n" +
        "})();";

    createAcl('read',   'bb1', { condition: 'u_branch=EEE', script: readScript });
    createAcl('create', 'bb2');
    createAcl('write',  'bb3');
    createAcl('delete', 'bb4');
})();
