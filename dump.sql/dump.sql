-- PostgreSQL database dump with DROP commands
--

-- Suppression des tables et séquences existantes avant de recréer
DROP TABLE IF EXISTS public.author CASCADE;
DROP SEQUENCE IF EXISTS public.author_id_seq CASCADE;
DROP TABLE IF EXISTS public.book CASCADE;
DROP SEQUENCE IF EXISTS public.book_id_seq CASCADE;
DROP TABLE IF EXISTS public.book_has_category CASCADE;
DROP SEQUENCE IF EXISTS public.book_has_category_id_seq CASCADE;
DROP TABLE IF EXISTS public.category CASCADE;
DROP SEQUENCE IF EXISTS public.category_id_seq CASCADE;
DROP TABLE IF EXISTS public.list CASCADE;
DROP SEQUENCE IF EXISTS public.list_id_seq CASCADE;
DROP TABLE IF EXISTS public.list_has_book CASCADE;
DROP SEQUENCE IF EXISTS public.list_has_book_id_seq CASCADE;
DROP TABLE IF EXISTS public.notice CASCADE;
DROP SEQUENCE IF EXISTS public.notice_id_seq CASCADE;
DROP TABLE IF EXISTS public."user" CASCADE;
DROP SEQUENCE IF EXISTS public.user_id_seq CASCADE;
DROP TABLE IF EXISTS public.user_like_book CASCADE;
DROP SEQUENCE IF EXISTS public.user_like_book_id_seq CASCADE;
DROP TABLE IF EXISTS public.user_read_book CASCADE;
DROP SEQUENCE IF EXISTS public.user_read_book_id_seq CASCADE;

-- Recréation des tables et des séquences
CREATE TABLE public.author (
    id integer NOT NULL,
    surname character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);

ALTER TABLE public.author OWNER TO bookis;

CREATE SEQUENCE public.author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.author ALTER COLUMN id SET DEFAULT nextval('public.author_id_seq');

CREATE TABLE public.book (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    date_of_publication date,
    "ISBN" character varying(13),
    cover_image text,
    author_id integer NOT NULL
);

ALTER TABLE public.book OWNER TO bookis;

CREATE SEQUENCE public.book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq');

CREATE TABLE public.book_has_category (
    id integer NOT NULL,
    category_id integer NOT NULL,
    book_id integer NOT NULL
);

ALTER TABLE public.book_has_category OWNER TO bookis;

CREATE SEQUENCE public.book_has_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.book_has_category ALTER COLUMN id SET DEFAULT nextval('public.book_has_category_id_seq');

CREATE TABLE public.category (
    id integer NOT NULL,
    category_name character varying(255) NOT NULL
);

ALTER TABLE public.category OWNER TO bookis;

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq');

CREATE TABLE public.list (
    id integer NOT NULL,
    title text NOT NULL,
    category_name character varying(255) NOT NULL,
    user_id integer NOT NULL
);

ALTER TABLE public.list OWNER TO bookis;

CREATE SEQUENCE public.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq');

CREATE TABLE public.list_has_book (
    id integer NOT NULL,
    book_id integer NOT NULL,
    list_id integer NOT NULL
);

ALTER TABLE public.list_has_book OWNER TO bookis;

CREATE SEQUENCE public.list_has_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.list_has_book ALTER COLUMN id SET DEFAULT nextval('public.list_has_book_id_seq');

CREATE TABLE public.notice (
    id integer NOT NULL,
    "like" boolean,
    commentary text,
    date date DEFAULT now(),
    user_id integer NOT NULL,
    book_id integer NOT NULL
);

ALTER TABLE public.notice OWNER TO bookis;

CREATE SEQUENCE public.notice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.notice ALTER COLUMN id SET DEFAULT nextval('public.notice_id_seq');

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(225) NOT NULL,
    surname character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    pseudo character varying(30) NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    password character varying(225) NOT NULL,
    date_inscription date DEFAULT now()
);

ALTER TABLE public."user" OWNER TO bookis;

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq');

CREATE TABLE public.user_like_book (
    id integer NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL
);

ALTER TABLE public.user_like_book OWNER TO bookis;

CREATE SEQUENCE public.user_like_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_like_book ALTER COLUMN id SET DEFAULT nextval('public.user_like_book_id_seq');

CREATE TABLE public.user_read_book (
    id integer NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL
);

ALTER TABLE public.user_read_book OWNER TO bookis;

CREATE SEQUENCE public.user_read_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_read_book ALTER COLUMN id SET DEFAULT nextval('public.user_read_book_id_seq');

-- Ajout des contraintes de clés primaires
ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_pkey PRIMARY KEY (id);

-- Ajout des contraintes de clés étrangères
ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(id);

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.list(id);

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Réinitialisation des séquences
SELECT pg_catalog.setval('public.author_id_seq', 10, true);
SELECT pg_catalog.setval('public.book_id_seq', 18, true);
SELECT pg_catalog.setval('public.book_has_category_id_seq', 18, true);
SELECT pg_catalog.setval('public.category_id_seq', 4, true);
SELECT pg_catalog.setval('public.list_id_seq', 1, false);
SELECT pg_catalog.setval('public.list_has_book_id_seq', 1, false);
SELECT pg_catalog.setval('public.notice_id_seq', 2, true);
SELECT pg_catalog.setval('public.user_id_seq', 8, true);
SELECT pg_catalog.setval('public.user_like_book_id_seq', 2, true);
SELECT pg_catalog.setval('public.user_read_book_id_seq', 3, true);