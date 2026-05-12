interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};
