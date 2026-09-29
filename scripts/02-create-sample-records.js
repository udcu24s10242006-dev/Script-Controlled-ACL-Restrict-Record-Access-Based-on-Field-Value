// Run after the table u_institution_details exists (as admin)
(function () {
    var records = [
        { student: 'Praneeth',         faculty: 'ITIL User',          branch: 'ECE', email: 'praneeth@gmail.com',  phone: '8989090906' },
        { student: 'Abraham Lincoln',  faculty: 'Malla Sravan kumar', branch: 'CSE', email: 'sravan@gmail.com',    phone: '8978908989' },
        { student: 'Srinu Nandipalli', faculty: 'ITIL User',          branch: 'ECE', email: 'srinu@gmail.com',     phone: '9089090090' },
        { student: 'Guna Sai',         faculty: 'Abel Tuter',         branch: 'EEE', email: 'saiguna@gmail.com',   phone: '9090898765' },
        { student: 'Yaswanth Nikku',   faculty: 'Abraham Lincoln',    branch: 'CSE', email: 'yaswanth@gmail.com',  phone: '8989898989' },
        { student: 'Prashanth Reddy',  faculty: 'Abel Tuter',         branch: 'EEE', email: 'prashanth@gmail.com', phone: '9090909090' }
    ];

    function findUser(fullName) {
        var u = new GlideRecord('sys_user');
        u.addQuery('name', fullName);
        u.query();
        return u.next() ? u.getUniqueValue() : '';
    }

    records.forEach(function (r) {
        var gr = new GlideRecord('u_institution_details');
        gr.initialize();
        gr.u_student_name = findUser(r.student);
        gr.u_faculty_name = findUser(r.faculty);
        gr.u_branch = r.branch;
        gr.u_email = r.email;
        gr.u_phone_number = r.phone;
        gr.insert();
        gs.print('Inserted record for ' + r.student + ' (' + r.branch + ')');
    });
})();
