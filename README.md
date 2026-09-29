# Script-Controlled ACL – Restrict Record Access Based on Field Value (ServiceNow)

Only users with the `bb1` role can read `u_institution_details` records where **Branch = EEE**.
Admins keep full access. `bb2` = create, `bb3` = write, `bb4` = delete.

## Project structure
```
Complete-Project/
├── README.md
├── .gitignore
├── package.json
├── config/
│   ├── table-definition.json        # table + field spec (create in System Definition > Tables)
│   └── roles-and-acls.json          # roles and ACL summary
├── scripts/
│   ├── 01-create-user-roles.js      # Background script: user EEE User + roles bb1-bb4
│   ├── 02-create-sample-records.js  # Background script: sample ECE/EEE/CSE records
│   └── 03-create-acls.js            # Background script: read/create/write/delete ACLs (needs security_admin)
├── acl/
│   └── read-acl-script.js           # Script pasted in the READ ACL "Script" field
└── docs/
    └── lab-guide.pdf                # Original lab document
```

## How to run (ServiceNow PDI)
1. Log in as admin. Create the table using `config/table-definition.json`.
2. Go to **System Definition > Scripts - Background** and run, in order:
   `01-create-user-roles.js` then `02-create-sample-records.js`.
3. Elevate to **security_admin** (profile menu > Elevate role), then run `03-create-acls.js`
   (or create the ACLs manually as in the lab guide).
4. Impersonate **EEE User** and open `u_institution_details.list` -> only EEE records show.
5. Impersonate **admin** -> all records show.

## Verification
| User | Result |
|------|--------|
| bb1 only | Sees only EEE records |
| No role | No records |
| Admin | All records |
| bb1+bb2 | + New button |
| bb1+bb2+bb3 | + can edit |
| bb1+bb2+bb3+bb4 | + can delete |

## Notes
- The **Data condition** (`branch = EEE`) does the field filtering. The script only checks roles.
- Column names in scripts (`u_branch`, `u_student_name`, ...) depend on how ServiceNow names your fields; check them in the table dictionary.
- Use only in a Personal Developer Instance (PDI), not production.
