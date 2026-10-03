-- V82: Seed note permissions for administrator access.

-- NOTE_READ
INSERT INTO permissions (name, description, resource, action, created_at, updated_at, version)
SELECT 'NOTE_READ', 'Can view notes', 'NOTE', 'READ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
    SELECT 1 FROM permissions WHERE name = 'NOTE_READ'
);

-- NOTE_CREATE
INSERT INTO permissions (name, description, resource, action, created_at, updated_at, version)
SELECT 'NOTE_CREATE', 'Can create notes', 'NOTE', 'CREATE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
    SELECT 1 FROM permissions WHERE name = 'NOTE_CREATE'
);

-- NOTE_UPDATE
INSERT INTO permissions (name, description, resource, action, created_at, updated_at, version)
SELECT 'NOTE_UPDATE', 'Can update notes', 'NOTE', 'UPDATE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
    SELECT 1 FROM permissions WHERE name = 'NOTE_UPDATE'
);

-- NOTE_DELETE
INSERT INTO permissions (name, description, resource, action, created_at, updated_at, version)
SELECT 'NOTE_DELETE', 'Can delete notes', 'NOTE', 'DELETE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
    SELECT 1 FROM permissions WHERE name = 'NOTE_DELETE'
);


-- Give all NOTE permissions to ADMIN
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'ADMIN'
  AND p.name IN (
      'NOTE_READ',
      'NOTE_CREATE',
      'NOTE_UPDATE',
      'NOTE_DELETE'
  )
  AND NOT EXISTS (
      SELECT 1
      FROM role_permissions rp
      WHERE rp.role_id = r.id
        AND rp.permission_id = p.id
  );


-- Propagate permissions from roles to groups
INSERT INTO group_permissions (group_id, permission_id)
SELECT DISTINCT gr.group_id, rp.permission_id
FROM group_roles gr
JOIN role_permissions rp ON rp.role_id = gr.role_id
JOIN permissions p ON p.id = rp.permission_id
WHERE p.name IN (
    'NOTE_READ',
    'NOTE_CREATE',
    'NOTE_UPDATE',
    'NOTE_DELETE'
)
AND NOT EXISTS (
    SELECT 1
    FROM group_permissions gp
    WHERE gp.group_id = gr.group_id
      AND gp.permission_id = rp.permission_id
);