import { createClient } from "@supabase/supabase-js";

export async function requireAuth(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Unauthorized"
        });
        return null;
    }

    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const {
        data,
        error
    } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        res.status(401).json({
            error: "Unauthorized"
        });
        return null;
    }

    return data.user;
}