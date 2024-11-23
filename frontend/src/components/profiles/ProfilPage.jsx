import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import api from "../../utils/axios/axiosInstance";

function ProfilPage() {
  const { user, logout } = useAuth(); // on récupère l'utilisateur et la fonction logout
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    surname: user.surname,
    pseudo: user.pseudo,
    password: "",
    newPassword: "",
  });
  // console.log(user);

  const [editMode, setEditMode] = useState({
    name: false,
    surname: false,
    email: false,
    pseudo: false,
    password: false,
    newPassword: false,
  });

  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  // Fonction pour vérifier si au moins un des champs a été modifié ou le newPassword
  const fieldModified = () => {
    // vérifie les champs boolean editmode (true, false)
    return (
      Object.values(editMode).some((value) => value) || formData.newPassword
    );
  };

  // Gérer les changements dans le formulaire (input)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Permettre de basculer vers le mode édition du champ
  const handleEditMode = (field) => {
    // gérer l'activation du mode edition sur le champ (field)
    setEditMode({ ...editMode, [field]: !editMode[field] }); // conserver/inverser les valeurs du champ
  };

  // Mettre à jour le profil
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // empêche le comportement par défaut du formulaire (rechargement de page)
    try {
      const response = await api.put("/mon-profil", formData); // appel vers le backend pour la maj
      setNotification("Profil mis à jour avec succès."); //notification de réussite
      setError(""); // réinitialise le message d'erreur (s'il y en avait une avant)

      // Réinitialiser les champs MDP et fermer les modes édition
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        newPassword: "",
      }));

      // Fermer tous les champs d'édition après màj réussie
      setEditMode({
        name: false,
        surname: false,
        email: false,
        pseudo: false,
        password: false,
        newPassword: false,
      });

      // Effacer la notification après 5 secondes
      setTimeout(() => {
        setNotification(""); // passer le msg à vide
      }, 5000); // délai en millisecondes
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error); 
      setError("Erreur lors de la mise à jour du profil."); // màj pour afficher le msg d'erreur à l'user
      setNotification(""); // réinitialise la notif de succès (s'il y en avait une)
    }
  };

  // Supprimer le profil
  const handleDeleteProfile = async () => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ton compte ?")) {
      try {
        await api.delete("/mon-profil"); // appel vers le backend pour la suppression
        setNotification(
          "Ton compte a bien été supprimé. Nous espérons te revoir bientôt !"
        );
        setError(""); // réinitialise le msg d'erreur
        logout(); // Déconnecte l'utilisateur après la suppression

        // Efface la notification après 3 secondes
        setTimeout(() => {
          setNotification("");
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression du profil", error);
        setError("Erreur lors de la suppression du profil.");
        setNotification(""); // réinitialise la notif
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center maxContainer">
      <section className="w-full max-w-md sm:max-w-lg rounded-lg shadow-md p-6 neon-border  mt-2 sm:mt-4">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Bienvenue {user.pseudo} !
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Informations personnelles
          </h2>
        </div>

        <form
          onSubmit={handleUpdateProfile}
          className="bg-white rounded-lg p-4 shadow-md"
        >
          <div className="space-y-3">
            {/* Nom */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">Nom :</label>
              {editMode.name ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-gray-700">{formData.name}</p>
              )}
              <button
                type="button"
                onClick={() => handleEditMode("name")}
                className="btn btn-sm btn-outline mt-2 ml-auto hover:bg-[#FB923C] hover:border-[#FB923C] hover:text-black hover:border-4 rounded-lg"
              >
                {editMode.name ? "Annuler" : "Modifier"}
              </button>
            </div>

            {/* Prénom */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">Prénom :</label>
              {editMode.surname ? (
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-gray-700">{formData.surname}</p>
              )}
              <button
                type="button"
                onClick={() => handleEditMode("surname")}
                className="btn btn-sm btn-outline mt-2 ml-auto hover:bg-[#FB923C] hover:border-[#FB923C] hover:text-black hover:border-4 rounded-lg"
              >
                {editMode.surname ? "Annuler" : "Modifier"}
              </button>
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">Email :</label>
              {editMode.email ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-gray-700">{formData.email}</p>
              )}
              <button
                type="button"
                onClick={() => handleEditMode("email")}
                className="btn btn-sm btn-outline mt-2 ml-auto hover:bg-[#FB923C] hover:border-[#FB923C] hover:text-black hover:border-4 rounded-lg"
              >
                {editMode.email ? "Annuler" : "Modifier"}
              </button>
            </div>
            {/* Pseudo */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">Pseudo :</label>
              {editMode.pseudo ? (
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-gray-700">{formData.pseudo}</p>
              )}
              <button
                type="button"
                onClick={() => handleEditMode("pseudo")}
                className="btn btn-sm btn-outline mt-2 ml-auto hover:bg-[#FB923C] hover:border-[#FB923C] hover:text-black hover:border-4 rounded-lg"
              >
                {editMode.pseudo ? "Annuler" : "Modifier"}
              </button>
            </div>
            {/* Mot de passe actuel => affiché uniquement si un champ est modifié */}
            {fieldModified() && (
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">
                  Mot de passe actuel :
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
            )}
            {/* Nouveau mot de passe */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-bold mb-2">
                Nouveau mot de passe ?
              </label>
              {editMode.newPassword ? (
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-gray-700"></p>
              )}
              <button
                type="button"
                onClick={() => handleEditMode("newPassword")}
                className="btn btn-sm btn-outline mt-2 mb-4 ml-auto hover:bg-[#FB923C] hover:border-[#FB923C] hover:text-black hover:border-4 rounded-lg"
              >
                {editMode.newPassword ? "Annuler" : "Modifier le mot de passe"}
              </button>
            </div>

            {/* Notifications et messages d'erreur */}
            {notification && (
              <div className="text-green-500">{notification}</div>
            )}
            {error && <div className="text-red-500">{error}</div>}

            {/* Bouton de soumission */}
            <div className="">
              <button
                type="submit"
                className="btn btn-primary w-full hover:bg-green-500 hover:border-green-500 hover:text-white hover:border-4 rounded-lg"
              >
                Mettre à jour le profil
              </button>
            </div>
          </div>
        </form>

        {/* Bouton de suppression du profil */}
        <div className="mt-6">
          <button
            onClick={handleDeleteProfile}
            className="delete btn btn-error btn-outline w-full hover:bg-red-600 hover:border-red-600 hover:text-white hover:border-4 rounded-lg"
          >
            Supprimer mon compte
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProfilPage;
