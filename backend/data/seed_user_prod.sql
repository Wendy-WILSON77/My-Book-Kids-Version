BEGIN;

-- Insertion des listes
INSERT INTO "list" ("title", "category_name", "user_id")
VALUES
('La famille escargot', 'bébé', 1),
('Vivement la rentrée', 'maternelle', 3),
('L''arbre de Noël', 'primaire', 3),
('Mes nouveaux chaussons', 'bébé', 3),
('Eve', 'ado', 3),
('Thowpi', 'bébé', 3);

-- Insertion des relations livre-liste
INSERT INTO "list_has_book" ("book_id", "list_id")
VALUES
(5, 1),
(12, 5),
(7, 4),
(17, 6),
(10, 3),
(18, 2);

-- Insertion des livres lus
INSERT INTO "user_read_book" ("user_id", "book_id")
VALUES
(3, 12),
(3, 7),
(1, 5),
(3, 17);

-- Insertion des notices
INSERT INTO "notice" ("like", "commentary", "date", "user_id", "book_id")
VALUES
(TRUE, 'Ce livre était magique.', '2024-09-02', 3, 12),
(TRUE, 'Incroyable !', '2024-09-02', 3, 7),
(TRUE, 'Exceptionnel ! J''ai vraiment réussi à me plonger dans l''histoire.', '2024-09-02', 1, 5),
(TRUE, 'Mon fils adoré, je vous le recommande.', '2024-09-02', 3, 17);

COMMIT;