import React, { useState } from "react";
import api from "../../utils/axios/axiosInstance";
import "../library/AdminBookOptions.scss";

function AdminBookOptions() {
  // Variables d'état pour les entrées du formulaire et la visibilité du formulaire
  const [addBookForm, setAddBookForm] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookImage, setNewBookImage] = useState(null);
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookDateOfPublication, setNewBookDateOfPublication] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");

  // Fonction pour afficher le formulaire d'ajout de livre
  const handleAddBook = () => {
    setAddBookForm(true);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Création de l'objet FormData pour envoyer les données dans la requête
    const formData = new FormData();
    formData.append("title", newBookTitle);
    formData.append("author_id", parseInt(newBookAuthor));
    formData.append("date_of_publication", newBookDateOfPublication);
    formData.append("category", newBookCategory);
    formData.append("description", newBookDescription);
    formData.append("cover_image", newBookImage);

    try {
      // Appel API pour ajouter le nouveau livre
      const response = await api.post("/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response", response.data);
    } catch (error) {
      console.log(error);
    }
    // Masquer le formulaire d'ajout de livre après la soumission
    setAddBookForm(false);
  };

  return (
    <div className="">
      <div className="flex items-center">
        <h1 className="neon-text neon-green-other">
          Hello cher Administrateur{" "}
          <button onClick={handleAddBook} className="ml-10 text-2xl neon-green">
            +
          </button>{" "}
          ajout d'un livre{" "}
        </h1>
      </div>
      {addBookForm && (
        <form onSubmit={handleFormSubmit} className="text-sm mt-4">
          {/* Champ de saisie pour le titre du livre */}
          <input
            type="text"
            placeholder="Titre du livre"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            required
            className="block mb-2"
          />
          {/* Champ de saisie pour l'auteur du livre */}
          <input
            type="text"
            placeholder="Auteur du livre"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            required
            className="block mb-2"
          />
          {/* Champ de saisie pour la date de publication */}
          <input
            type="date"
            placeholder="Date de publication"
            value={newBookDateOfPublication}
            onChange={(e) => setNewBookDateOfPublication(e.target.value)}
            required
            className="block mb-2"
          />
          {/* Champ de saisie pour la catégorie du livre */}
          <input
            type="text"
            placeholder="Catégorie"
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
            required
            className="block mb-2"
          />
          {/* Champ de saisie pour la description du livre */}
          <input
            type="text"
            placeholder="Description"
            value={newBookDescription}
            onChange={(e) => setNewBookDescription(e.target.value)}
            required
            className="block mb-2"
          />
          {/* Champ de saisie pour l'image de couverture du livre */}
          <input
            type="file"
            onChange={(e) => setNewBookImage(e.target.files[0])}
            required
            className="block mb-2"
          />
          {/* Bouton de soumission du formulaire */}
          <button type="submit" className="block">
            AJOUTER
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminBookOptions;














// import React, { useState } from "react";
// import api from "../../utils/axios/axiosInstance";
// import "../library/AdminBookOptions.scss";

// function AdminBookOptions() {
//   const [addBookForm, setAddBookForm] = useState(false);
//   const [newBookTitle, setNewBookTitle] = useState("");
//   const [newBookImage, setNewBookImage] = useState(null);
//   const [newBookAuthor, setNewBookAuthor] = useState("");
//   const [newBookDateOfPublication, setNewBookDateOfPublication] = useState("");
//   const [newBookCategory, setNewBookCategory] = useState("");
//   const [newBookDescription, setNewBookDescription] = useState("");

//   const handleAddBook = () => {
//     setAddBookForm(true);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", newBookTitle);
//     formData.append("author_id", parseInt(newBookAuthor));
//     formData.append("date_of_publication", newBookDateOfPublication);
//     formData.append("category", newBookCategory);
//     formData.append("description", newBookDescription);
//     formData.append("cover_image", newBookImage);

//     try {
//       const response = await api.post("/book", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("API Response", response.data);
//     } catch (error) {
//       console.log(error);
//     }
//     setAddBookForm(false);
//   };

//   return (
//     <div className="">
//       <div className="flex items-center">
//         <h1 className="neon-text neon-green-other">
//           Hello cher Administrateur{" "}
//           <button onClick={handleAddBook} className="ml-10 text-2xl neon-green">
//             +
//           </button>{" "}
//           ajout d'un livre{" "}
//         </h1>
//       </div>
//       {addBookForm && (
//         <form onSubmit={handleFormSubmit} className="text-sm mt-4">
//           <input
//             type="text"
//             placeholder="Titre du livre"
//             value={newBookTitle}
//             onChange={(e) => setNewBookTitle(e.target.value)}
//             required
//             className="block mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Auteur du livre"
//             value={newBookAuthor}
//             onChange={(e) => setNewBookAuthor(e.target.value)}
//             required
//             className="block mb-2"
//           />
//           <input
//             type="date"
//             placeholder="Date de publication"
//             value={newBookDateOfPublication}
//             onChange={(e) => setNewBookDateOfPublication(e.target.value)}
//             required
//             className="block mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Catégorie"
//             value={newBookCategory}
//             onChange={(e) => setNewBookCategory(e.target.value)}
//             required
//             className="block mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newBookDescription}
//             onChange={(e) => setNewBookDescription(e.target.value)}
//             required
//             className="block mb-2"
//           />
//           <input
//             type="file"
//             onChange={(e) => setNewBookImage(e.target.files[0])}
//             required
//             className="block mb-2"
//           />
//           <button type="submit" className="block">
//             AJOUTER
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default AdminBookOptions;