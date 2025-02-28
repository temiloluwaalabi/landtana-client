export interface SessionData {
  isLoggedIn: boolean;
  id: string;
  email: string;
  token: string;
  first_name?: string;
  is_boarded: boolean;
}
export const defaultSession: SessionData = {
  isLoggedIn: false,
  token: "",
  id: "0",
  email: "",
  first_name: "",
  is_boarded: false,
};
