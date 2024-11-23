import { Author } from "./Author.js";
import { Book } from "./Book.js";
import { Category } from "./Category.js";
import { List } from "./List.js";
import { Notice } from "./Notice.js";
import { User } from "./User.js";

// Un auteur peut avoir écrit plusieurs livres (relation un-à-plusieurs)
Author.hasMany(Book, {
    as : "book",
    foreignKey:"author_id"
});

// Un livre appartient à un seul auteur (relation inverse de un-à-plusieurs)
Book.belongsTo(Author, {
    as: "author",
    foreignKey: "author_id"
});

// Un livre peut appartenir à plusieurs catégories (relation plusieurs-à-plusieurs)
Book.belongsToMany(Category, {
    as: "categories",
    through: "book_has_category", // la table de liaison
    foreignKey: "book_id",
    otherKey: "category_id"
});

// Une catégorie peut contenir plusieurs livres (relation plusieurs-à-plusieurs)
Category.belongsToMany(Book, {
    as: "book",
    through: "book_has_category", // la table de liaison
    foreignKey: "category_id",
    otherKey: "book_id"
});

// Un utilisateur peut avoir plusieurs notices (relation un-à-plusieurs)
User.hasMany(Notice, {
    as: "notice",
    foreignKey: "user_id"
});

// Une notice appartient à un seul utilisateur (relation un-à-plusieurs)
Notice.belongsTo(User, {
    as: "user",
    foreignKey: "user_id"
});

// Un livre peut avoir plusieurs notices (relation un-à-plusieurs)
Book.hasMany(Notice, {
    as: "notice",
    foreignKey: "book_id"
});

// Une notice appartient à un seul livre (relation inverse de un-à-plusieurs)
Notice.belongsTo(Book, {
    as: "book",
    foreignKey: "book_id"
});

// Une liste peut avoir plusieurs livres (relation plusieurs à plusieurs)
List.belongsToMany(Book, {
    as: "book",
    through: "list_has_book", // la table de liaison
    foreignKey: "list_id",
    otherKey: "book_id",
});

// Un livre peut avoir plusieurs list (relation plusieurs à plusieurs)
Book.belongsToMany(List, {
    as: "list",
    through: "list_has_book", // la table de liaison
    foreignKey: "book_id",
    otherKey: "list_id"
});

// Un utilisateur peut avoir qu'une seule liste avec plusieurs livres (relation un à un)
User.hasOne(List, {
    as: 'list',
    foreignKey: 'user_id'
});

// Une liste appartient qu'a un seul user (relation inverse de un à plusieurs))
List.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

// Un utilisateur peut avoir liké plusieurs livres (relation plusieurs à plusieurs)
User.belongsToMany(Book, {
    as: "bookLiked",
    through: "user_like_book",
    foreignKey: "user_id",
    otherKey: "book_id"
});

// Un livre peut avoir été liké par plusieurs utilisateurs (relation plusieurs à plusieurs)
Book.belongsToMany(User, {
    as: "userLike",
    through: "user_like_book",
    foreignKey: "book_id",
    otherKey: "user_id"
});

// Un utilisateur peut avoir lu plusieurs livres (relation plusieurs à plusieurs)
User.belongsToMany(Book, {
    as: "bookRead",
    through: "user_read_book",
    foreignKey: "user_id",
    otherKey: "book_id"
});

// Un livre peut avoir été lu par plusieurs utilisateurs (relation plusieurs à plusieurs)
Book.belongsToMany(User, {
    as: "userRead",
    through: "user_read_book",
    foreignKey: "book_id",
    otherKey: "user_id"
});

export { Author, Book, Category, List, Notice, User };