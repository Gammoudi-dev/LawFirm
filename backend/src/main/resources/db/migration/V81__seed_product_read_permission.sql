-- V81: Seed product read permission for administrator access.
INSERT INTO permissions (name, description, resource, action, created_at, updated_at, version)
SELECT 'PRODUCT_READ', 'Can view products', 'PRODUCT', 'READ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
    SELECT 1 FROM permissions WHERE name = 'PRODUCT_READ'
);

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'ADMIN'
  AND p.name = 'PRODUCT_READ'
  AND NOT EXISTS (
      SELECT 1
      FROM role_permissions rp
      WHERE rp.role_id = r.id AND rp.permission_id = p.id
  );

INSERT INTO group_permissions (group_id, permission_id)
SELECT DISTINCT gr.group_id, rp.permission_id
FROM group_roles gr
JOIN role_permissions rp ON rp.role_id = gr.role_id
JOIN permissions p ON p.id = rp.permission_id
WHERE p.name = 'PRODUCT_READ'
  AND NOT EXISTS (
      SELECT 1
      FROM group_permissions gp
      WHERE gp.group_id = gr.group_id AND gp.permission_id = rp.permission_id
  );
