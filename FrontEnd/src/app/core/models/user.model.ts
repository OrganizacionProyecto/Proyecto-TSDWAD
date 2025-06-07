export interface User {
    id?: number;
    username: string;
    email: string;
    app_role: 'admin_app' | 'editor' | 'viewer';
    access?: string;
    refresh?: string;
  }