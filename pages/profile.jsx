import Profile from "@/components/Profile";
import useUser from "@/hooks/useUser";

const profile = () => {
    const user = useUser();
  let name;
  const { currentAccount, isLoadingAccount } = user;
    return (
        <>
            <Profile user={user}/>
        </>
    );
}

export default profile;