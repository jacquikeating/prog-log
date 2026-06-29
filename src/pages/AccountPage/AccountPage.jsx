import { supabase } from "../../supabase-client";
import "./AccountPage.scss";

const AccountPage = ({ loginData }) => {
    let user = "";

    if (loginData.session) {
        user = loginData.session.user.user_metadata;
        console.log(user);
    };

    async function logout() {
        await supabase.auth.signOut();
    };

    return (
        <main className="account">
            <h1 className="account__heading">Account</h1>
            <section className="account__section">
                {loginData.session ? (
                    <>
                        <p>Logged in as: {user.email}</p>
                    <p className="account__not-signed-in">You are not signed in.</p>
                    </>
                ) : (
                    <p>You are not signed in.</p>
                )}
            </section>    
        </main>
    )
};

export default AccountPage;