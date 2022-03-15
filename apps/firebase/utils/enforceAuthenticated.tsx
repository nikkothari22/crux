import { GetServerSideProps } from 'next';

const enforceAuthenticated: (inner?: GetServerSideProps) => GetServerSideProps = inner => {
    return async context => {
        const { req } = context;
        // TODO: replace with logic for firebase
        // const { user } = await supabase.auth.api.getUserByCookie(req);

        // if (!user) {
        //     return { props: {}, redirect: { destination: '/login' } };
        // }

        // if (inner) {
        //     return inner(context);
        // }

        return { props: {} };
    };
};

export default enforceAuthenticated;