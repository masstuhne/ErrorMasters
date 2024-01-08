import LinkBox from "../components/LinkBox";

function AdminPage() {
    return (
        <div className="grid justify-center p-8 object-center">
            <LinkBox link="/korisnici_admin">Upravljanje korisnicima</LinkBox>
            <LinkBox link="/recepti_admin">Upravljanje receptima</LinkBox>
        </div>
    );
}

export default AdminPage;