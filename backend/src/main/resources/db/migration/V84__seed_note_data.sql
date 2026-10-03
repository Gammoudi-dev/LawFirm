INSERT INTO notes (title, content)
SELECT 'Première note', 'Contenu de ma première note.'
WHERE NOT EXISTS (
    SELECT 1 FROM notes WHERE title = 'Première note'
);

INSERT INTO notes (title, content)
SELECT 'Réunion client', 'Préparer les documents pour la prochaine réunion avec le client.'
WHERE NOT EXISTS (
    SELECT 1 FROM notes WHERE title = 'Réunion client'
);

INSERT INTO notes (title, content)
SELECT 'Tâches à faire', 'Vérifier les documents, mettre à jour les dossiers et préparer le rapport.'
WHERE NOT EXISTS (
    SELECT 1 FROM notes WHERE title = 'Tâches à faire'
);