import { UserDocument } from "../../models/User";

declare global {
  namespace Express {
    interface User extends UserDocument {
      // Add any properties you want to add to the user object
      user?: UserDoc;
      token?: string;
    }
  }
}
