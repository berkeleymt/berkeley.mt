-- Fake counts for the preview. Replace with real counts from the admin page.
INSERT OR REPLACE INTO stock (product, size, qty) VALUES
 ('bmmt-2026','XS',10),('bmmt-2026','S',22),('bmmt-2026','M',16),('bmmt-2026','L',9),('bmmt-2026','XL',4),('bmmt-2026','2XL',1),
 ('bmt-2025','XS',4),('bmt-2025','S',12),('bmt-2025','M',20),('bmt-2025','L',18),('bmt-2025','XL',7),('bmt-2025','2XL',0),
 ('bmmt-2025','XS',9),('bmmt-2025','S',15),('bmmt-2025','M',11),('bmmt-2025','L',3),('bmmt-2025','XL',0),('bmmt-2025','2XL',2),
 ('bmt-2024','XS',0),('bmt-2024','S',6),('bmt-2024','M',14),('bmt-2024','L',10),('bmt-2024','XL',5),('bmt-2024','2XL',1),
 ('bmmt-2024','XS',2),('bmmt-2024','S',8),('bmmt-2024','M',0),('bmmt-2024','L',4),('bmmt-2024','XL',6),('bmmt-2024','2XL',0),
 ('bmt-2023','XS',0),('bmt-2023','S',3),('bmt-2023','M',5),('bmt-2023','L',2),('bmt-2023','XL',0),('bmt-2023','2XL',0),
 ('tote-bmmt-2026','One size',25);
INSERT OR REPLACE INTO pool (size, free)
  SELECT size, SUM(qty) FROM stock WHERE product NOT LIKE 'tote-%' GROUP BY size;
