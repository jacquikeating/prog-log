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
        <main>
            <h1>Account</h1>
            <section>
                {loginData.session ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <p>You are not signed in.</p>
                )}
            </section>    
        </main>
    )
};

export default AccountPage;