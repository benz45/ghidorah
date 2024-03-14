import supabase from "@/config/supabaseClient";
import { AuthError, UserResponse } from "@supabase/supabase-js";

class AuthBusiness {
  public async getUser(): Promise<UserResponse | undefined> {
    try {
      const user: UserResponse = await new Promise((resolve, reject) => {
        supabase.auth
          .getUser()
          .then((value) => resolve(value))
          .catch((err) => reject(err));
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  public async signInWithPassword(email: string, password: string) {
    try {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async signOut(): Promise<
    | {
        error: AuthError | null;
      }
    | undefined
  > {
    try {
      return await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthBusiness;
