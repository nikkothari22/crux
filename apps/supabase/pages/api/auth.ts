import { NextApiHandler } from "next";
import { supabase } from "../../config/supabaseInit";

const handler: NextApiHandler = (req, res) => {
    supabase.auth.api.setAuthCookie(req, res);
}

export default handler