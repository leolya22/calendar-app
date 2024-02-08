import './LoginPage.css';

export const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login">
                <h3>Ingreso</h3>
                <form className="login-form">
                    <input
                        type="text"
                        className="input"
                        placeholder="Correo"
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Contraseña"
                    />
                    <input
                        type="submit"
                        className="btnSubmit"
                        value="Login"
                    />
                </form>
            </div>

            <div className="register">
                <h3>Registro</h3>
                <form className="login-form">
                    <input
                        type="text"
                        className="input"
                        placeholder="Nombre"
                    />
                    <input
                        type="email"
                        className="input"
                        placeholder="Correo"
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Contraseña"
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Repita la contraseña"
                    />
                    <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta"
                    />
                </form>
            </div>
        </div>
    )
}