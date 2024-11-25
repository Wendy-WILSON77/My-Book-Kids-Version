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

ALTER TABLE public.author OWNER TO mbkv;

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

ALTER TABLE public.book OWNER TO mbkv;

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

ALTER TABLE public.book_has_category OWNER TO mbkv;

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

ALTER TABLE public.category OWNER TO mbkv;

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

ALTER TABLE public.list OWNER TO mbkv;

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

ALTER TABLE public.list_has_book OWNER TO mbkv;

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

ALTER TABLE public.notice OWNER TO mbkv;

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

ALTER TABLE public."user" OWNER TO mbkv;

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

ALTER TABLE public.user_like_book OWNER TO mbkv;

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

ALTER TABLE public.user_read_book OWNER TO mbkv;

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


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.author (id, surname, name) FROM stdin;
1	Dubois	Jean-Pierre
2	Martin	Sophie
3	Leclerc	Thierry
4	Dupont	Claire
5	Lefèvre	Marc
6	Moreau	Isabelle
7	Laurent	 Antoine
8	Garnier	Céline
9	Lambert	Julien
10	Bernard	Élise
\.


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.book (id, title, description, date_of_publication, "ISBN", cover_image, author_id) FROM stdin;



1	C-est le weekend	Dans C-est le weekend, on suit les aventures de Léo et Hugo, deux enfants impatients de profiter de leur samedi et dimanche. Ils se lancent dans diverses activités amusantes comme construire des cabanes, organiser un pique-nique magique, et découvrir des trésors cachés dans le jardin. Ce livre célèbre l-importance des moments simples et précieux passés en famille et entre amis.	2021-04-14	9781234567601	img/1.webp	1
2	J-ai des poux	Dans J-ai des poux, Zoé découvre qu-elle a des poux juste avant une sortie scolaire importante. Affolée, elle demande de l-aide à sa famille pour se débarrasser des intrus gênants. Entre shampoings magiques, astuces de grand-mère et un peu de patience, Zoé apprend à faire face à cette petite aventure. Le livre aborde avec humour et tendresse ce problème courant chez les enfants, tout en rassurant que tout finit par s-arranger.	2022-09-21	9782245678912	img/2.webp	2
3	La famille escargot	Dans La famille escargot, on suit les aventures de Sidonie, une petite escargot curieuse, et sa famille. Chaque jour, ils explorent le jardin à leur rythme, découvrant les merveilles cachées sous les feuilles et les rochers. Un jour, Sidonie se perd lors d-une tempête, mais grâce à son courage et à l-aide de ses amis du jardin, elle retrouve le chemin vers sa famille. Ce livre met en lumière les valeurs de solidarité, de courage et de découverte de la nature.	2020-11-03	4783456789023	img/3.webp	3
4	L-école c-est demain	L-école c-est demain raconte l-histoire de Lucas, un petit garçon très anxieux à l-idée de commencer l-école pour la première fois. La veille de la rentrée, il imagine toutes sortes de scénarios incroyables, comme rencontrer des dragons dans la cour de récréation ou devoir résoudre des énigmes magiques pour entrer en classe. Sa famille et ses amis l-aident à surmonter ses peurs en lui racontant leurs propres histoires d-école et en lui montrant tout ce qu-il y a de positif à découvrir. Le livre explore les thèmes de l-appréhension et de l-anticipation, tout en rassurant les jeunes lecteurs sur les nouvelles expériences.	2019-06-18	9584567890134	img/4.webp	4
5	Mes nouveaux chaussons	Mes nouveaux chaussons raconte l-histoire de Léo, un petit garçon qui reçoit une paire de chaussons magiques en cadeau. Chaque soir, lorsqu-il les enfile, les chaussons l-emmènent dans des aventures incroyables, du fond des océans aux cimes des montagnes. Grâce à ses chaussons, Léo découvre des mondes fantastiques, fait de nouveaux amis et apprend d-importantes leçons sur le courage, l-amitié et la curiosité. Ce livre invite les enfants à rêver et à imaginer que l-extraordinaire peut se cacher dans les choses les plus simples.	2023-02-27	9785677901245	img/5.webp	5
6	Un cartable très lourd	Un cartable très lourd raconte l-histoire de Tom, un jeune garçon qui trouve son cartable étrangement plus lourd que d-habitude le matin de la rentrée. Intrigué, il découvre que son cartable est rempli d-objets magiques et mystérieux laissés par un magicien voyageur. Chaque objet a une histoire et une leçon à enseigner. Grâce à ces découvertes, Tom apprend l-importance de l-organisation, de la curiosité et de l-entraide. En fin de compte, il réalise que, même si son cartable était lourd, les trésors qu-il contenait valaient bien l-effort. Ce livre encourage les enfants à voir au-delà des apparences et à apprécier les surprises de la vie.	2021-10-05	9786789032356	img/6.webp	6
7	Sous les Ailes du Vent	Sous les Ailes du Vent raconte l-histoire de Camille, une aviatrice intrépide, qui entreprend un voyage à travers les vastes plaines d-Afrique à bord de son avion biplan. Lors d-une mission de livraison, elle est forcée d-atterrir dans une région isolée, où elle rencontre des tribus locales et découvre des paysages à couper le souffle. Au fil de ses rencontres et des épreuves qu-elle traverse, Camille redéfinit son rapport à la liberté, à la nature et à elle-même. L-aventure prend une dimension spirituelle, où l-harmonie avec les éléments devient essentielle à sa survie. Le roman célèbre la beauté sauvage de l-Afrique et la force intérieure que l-on trouve en s-abandonnant au vent.	2022-12-11	9787890123467	img/7.webp	7
8	Vivement la rentrée	Dans Vivement la rentrée, Emma est une petite fille impatiente de retourner à l-école après les grandes vacances. Elle rêve de retrouver ses amis, découvrir sa nouvelle classe et apprendre de nouvelles choses. Mais la veille de la rentrée, elle se demande si tout sera aussi excitant qu-elle l-imagine. Le livre explore l-anticipation et la joie d-un nouveau départ, tout en montrant que l-école peut être un lieu de découvertes et d-aventures.	2020-08-29	9788901234578	img/8.webp	8
9	Ouille ouille ouille	Ouille ouille ouille raconte l-histoire de Lucas, un petit garçon qui se blesse souvent en jouant. Un jour, après une chute particulièrement douloureuse, ses amis et sa famille lui apprennent des astuces pour jouer en toute sécurité et éviter les bobos. À travers ses mésaventures, Lucas comprend l-importance de la prudence tout en continuant à s-amuser. Ce livre met en avant les thèmes de la sécurité et de la résilience.	2018-05-22	9789012345689	img/9.webp	9
10	Les vacances sont loin	Les vacances sont loin suit l-histoire de Léa et Max, deux enfants qui trouvent la rentrée difficile après un été rempli d-amusements et de découvertes. Ils apprennent à apprécier les petites joies du quotidien et trouvent de nouvelles façons de s-amuser pendant l-année scolaire. Le livre montre que, même si les vacances peuvent sembler loin, chaque jour peut apporter des moments de bonheur et d-aventure.	2023-07-15	9780123456790	img/10.webp	1
11	L-Arbre de Noël	L-Arbre de Noël est une histoire touchante qui se déroule dans un petit village pendant la période des fêtes. Le récit suit Clara, une jeune fille dont le rêve est de décorer un arbre de Noël spécial pour raviver l-esprit de la communauté après une série de tragédies. En rassemblant les habitants et en les encourageant à contribuer avec leurs talents et leurs souvenirs, Clara découvre des histoires cachées et des liens oubliés. À travers les décorations et les célébrations, le village retrouve espoir et unité. Le roman célèbre la magie de Noël, la force de la solidarité et la capacité des petites actions à transformer les vies.	2023-07-15	8640123456790	img/11.webp	10
12	Eve	Eve est un roman d-horreur qui suit l-histoire de Sarah, une jeune femme qui emménage dans une maison isolée pour fuir son passé trouble. Bientôt, elle découvre un journal ancien appartenant à Eve, une femme ayant vécu dans la maison il y a un siècle, dont les écrits décrivent des événements de plus en plus terrifiants. Alors que Sarah commence à expérimenter des phénomènes paranormaux de plus en plus violents, elle réalise que l-esprit d-Eve est toujours présent et semble déterminé à la réécrire dans son propre cauchemar. En plongeant dans le passé de la maison, Sarah doit affronter les secrets obscurs et les forces maléfiques qui la hantent. Le roman explore la peur, la folie et la lutte pour survivre face aux ténèbres du passé.	2023-07-15	6723123456790	img/12.webp	2
13	Un nouveau jardin	Un nouveau jardin raconte l-histoire de Tom et Lisa, deux frères et sœurs qui découvrent un vieux jardin abandonné près de chez eux. Avec l-aide de leurs amis et de quelques outils magiques trouvés dans le grenier, ils se lancent dans l-aventure de redonner vie à cet espace. Chaque jour, ils plantent de nouvelles fleurs, découvrent des créatures fantastiques et apprennent l-importance de la nature et du travail d-équipe. Le livre célèbre la beauté de la nature et l-enthousiasme des enfants à créer et à explorer.	2023-07-15	3250123456790	img/13.webp	3
14	Lac	Lac est un roman de jeunesse qui raconte les aventures de Léo, un jeune garçon, et de son fidèle chien, Max, dans un village au bord d-un lac mystérieux. Un été, Léo découvre que le lac est habité par des animaux dotés de pouvoirs magiques, dont un renard sage et une grenouille musicienne. Ensemble, ils partent en quête pour sauver le lac d-une pollution imminente causée par des industriels sans scrupules. Au cours de leur aventure, Léo et Max apprennent des leçons précieuses sur l-amitié, la nature et la responsabilité. Le roman combine magie et écologie, tout en offrant une histoire captivante pour les jeunes lecteurs.	2023-07-15	4440123456790	img/14.webp	4
15	Light	Light est un roman de jeunesse fantastique qui suit les aventures de Mia, une adolescente qui découvre qu-elle possède le pouvoir rare de manipuler la lumière. Lorsqu-une ombre maléfique commence à menacer son monde, Mia est appelée à rejoindre un groupe de jeunes héros, chacun ayant une maîtrise unique des éléments. Ensemble, ils doivent voyager à travers des paysages enchantés et affronter des créatures obscures pour restaurer l-équilibre et sauver leur royaume. En apprenant à contrôler ses pouvoirs et à travailler en équipe, Mia découvre aussi des vérités cachées sur son propre héritage. Le livre mêle aventure, magie et thèmes de croissance personnelle, tout en captivant les jeunes lecteurs avec une histoire pleine de mystère et de courage.	2023-07-15	6380123456790	img/15.webp	5
16	Moulin	Moulin est un roman de jeunesse qui suit l-histoire d-Alice, une jeune fille qui passe ses vacances d-été dans un vieux moulin familial à la campagne. En explorant les environs, elle découvre un passage secret caché derrière les meules du moulin, menant à un monde enchanté peuplé de créatures magiques et de mystères anciens. Pour sauver ce monde menacé par une sombre force, Alice doit utiliser son ingéniosité et son courage, tout en découvrant des secrets sur sa propre histoire familiale. L-aventure lui enseigne des leçons sur le travail d-équipe, la bravoure et la valeur de ses racines. Le roman combine magie, aventure et exploration, captivant les jeunes lecteurs avec une quête pleine de découvertes et de mystères.	2023-07-15	9880123456790	img/16.webp	6
17	Thowpi	Thowpi suit les aventures de Thowpi, un petit renard curieux et passionné de livres. Dans ce récit, Tchoupi découvre un vieux livre dans la bibliothèque de la forêt et se plonge dans des histoires fascinantes qui éveillent son imagination. En partageant ses lectures avec ses amis, il leur transmet l-amour des histoires et les inspire à explorer leurs propres passions. Chaque chapitre offre une nouvelle aventure tirée des livres de Tchoupi, tout en montrant l-importance de la lecture et du partage. Le livre combine charme et apprentissage, encourageant les jeunes lecteurs à découvrir le plaisir de lire.	2023-07-15	4100123456790	img/17.webp	10
18	Le Royaume des Licornes	Dans un monde enchanté, caché au-delà des nuages et des forêts magiques, se trouve le Royaume des Licornes. Ce royaume est dirigé par la sage Reine Émeraude, une licorne majestueuse dotée d-un pouvoir ancien et puissant. Le royaume est un lieu de paix et de magie, où chaque licorne possède une capacité unique, liée à la nature et aux éléments.	2005-07-15	2100123456790	img/18.webp	10



--
-- Data for Name: book_has_category; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.book_has_category (id, category_id, book_id) FROM stdin;
1	2	1
2	2	2
3	1	3
4	4	4
5	1	5
6	3	6
7	3	7
8	3	8
9	1	9
10	3	10
11	3	11
12	4	12
13	2	13
14	4	14
15	4	15
16	2	16
17	1	17
18	3	18
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.category (id, category_name) FROM stdin;
1	bébé
2	maternelle
3	primaire
4	ado
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.list (id, title, category_name, user_id) FROM stdin;
\.


--
-- Data for Name: list_has_book; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.list_has_book (id, book_id, list_id) FROM stdin;
\.


--
-- Data for Name: notice; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.notice (id, "like", commentary, date, user_id, book_id) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public."user" (id, email, surname, name, pseudo, "isAdmin", password, date_inscription) FROM stdin;
\.


--
-- Data for Name: user_like_book; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.user_like_book (id, user_id, book_id) FROM stdin;
\.


--
-- Data for Name: user_read_book; Type: TABLE DATA; Schema: public; Owner: mbkv
--

COPY public.user_read_book (id, user_id, book_id) FROM stdin;
\.


--
-- Name: author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.author_id_seq', 10, true);


--
-- Name: book_has_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.book_has_category_id_seq', 18, true);


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.book_id_seq', 18, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.category_id_seq', 4, true);


--
-- Name: list_has_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.list_has_book_id_seq', 1, false);


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.list_id_seq', 1, false);


--
-- Name: notice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.notice_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: user_like_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.user_like_book_id_seq', 1, false);


--
-- Name: user_read_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mbkv
--

SELECT pg_catalog.setval('public.user_read_book_id_seq', 1, false);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);


--
-- Name: book book_ISBN_key; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "book_ISBN_key" UNIQUE ("ISBN");


--
-- Name: book_has_category book_has_category_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_pkey PRIMARY KEY (id);


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: list_has_book list_has_book_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: notice notice_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user_like_book user_like_book_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_read_book user_read_book_pkey; Type: CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_pkey PRIMARY KEY (id);


--
-- Name: book book_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(id);


--
-- Name: book_has_category book_has_category_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: book_has_category book_has_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.book_has_category
    ADD CONSTRAINT book_has_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: list_has_book list_has_book_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: list_has_book list_has_book_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.list_has_book
    ADD CONSTRAINT list_has_book_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.list(id);


--
-- Name: list list_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: notice notice_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: notice notice_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.notice
    ADD CONSTRAINT notice_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_like_book user_like_book_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: user_like_book user_like_book_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_like_book
    ADD CONSTRAINT user_like_book_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_read_book user_read_book_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(id);


--
-- Name: user_read_book user_read_book_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mbkv
--

ALTER TABLE ONLY public.user_read_book
    ADD CONSTRAINT user_read_book_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

