import AuthPrivate from "@/components/PrivateRoute/AuthPrivate";
import ProfileBody from "@/components/profile/Body";

const page = () => {
  return (
    <main>
      <AuthPrivate>
        <ProfileBody />
      </AuthPrivate>
    </main>
  );
};

export default page;
