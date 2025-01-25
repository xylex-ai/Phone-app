// XylexApp/api/SupabaseApi.ts

import { supabase } from "../lib/supabase";

export async function GetOrganizationsForUser(userId: string) {
  try {
    console.log("Fetching organizations for user ID:", userId);

    // Fetch the user's `organizations` column
    const { data, error } = await supabase
      .from("users")
      .select("organizations")
      .eq("id", userId) // Match using the `id` column
      .single();

    if (error) {
      console.error("Error fetching user's organizations:", error);
      throw error;
    }

    console.log("Fetched Organizations Column Data:", data?.organizations);

    // Return the parsed organizations array
    return data?.organizations || [];
  } catch (error) {
    console.error("Error in GetOrganizationsForUser:", (error as Error).message);
    throw error;
  }
}
