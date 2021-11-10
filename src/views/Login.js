import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";

import store from "../assets/images/store.png";
import ModalAlert from "../components/ModalAlert/ModalAlert";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const history = useHistory();
  const { login, error } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(!!error);

  const handleLogin = async (googleData) => {
    await login(googleData.tokenId);
    history.push("/");
  };

  return (
    <section className="login-content">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-xl-10">
            <div className="card rounded-3">
              <div className="row g-0 py-4">
                <div className="col-lg-6 d-flex align-items-center justify-content-center ">
                  <div>
                    <img className="login-img" src={store} alt="store" />
                    <h4 className="fs-1 text-center">Devware Store</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1 fs-3">
                        Ingresa al sistema de ventas a través de Google
                      </h4>
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Iniciar con Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAlert isOpen={isModalOpen} setIsOpen={setIsModalOpen} message={error} />
    </section>
  );
};

export default Login;
