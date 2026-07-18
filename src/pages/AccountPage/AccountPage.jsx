import { useNavigate, useOutletContext } from "react-router-dom";
import { supabase } from "../../supabase-client";
import "./AccountPage.scss";

const AccountPage = () => {
    const { user, setUser } = useOutletContext();
    const navigate = useNavigate();

    async function logout() {
        await supabase.auth.signOut();
        setUser(null);
        navigate("/");
    };

    return (
        <main className="account">
            <h1 className="account__heading">Account</h1>
            <section className="account__section">
                {user ? (
                    <>
                        <p>Logged in as: {user.name}</p>
                        <button className="account__logout-btn" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <p className="account__not-signed-in">You are not signed in.</p>
                )}
            </section>    
        </main>
    );
};

export default AccountPage;