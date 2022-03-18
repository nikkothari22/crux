import ProtectedPageProvider from "../auth/ProtectedPageProvider";

interface Props {

}

export default function Protected(props: Props) {
    // console.log(user)
    return (
        <ProtectedPageProvider>
            <p>Firebase</p>
        </ProtectedPageProvider>
    );
}