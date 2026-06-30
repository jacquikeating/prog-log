import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import "./AccountPage.scss";

const AccountPage = ({ loginData }) => {
    const navigate = useNavigate();

    async function logout() {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <main className="account">
            <h1 className="account__heading">Account</h1>
            <section className="account__section">
                {loginData ? (
                    <>
                        <p>Logged in as: {loginData.name}</p>
                        <button className="account__logout-btn" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <p className="account__not-signed-in">You are not signed in.</p>
                )}
            </section>    
        </main>
    )
};

export default AccountPage;