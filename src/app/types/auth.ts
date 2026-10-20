export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  bio?: string | null;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  accessToken: string;
}

// The profile details saved in the session at login, since the API has no profile endpoint
export interface SessionProfile {
  name: string;
  email: string;
  bio: string | null;
  avatar: { url: string; alt: string } | null;
  banner: { url: string; alt: string } | null;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  bio: string | null;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}
