INSERT INTO product (reference, name, category, description, price, quantity, status, created_at)
SELECT 'PRD-001', 'Bureau professionnel', 'Mobilier', 'Bureau de travail professionnel', 850.00, 12, 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM product WHERE reference = 'PRD-001');

INSERT INTO product (reference, name, category, description, price, quantity, status, created_at)
SELECT 'PRD-002', 'Chaise ergonomique', 'Mobilier', 'Chaise de bureau ergonomique', 320.00, 25, 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM product WHERE reference = 'PRD-002');

INSERT INTO product (reference, name, category, description, price, quantity, status, created_at)
SELECT 'PRD-003', 'Pack fournitures', 'Fournitures', 'Pack de fournitures de bureau', 75.00, 40, 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM product WHERE reference = 'PRD-003');
