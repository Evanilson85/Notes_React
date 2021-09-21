import { createContext, useEffect, useState } from "react";
import firebase from "../service/firebaseConfig";

import { toast } from "react-toastify";
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadAuth, setLoadAuth] = useState(false); //!cadastro
  const [load, setLoad] = useState(true);
	const [reload, setReload] = useState(false)
  const [modal, setModal] = useState({ visible: false });
  const [viewsModal, setViewsModal] = useState({ visible: false });
	
  const openModalView = (payload) => setViewsModal({ ...payload, visible: true });
  const closeModalView = () => setViewsModal({ visible: false });

  const openModal = (payload) => setModal({ ...payload, visible: true });
  const closeModal = () => setModal({ visible: false });

  useEffect(() => {
    const LoadStorage = () => {
      const storageUser = localStorage.getItem("UserNotes");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoad(false);
      }
      setLoad(false);
    };
    
		LoadStorage();

  }, []);

	const createCard = (data) => {
		setReload(data)
	}

  const login = async (email, password) => {
    setLoadAuth(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( async ({ user }) => {
        let id = user.uid;
        let userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get();

        let data = {
          id: id,
          name: userProfile.data().name,
          avatarUrl: userProfile.data().avatarUrl,
          email: user.email
        };

        setUser(data);
        storageUser(data);
        setLoadAuth(false);
        toast.success(`Bem vindo de volta ${userProfile.data().name}!`);

      })
      .catch((err) => {
				
        toast.error("Ops algo deu errado!");
        setLoadAuth(false);
      
			});
  };

  const register = async (name, email, password) => {
    setLoadAuth(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( async ({ user }) => {

        let id = user.uid;
        let dataUser = { name, avatarUrl: null };

        await firebase
          .firestore()
          .collection("users")
          .doc(id)
          .set(dataUser)
          .then(() => {
            let data = {
              id: id,
              name: name,
              email: user.email, 
              avatarUrl: null
            };

            setUser(data);
            storageUser(data);
            toast.success(`Seja Bem vindo ${name}!`);
            setLoadAuth(false);

          });
      })
      .catch((err) => {

        toast.error("Ops algo deu errado!");
        setLoadAuth(false);

      });
  };

  const storageUser = (data) => {
    localStorage.setItem("UserNotes", JSON.stringify(data));
  };

  const sigOut = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem("UserNotes");
    localStorage.removeItem("cards");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        load,
        loadAuth,
        modal,
				reload,
				createCard,
        register,
        sigOut,
        login,
        storageUser,
        setUser,
        openModal,
        closeModal,
        viewsModal,
        closeModalView,
        openModalView
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
